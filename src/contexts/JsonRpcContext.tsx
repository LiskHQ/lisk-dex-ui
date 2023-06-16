import dynamic from 'next/dynamic';
import { createContext, ReactNode, useContext, useState } from 'react';
import bs58 from 'bs58';

import { getLocalStorageTestnetFlag } from 'utils';
import { useWalletConnectClient } from './ClientContext';
import {
  DEFAULT_LISK_METHODS,
} from 'consts';
// import { useChainData } from './ChainDataContext';

const codec: any = dynamic(() => import('@liskhq/lisk-client' as any).then((module) => module.codec), {
  ssr: false,
});

const cryptography: any = dynamic(() => import('@liskhq/lisk-client' as any).then((module) => module.cryptography), {
  ssr: false,
});

const baseTransactionSchema = {
  $id: '/lisk/baseTransaction',
  type: 'object',
  required: ['module', 'command', 'nonce', 'fee', 'senderPublicKey', 'params'],
  properties: {
    module: {
      dataType: 'string',
      fieldNumber: 1,
    },
    command: {
      dataType: 'string',
      fieldNumber: 2,
    },
    nonce: {
      dataType: 'uint64',
      fieldNumber: 3,
    },
    fee: {
      dataType: 'uint64',
      fieldNumber: 4,
    },
    senderPublicKey: {
      dataType: 'bytes',
      fieldNumber: 5,
    },
    params: {
      dataType: 'bytes',
      fieldNumber: 6,
    },
    signatures: {
      type: 'array',
      items: {
        dataType: 'bytes',
      },
      fieldNumber: 7,
    },
  },
};

const encodeTransaction = (tx: any, paramsSchema: any) => {
  let encodedParams;
  if (!Buffer.isBuffer(tx.params)) {
    encodedParams = paramsSchema ? codec.codec.encode(paramsSchema, tx.params) : Buffer.alloc(0);
  } else {
    encodedParams = tx.params;
  }

  const encodedTransaction = codec.codec.encode(baseTransactionSchema, {
    ...tx,
    params: encodedParams,
  });

  return encodedTransaction;
};

const fromTransactionJSON = (rawTx: any, paramsSchema: any) => {
  const tx = codec.codec.fromJSON(baseTransactionSchema, {
    ...rawTx,
    params: '',
  });
  let params;
  if (typeof rawTx.params === 'string') {
    params = paramsSchema ? codec.codec.decode(paramsSchema, Buffer.from(rawTx.params, 'hex')) : {};
  } else {
    params = paramsSchema ? codec.codec.fromJSON(paramsSchema, rawTx.params) : {};
    console.log('params', rawTx.params, params);
  }

  return {
    ...tx,
    id: rawTx.id ? Buffer.from(rawTx.id, 'hex') : Buffer.alloc(0),
    params,
  };
};

/**
 * Types
 */
interface IFormattedRpcResponse {
  method?: string;
  address?: string;
  valid: boolean;
  result: string;
}

type TRpcRequestCallback = (chainId: string, address: string) => Promise<void>;

interface IContext {
  ping: () => Promise<void>;
  liskRpc: {
    testSignMessage: TRpcRequestCallback;
    testSignTransaction: TRpcRequestCallback;
  };
  rpcResult?: IFormattedRpcResponse | null;
  isRpcRequestPending: boolean;
  isTestnet: boolean;
  setIsTestnet: (isTestnet: boolean) => void;
}

/**
 * Context
 */
export const JsonRpcContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export function JsonRpcContextProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<IFormattedRpcResponse | null>();
  const [isTestnet, setIsTestnet] = useState(getLocalStorageTestnetFlag());

  const { client, session, accounts, liskPublicKeys } = useWalletConnectClient();

  // const { chainData } = useChainData();

  const _createJsonRpcRequestHandler =
    (rpcRequest: (chainId: string, address: string) => Promise<IFormattedRpcResponse>) =>
      async (chainId: string, address: string) => {
        if (typeof client === 'undefined') {
          throw new Error('WalletConnect is not initialized');
        }
        if (typeof session === 'undefined') {
          throw new Error('Session is not connected');
        }

        try {
          setPending(true);
          const result = await rpcRequest(chainId, address);
          setResult(result);
        } catch (err: any) {
          console.error('RPC request failed: ', err);
          setResult({
            address,
            valid: false,
            result: err?.message ?? err,
          });
        } finally {
          setPending(false);
        }
      };

  // const _verifyEip155MessageSignature = (message: string, signature: string, address: string) =>
  //   utils.verifyMessage(message, signature).toLowerCase() === address.toLowerCase();

  const ping = async () => {
    if (typeof client === 'undefined') {
      throw new Error('WalletConnect is not initialized');
    }
    if (typeof session === 'undefined') {
      throw new Error('Session is not connected');
    }

    try {
      setPending(true);

      let valid = false;

      try {
        await client.ping({ topic: session.topic });
        valid = true;
      } catch (e) {
        valid = false;
      }

      // display result
      setResult({
        method: 'ping',
        valid,
        result: valid ? 'Ping succeeded' : 'Ping failed',
      });
    } catch (e) {
      console.error(e);
      setResult(null);
    } finally {
      setPending(false);
    }
  };

  // -------- LISK RPC METHODS --------

  const liskRpc = {
    testSignTransaction: _createJsonRpcRequestHandler(
      async (chainId: string, address: string): Promise<IFormattedRpcResponse> => {
        console.log('testSignTransaction accounts', accounts);
        if (!liskPublicKeys) {
          throw new Error('Could not find Lisk PublicKeys.');
        }

        const schema = {
          '$id': '/lisk/transferParams',
          'title': 'Transfer transaction params',
          'type': 'object',
          'required': [
            'tokenID',
            'amount',
            'recipientAddress',
            'data'
          ],
          'properties': {
            'tokenID': {
              'dataType': 'bytes',
              'fieldNumber': 1,
              'minLength': 8,
              'maxLength': 8
            },
            'amount': {
              'dataType': 'uint64',
              'fieldNumber': 2
            },
            'recipientAddress': {
              'dataType': 'bytes',
              'fieldNumber': 3,
              'format': 'lisk32'
            },
            'data': {
              'dataType': 'string',
              'fieldNumber': 4,
              'minLength': 0,
              'maxLength': 64
            }
          }
        };

        // @todo we need to have the public key of account here. Just need to update the connection response.
        // const senderPublicKey = liskPublicKeys.find(item => item.includes(address));
        // Also, we should serialize and send the tx bytes instead of a raw tx object

        const recipientAddress = cryptography.address.getAddressFromLisk32Address('lsk3ay4z7wqjczbo5ogcqxgxx23xyacxmycwxfh4d');
        console.log('recipientAddress', recipientAddress, recipientAddress.toString('hex'));
        const rawTx = {
          module: 'token',
          command: 'transfer',
          fee: '100000000',
          nonce: '1',
          senderPublicKey: 'cf434a889d6c7a064e8de61bb01759a76f585e5ff45a78ba8126ca332601f535',
          signatures: [],
          params: {
            amount: '1000000000000',
            data: '',
            recipientAddress: 'lskj34x8zh85zh4khjq64ofudmjax2hzc5hxw7vok',
            tokenID: '0400000000000000'
          },
          id: '3d49adde25a12ca34c5893f645ceed395220d1a936e46b9412a2bb77b68e3583',
        };

        const tx = fromTransactionJSON(rawTx, schema);
        const binary = encodeTransaction(tx, schema);
        const payload = binary.toString('hex');

        try {
          //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const result = await client!.request<string>({
            chainId,
            //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            topic: session!.topic,
            request: {
              method: DEFAULT_LISK_METHODS.LSK_SIGN_TRANSACTION,
              params: {
                payload,
                schema,
                recipientChainID: '04000000',
              },
            },
          });

          // @todo verify the signatures
          const valid = true;
          console.log('result', result);

          return {
            method: DEFAULT_LISK_METHODS.LSK_SIGN_TRANSACTION,
            address,
            valid,
            result,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    ),
    testSignMessage: _createJsonRpcRequestHandler(
      async (chainId: string, address: string): Promise<IFormattedRpcResponse> => {
        // Encode message to `UInt8Array` first via `TextEncoder` so we can pass it to `bs58.encode`.
        const message = bs58.encode(
          new TextEncoder().encode(`This is an example message to be signed - ${Date.now()}`),
        );

        try {
          //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const result = await client!.request<{ signature: string }>({
            chainId,
            //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            topic: session!.topic,
            request: {
              method: DEFAULT_LISK_METHODS.LSK_SIGN_MESSAGE,
              params: {
                address: address,
                message,
              },
            },
          });

          // const valid = verifyMessageSignature(
          //   senderPublicKey.toBase58(),
          //   result.signature,
          //   message,
          // );
          const valid = true; // @todo fix the validator

          return {
            method: DEFAULT_LISK_METHODS.LSK_SIGN_MESSAGE,
            address,
            valid,
            result: result.signature,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    ),
  };

  return (
    <JsonRpcContext.Provider
      value={{
        ping,
        liskRpc,
        rpcResult: result,
        isRpcRequestPending: pending,
        isTestnet,
        setIsTestnet,
      }}
    >
      {children}
    </JsonRpcContext.Provider>
  );
}

export function useJsonRpc() {
  const context = useContext(JsonRpcContext);
  if (context === undefined) {
    throw new Error('useJsonRpc must be used within a JsonRpcContextProvider');
  }
  return context;
}

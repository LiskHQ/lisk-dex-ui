import { apiGetAuth, apiGetEstimationFee } from "apis";
import { TransactionModule } from "consts";
import { IAccount, INetwrokFeeResponse, ITransactionObject } from "models";

export const createTransactionObject = async <T>(module: TransactionModule, command: string, account: IAccount, params: T): Promise<{
  feeTokenID: string,
  transactionObject: ITransactionObject
}> => {
  try {
    const { address, publicKey } = account;

    const authResponse = await apiGetAuth({
      address,
    });

    const transaction = {
      module,
      command,
      fee: '0',
      nonce: authResponse.data.nonce || 0,
      senderPublicKey: publicKey,
      signatures: [],
      params
    };

    const networkFeeReponse: INetwrokFeeResponse = await apiGetEstimationFee({
      transaction,
    });

    return {
      feeTokenID: networkFeeReponse.data.transaction.fee.tokenID,
      transactionObject: {
        ...transaction,
        fee: networkFeeReponse.data.transaction.fee.minimum,
      }
    };
  } catch (e: any) {
    throw new Error(e);
  }
}
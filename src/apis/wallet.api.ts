import { liskApiInstance } from 'utils';

// export async function apiGetAccountAssets(address: string, chainId: string): Promise<AssetData[]> {
//   const ethChainId = chainId.split(':')[1];
//   const response = await liskApiInstance.get(
//     `/account-assets?address=${address}&chainId=${ethChainId}`,
//   );
//   const { result } = response.data;
//   return result;
// }

// export async function apiGetAccountBalance(address: string, chainId: string): Promise<AssetData> {
//   const ethChainId = chainId.split(':')[1];
//   const response = await ethereumApi.get(
//     `/account-balance?address=${address}&chainId=${ethChainId}`,
//   );
//   const { result } = response.data;
//   return result;
// }
const API_VERSION = 'v3';

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export async function apiGetAccounts(params: any) {
  const response: ResponseGenerator = await liskApiInstance.get(`/api/${API_VERSION}/accounts`, {
    params,
  });
  if (response)
    return response.data;
  return {};
}

// export async function apiGetAccountTransactions(
//   address: string,
//   chainId: string,
// ): Promise<ParsedTx[]> {
//   const ethChainId = chainId.split(':')[1];
//   const response = await ethereumApi.get(
//     `/account-transactions?address=${address}&chainId=${ethChainId}`,
//   );
//   const { result } = response.data;
//   return result;
// }

// export const apiGetAccountNonce = async (address: string, chainId: string): Promise<number> => {
//   const ethChainId = chainId.split(':')[1];
//   const response = await ethereumApi.get(`/account-nonce?address=${address}&chainId=${ethChainId}`);
//   const { result } = response.data;
//   return result;
// };

// export const apiGetGasPrices = async (): Promise<GasPrices> => {
//   const response = await ethereumApi.get('/gas-prices');
//   const { result } = response.data;
//   return result;
// };

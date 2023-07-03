import { dexApiInstance } from 'utils';

const API_VERSION = 'v2';

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export async function apiGetAvailableTokens(params: any) {
  const response: ResponseGenerator = await dexApiInstance.get(`/api/${API_VERSION}/accounts`, {
    params,
  });
  if (response)
    return response.data;
  return {};
}
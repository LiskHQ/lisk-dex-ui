import { liskApiInstance } from 'utils';

const API_VERSION = 'v2';

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

export async function apiGetTransactions(params: any) {
  const response: ResponseGenerator = await liskApiInstance.get(`/api/${API_VERSION}/transactions`, {
    params,
  });
  if (response)
    return response.data;
  return {};
}

export async function apiSubmitTransaction(data: any) {
  const response: ResponseGenerator = await liskApiInstance.post(`/api/${API_VERSION}/transactions`, data);
  if (response)
    return response.data;
  return {};
}
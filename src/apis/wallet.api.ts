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
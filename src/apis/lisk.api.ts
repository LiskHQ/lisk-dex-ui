import { liskApiInstance } from 'utils';

const API_VERSION = 'v3';

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export async function apiGeLegacyAccount(params: any) {
  const response: ResponseGenerator = await liskApiInstance.get(`/api/${API_VERSION}/legacy`, {
    params,
  });
  if (response)
    return response.data;
  return {};
}
import { dexApiInstance } from 'utils';

const API_VERSION = 'v1';

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export async function apiGetAvailableTokens(params: any) {
  const response: ResponseGenerator = await dexApiInstance.get(`/api/dex/${API_VERSION}/blockchain/apps/meta/tokens/supported`, {
    params,
  });
  if (response)
    return response.data;
  return {};
}

export async function apiGetToken2TokenConversion(params: any) {
  const response: ResponseGenerator = await dexApiInstance.get(`/api/dex/${API_VERSION}/prices/convert/token`, {
    params,
  });
  if (response)
    return response.data;
  return {};
}

export async function apiGetToken2FiatConversion(params: any) {
  const response: ResponseGenerator = await dexApiInstance.get(`/api/dex/${API_VERSION}/prices/convert/fiat`, {
    params,
  });
  if (response)
    return response.data;
  return {};
}

export async function apiGetPopularPairings(params: any) {
  const response: ResponseGenerator = await dexApiInstance.get(`/api/dex/${API_VERSION}/tokens/popularPairings`, {
    params,
  });
  if (response)
    return response.data;
  return {};
}

export async function apiGetPriceImpact(params: any) {
  const response: ResponseGenerator = await dexApiInstance.get(`/api/dex/${API_VERSION}/prices/impact`, {
    params,
  });
  if (response)
    return response.data;
  return {};
}

export async function apiGetSlippageBounds(params: any) {
  const response: ResponseGenerator = await dexApiInstance.get(`/api/dex/${API_VERSION}/slippage-bounds`, {
    params,
  });
  if (response)
    return response.data;
  return {};
}

import { makeInstance } from './api.instance';

export const liskApiInstance = makeInstance(
  process.env.NEXT_PUBLIC_LISK_SERVICE_URL || ''
);

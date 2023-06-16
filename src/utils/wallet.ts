import { IAccount } from 'models';

export const LOCALSTORAGE_KEY_TESTNET = 'TESTNET';
export const INITIAL_STATE_TESTNET_DEFAULT = process.env.NEXT_PUBLIC_TEST_NET === 'testnet';

export const ellipsisAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
};

export function setLocaleStorageTestnetFlag(value: boolean): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LOCALSTORAGE_KEY_TESTNET, `${value}`);
  }
}

export function getLocalStorageTestnetFlag(): boolean {
  let value = INITIAL_STATE_TESTNET_DEFAULT;
  if (typeof window !== 'undefined') {
    const persisted = window.localStorage.getItem(LOCALSTORAGE_KEY_TESTNET);
    if (!persisted) {
      setLocaleStorageTestnetFlag(value);
    } else {
      value = persisted === 'true' ? true : false;
    }
  }
  return value;
}

export function getAccountsFromNamespaces(allNamespaceAccounts: string[]): IAccount[] {
  return allNamespaceAccounts.reduce((accounts: IAccount[], account) => {
    const [namespace, reference, publicKey] = account.split(':');
    accounts.push({
      chainId: `${namespace}:${reference}`,
      publicKey,
    });
    return accounts;
  }, []);
}
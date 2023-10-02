import { useEffect, useMemo, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { TabPanel } from 'components';
import { InfoViewStyle } from './index.style';
import { OverviewComponent } from './Overview';
import { PoolsComponent } from './Pools';
import { TokensComponent } from './Tokens';
import { useRouter } from 'next/router';
import { SearchComponent } from './Search';
import { mockPoolDetails, mockTokenDetails } from '__mock__';
import { PATHS } from 'consts';
import { ITransaction } from 'models';

export interface InfoViewProps {
  transactions: ITransaction[],
  onChangeTransactionCommand: (value: string) => void,
}

export const InfoView: React.FC<InfoViewProps> = (props) => {
  const {
    transactions,
    onChangeTransactionCommand,
  } = props;
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [filter, setFilter] = useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onClickTab = (tabIndex: number) => {
    if (router)
      router.push(`?tabIndex=${tabIndex}`);
  };

  const onChangeSearchFilter = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    if (router) {
      const { query } = router;
      if (query) {
        if (query.tabIndex) {
          setTabValue(parseInt(query.tabIndex as string));
        }
        if (query.poolId !== undefined) {
          setTabValue(1);
        }
        if (query.tokenId !== undefined) {
          setTabValue(2);
        }
      }
    }
  }, [router]);

  const searchedPools = useMemo(() => {
    if (filter)
      return mockPoolDetails.filter(pool =>
        pool.token1.chainName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        pool.token2.chainName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        pool.token1.symbol.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        pool.token2.symbol.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
        .slice(0, 3);
    return [];
  }, [filter]);

  const searchedTokens = useMemo(() => {
    if (filter)
      return mockTokenDetails.filter(token =>
        token.chainName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        token.symbol.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
        .slice(0, 3);
    return [];
  }, [filter]);

  const onSelectPool = (id: string) => {
    router.push(`?poolId=${id}`);
  };

  const onSelectToken = (id: string) => {
    router.push(`?tokenId=${id}`);
  };

  const onGotoSwap = (token1: string, token2?: string) => {
    const url = `${PATHS.SWAP}?token1=${token1}&token2=${token2 || ''}`;
    router.replace(url);
  };

  const onGotoAddLiquidity = (token1: string, token2?: string) => {
    const url = `${PATHS.POOL}?token1=${token1}&token2=${token2 || ''}`;
    router.replace(url);
  };

  return (
    <InfoViewStyle>
      <Box className="info-top-box">
        <Tabs className="info-tab" value={tabValue} onChange={handleChange} centered>
          <Tab label="Overview" data-testid="overview-tab-test" onClick={() => onClickTab(0)} />
          <Tab label="Pools" data-testid="pools-tab-test" onClick={() => onClickTab(1)} />
          <Tab label="Tokens" data-testid="tokens-tab-test" onClick={() => onClickTab(2)} />
        </Tabs>
        <SearchComponent
          className="info-search-box"
          router={router}
          pools={searchedPools}
          tokens={searchedTokens}
          onChangeSearchFilter={onChangeSearchFilter}
        />
      </Box>

      <TabPanel value={tabValue} index={0}>
        <OverviewComponent
          transactions={transactions}
          onSwap={onGotoSwap}
          onAddLiquidity={onGotoAddLiquidity}
          onSelectPool={onSelectPool}
          onSelectToken={onSelectToken}
          onChangeTransactionCommand={onChangeTransactionCommand}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <PoolsComponent
          router={router}
          onSwap={onGotoSwap}
          onAddLiquidity={onGotoAddLiquidity}
          onSelectPool={onSelectPool}
          onSelectToken={onSelectToken}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <TokensComponent
          router={router}
          onSwap={onGotoSwap}
          onAddLiquidity={onGotoAddLiquidity}
          onSelectPool={onSelectPool}
          onSelectToken={onSelectToken}
        />
      </TabPanel>
    </InfoViewStyle >
  );
};
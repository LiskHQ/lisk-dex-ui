import { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { SearchInputComponent, TabPanel } from 'components';
import { InfoViewStyle } from './index.style';
import { OverviewComponent } from './Overview';
import { PoolsComponent } from './Pools';
import { TokensComponent } from './Tokens';
import { useRouter } from 'next/router';
import { PATHS } from 'consts';

export const InfoView: React.FC = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onClickTab = (tabIndex: number) => {
    if (router)
      router.push(`?tabIndex=${tabIndex}`);
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
        <SearchInputComponent
          className="info-search-box"
          placeholder="Search tokens or pools..."
        />
      </Box>

      <TabPanel value={tabValue} index={0}>
        <OverviewComponent
          onSwap={onGotoSwap}
          onAddLiquidity={onGotoAddLiquidity}
          onSelectPool={onSelectPool}
          onSelectToken={onSelectToken}
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
import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { SearchInputComponent, TabPanel } from 'components';
import { InfoViewStyle } from './index.style';
import { OverviewComponent } from './Overview';
import { PoolsComponent } from './Pools';
import { TokensComponent } from './Tokens';

export const InfoView: React.FC = () => {

  const [tabValue, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <InfoViewStyle>
      <Box className="info-top-box">
        <Tabs className="info-tab" value={tabValue} onChange={handleChange} centered>
          <Tab label="Overview" data-testid="overview-tab-test" />
          <Tab label="Pools" data-testid="pools-tab-test" />
          <Tab label="Tokens" data-testid="tokens-tab-test" />
        </Tabs>
        <SearchInputComponent
          className="info-search-box"
          placeholder="Search tokens or pools..."
        />
      </Box>

      <TabPanel value={tabValue} index={0}>
        <OverviewComponent />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <PoolsComponent />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <TokensComponent />
      </TabPanel>
    </InfoViewStyle >
  );
};
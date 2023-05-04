import { useState } from 'react';
import cn from 'classnames';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { ButtonComponent, Chart } from 'components';
import { InfoChartStyle } from './index.style';
import { DecreaseIcon, IncreaseIcon } from 'imgs/icons';

const chartData = [
  { x: 1.1, y: 50 },
  { x: 1.2, y: 100 },
  { x: 1.3, y: 120 },
  { x: 1.4, y: 440 },
  { x: 1.5, y: 40 },
  { x: 1.6, y: 130 },
  { x: 1.7, y: 240 },
  { x: 1.8, y: 435 },
  { x: 1.9, y: 333 },
  { x: 2.0, y: 223 },
];

const periods = [
  'D',
  'W',
  'M',
  'Y',
];

const summary = [
  {
    title: 'LSK Price',
    amount: '$1.007',
    percent: -2.34
  },
  {
    title: 'Total Liquidity',
    amount: '$14.4m',
    percent: 2.32
  },
  {
    title: 'Volume 24h',
    amount: '$2.5m',
    percent: 1.45
  },
  {
    title: 'Fees 24h',
    amount: '$48.9k',
    percent: 4.86
  },
  {
    title: 'Transactions 24h',
    amount: '621',
  },
];

export const InfoChart: React.FC = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [period, setPeriod] = useState<string>('D');

  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <InfoChartStyle>
      <Box className="info-chart-header">
        <Box className="info-chart-volume">
          <Typography variant="body1">Volume</Typography>
          <Typography variant="h2">$7,601,429</Typography>
          <Typography variant="body2">Apr 24, 2023</Typography>
        </Box>
        <Tabs className="info-chart-tab" value={tabValue} onChange={onChangeTab} centered>
          <Tab label="Liquidity" />
          <Tab label="TVL" />
        </Tabs>
        <Box className="info-chart-period">
          {
            periods.map((el) => (
              <ButtonComponent
                key={el}
                className={
                  cn({
                    'selected': el === period
                  })
                }
                onClick={() => { setPeriod(el); }}
              >
                <Typography variant="body2">{el}</Typography>
              </ButtonComponent>
            ))
          }
        </Box>
      </Box>
      <Chart className="info-chart-svg" data={chartData} dots />
      <Box className="info-chart-timeline">
        <Typography variant="caption">11:15 AM</Typography>
        <Typography variant="caption">1:45 PM</Typography>
        <Typography variant="caption">3:12 PM</Typography>
        <Typography variant="caption">5:11 PM</Typography>
        <Typography variant="caption">7:41 PM</Typography>
        <Typography variant="caption">8:16 PM</Typography>
        <Typography variant="caption">11:49 PM</Typography>
      </Box>
      <Box className="info-chart-summary">
        {
          summary.map(el => (
            <Box key={el.title} className="summary-item">
              <Box className="summary-title">
                <Typography variant="body1">{el.title}</Typography>
              </Box>
              <Typography variant="body2">{el.amount}</Typography>
              {
                el.percent &&
                <Box className={cn({ 'summary-percent': true, 'increase': el.percent >= 0 })} >
                  <Typography variant="body2">{el.percent}%</Typography>
                  {el.percent >= 0 ? <IncreaseIcon /> : <DecreaseIcon />}
                </Box>
              }
            </Box>
          ))
        }
      </Box>
    </InfoChartStyle >
  );
};
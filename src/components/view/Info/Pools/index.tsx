import { Box, Typography } from '@mui/material';
// import { faArrowUpRightFromSquare, faChevronRight, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { InfoChart, PoolsTable } from 'components';
import { PoolsComponentStyle } from './index.style';

// const chartData = [
//   { x: 1.1, y: 50 },
//   { x: 1.2, y: 100 },
//   { x: 1.3, y: 120 },
//   { x: 1.4, y: 440 },
//   { x: 1.5, y: 40 },
//   { x: 1.6, y: 130 },
//   { x: 1.7, y: 240 },
//   { x: 1.8, y: 435 },
//   { x: 1.9, y: 333 },
//   { x: 2.0, y: 223 },
// ];

export const PoolsComponent: React.FC = () => {
  // const [isLike, setLike] = useState<boolean>(false);

  return (
    <PoolsComponentStyle>
      <Box className="info-header">
        <Box>
          <Typography variant="subtitle1">Liquidity Pools</Typography>
          <Typography variant="body1">Start earning incentives by providing liquidity.</Typography>
        </Box>
        {/* <Box className="info-path">
          <Typography variant="h5">Home</Typography>
          <FontAwesomeIcon icon={faChevronRight} />
          <Typography variant="h5">Pools</Typography>
          <FontAwesomeIcon icon={faChevronRight} />
          <Typography variant="h5">{mockPool.token1.shortName}/{mockPool.token2.shortName}</Typography>
        </Box>
        <Box className="info-view-contract">
          <Typography variant="body1">View Contract</Typography>
          <IconButton>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </IconButton>
        </Box> */}
      </Box>

      {/* <Box className="pool-header">
        <Box className="pool-summary">
          <Box className="pool-summary-image-1">
            <Image src={mockPool.token1.image} width={48} height={48} />
          </Box>
          <Box className="pool-summary-image-2">
            <Image src={mockPool.token2.image} width={48} height={48} />
          </Box>

          <Box className="pool-summary-detail">
            <Box>
              <Typography variant="h5">{mockPool.token1.shortName}/{mockPool.token2.shortName}</Typography>
            </Box>
            <Box>
              <Typography>1 {mockPool.token1.shortName} = $ 0.92  1 {mockPool.token2.shortName} = $2.78</Typography>
            </Box>
          </Box>
        </Box>

        <Box className="pool-actions">
          <ToggleButton
            className="like-button"
            value="like"
            selected={isLike}
            onChange={() => {
              setLike(!isLike);
            }}
          >
            <FontAwesomeIcon
              icon={isLike ? fasStar : farStar}
            />
          </ToggleButton>
          <ButtonComponent className="add-liquidity-button" variant="outlined">
            <Typography variant="h5">Add Liquidity</Typography>
          </ButtonComponent>
          <ButtonComponent>
            <Typography variant="h5">Trade</Typography>
          </ButtonComponent>
        </Box>
      </Box> */}

      <Box className="table-title">
        <Typography variant="subtitle1">Saved Pools</Typography>
      </Box>
      <InfoChart />

      <Box className="table-title">
        <Typography variant="subtitle1">All Pools</Typography>
      </Box>
      <PoolsTable />
    </PoolsComponentStyle>
  );
};
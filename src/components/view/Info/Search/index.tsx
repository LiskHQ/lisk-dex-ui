import { NextRouter } from 'next/router';
import Image from 'next/image';
import { SearchComponentStyle } from './index.style';
import { InputComponent } from 'components';
import { Box, Typography } from '@mui/material';
import { mockPoolDetails, mockTokenDetails } from '__mock__';
import cn from 'classnames';
import { CancelIcon, DecreaseIcon, IncreaseIcon, SearchIcon } from 'imgs/icons';
import { useMemo, useState } from 'react';

interface ISearchComponentProps {
  className?: string,
  router: NextRouter,
}

export const SearchComponent: React.FC<ISearchComponentProps> = (props) => {
  const { className, router } = props;
  const [filter, setFilter] = useState<string>('');

  const pools = useMemo(() => {
    if (filter)
      return mockPoolDetails.filter(pool => pool.token1.name.includes(filter) || pool.token2.name.includes(filter) || pool.token1.shortName.includes(filter) || pool.token2.shortName.includes(filter)).slice(0, 3);
    return [];
  }, [filter]);

  const tokens = useMemo(() => {
    if (filter)
      return mockTokenDetails.filter(token => token.name.includes(filter) || token.shortName.includes(filter)).slice(0, 3);
    return [];
  }, [filter]);

  const onClickPoolsViewMore = () => {
    if (router) {
      router.push('?tabIndex=1');
    }
    setFilter('');
  };

  const onClickTpkensViewMore = () => {
    if (router) {
      router.push('?tabIndex=2');
    }
    setFilter('');
  };

  return (
    <SearchComponentStyle
      className={`${className} ${filter && 'filtered'}`}
    >
      <InputComponent
        className="search-input"
        placeholder="Search tokens or pools..."
        value={filter}
        onChange={(e) => { setFilter(e.target.value); }}

        startAdornment={
          <SearchIcon />
        }
        endAdornment={
          filter &&
          <CancelIcon className="cancel-icon" onClick={() => { setFilter(''); }} />
        }
      />
      {
        filter &&
        <>
          <Box className="search-label">
            <Typography variant="body2">Pools</Typography>
            <Typography className="label-tvl" variant="body2">TVL</Typography>
          </Box>
          {
            pools && pools.length > 0 && <>
              {
                pools.map((pool, index) =>
                  <Box key={index} className="search-pool-item">
                    <Box className="search-pool-name">
                      <Box className="pool-images">
                        <Box className="pool-image-1">
                          <Image src={pool.token1.image} width={34} height={34} />
                        </Box>
                        <Box className="pool-image-2">
                          <Image src={pool.token2.image} width={34} height={34} />
                        </Box>
                      </Box>
                      <Box className="pool-token-names">
                        <Typography variant="h5">{pool.token1.name} & {pool.token2.name}</Typography>
                        <Typography variant="body2">{pool.token1.shortName} / {pool.token2.shortName}</Typography>
                      </Box>
                    </Box>
                    <Box className="search-pool-value">
                      <Typography variant="h5">$ {pool.tvl}</Typography>
                      <Typography
                        className={
                          cn({
                            increasement: pool.APY > 0
                          })
                        }
                        variant="body2"
                      >
                        {pool.APY}
                        {
                          pool.APY > 0 ?
                            <IncreaseIcon /> :
                            <DecreaseIcon />
                        }
                      </Typography>
                    </Box>
                  </Box>)
              }
              <Typography className="view-more" variant="body2" onClick={onClickPoolsViewMore}>View more...</Typography>
            </>
          }


          <Box className="search-label">
            <Typography variant="body2">Tokens</Typography>
            <Typography className="label-tvl" variant="body2">Price</Typography>
          </Box>
          {
            tokens && tokens.length > 0 && <>
              {
                tokens.map((token, index) =>
                  <Box key={index} className="search-pool-item">
                    <Box className="search-pool-name">
                      <Box className="pool-images">
                        <Box className="pool-image-1">
                          <Image src={token.image} width={34} height={34} />
                        </Box>
                      </Box>
                      <Box className="pool-token-names">
                        <Typography variant="h5">{token.name}</Typography>
                        <Typography variant="body2">{token.shortName}</Typography>
                      </Box>
                    </Box>
                    <Box className="search-pool-value">
                      <Typography variant="h5">$ {token.price}</Typography>
                      <Typography
                        className={
                          cn({
                            increasement: token.priceChange > 0
                          })
                        }
                        variant="body2"
                      >
                        {token.priceChange}
                        {
                          token.priceChange > 0 ?
                            <IncreaseIcon /> :
                            <DecreaseIcon />
                        }
                      </Typography>
                    </Box>
                  </Box>)
              }
              <Typography className="view-more" variant="body2" onClick={onClickTpkensViewMore}>View more...</Typography>
            </>
          }

        </>
      }
    </SearchComponentStyle >
  );
};

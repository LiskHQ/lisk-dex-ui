import Image from 'next/image';
import cn from 'classnames';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { SearchInputComponent } from 'components/common';
import { SelectTokenModalStyle } from './index.style';
import { useMemo, useState } from 'react';
import { IToken } from 'models';

export interface ISelectTokenModalProps {
  tokens: IToken[],
  onSelect: (value: IToken) => void,
  onClose: () => void,
}

export const SelectTokenModal: React.FC<ISelectTokenModalProps> = (props) => {
  const { tokens, onSelect, onClose } = props;
  const [close, setClose] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');

  const onClickChevronDown = () => {
    setClose(true);
  };

  const filteredTokens = useMemo(() => {
    return tokens.filter(el => el.shortName.includes(filter) || el.name.includes(filter));
  }, [filter, tokens]);

  return (
    <SelectTokenModalStyle
      className={
        cn({
          close: close
        })
      }
      onAnimationEnd={() => {
        if (close) {
          onClose();
          setClose(false);
        }
      }}
    >
      <Box className="select-token-container"
      >
        <Box className="select-token-modal-title">
          <IconButton
            data-testid="select-token-modal-cancel-test"
            onClick={onClickChevronDown}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </IconButton>
          <Typography variant="h4">Select token</Typography>
        </Box>
        <SearchInputComponent
          className="search-input-component"
          placeholder="Search name or paste address"
          onChange={(value) => { setFilter(value); }}
        />
        <Box className="select-token-common-tokens">
          <Typography variant="body2">Common tokens</Typography>
          <Grid container className="select-token-common-tokens-list" spacing={1}>
            {
              tokens.map(chain => (
                <Grid item
                  key={chain.shortName}
                >
                  <Box className="select-token-chain-box">
                    <Image src={chain.image} width={20} height={20} />
                    <Typography variant="body2">{chain.shortName}</Typography>
                  </Box>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </Box>
      <Box className="select-token-balance-list">
        {
          filteredTokens.map(chain => (
            <Box
              key={chain.shortName}
              data-testid={`token-item-${chain.shortName}`}
              className="select-token-balance-item"
              onClick={() => { onSelect(chain); setClose(true); }}
            >
              <Box className="token-wrapper">
                <Image src={chain.image} width={40} height={40} />
                <Box className="token-name-wrapper">
                  <Typography className="token-short-name" variant="body1">{chain.shortName}</Typography>
                  <Typography variant="body2">{chain.name}</Typography>
                </Box>
              </Box>
              <Typography variant="body1">{0}</Typography>
            </Box>
          ))
        }
      </Box>
    </SelectTokenModalStyle>
  );
};
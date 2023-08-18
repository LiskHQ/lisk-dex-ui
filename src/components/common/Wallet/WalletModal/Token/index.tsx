import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { TokenComponentStyle } from './index.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { IToken } from 'models';
import { BadgeCheckIcon, tokenSvgs } from 'imgs/icons';

export interface ITokenComponentProps {
  token: IToken,
  onBack: () => void,
}

export const TokenComponent: React.FC<ITokenComponentProps> = (props) => {
  const { token, onBack } = props;

  return (
    <TokenComponentStyle>
      <Box className="token-header">
        <IconButton onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </IconButton>
        <Box className="token-name">
          <BadgeCheckIcon />
          <Typography variant="h4">Lisk</Typography>
        </Box>
        <IconButton>
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </IconButton>
      </Box>
      <Box className="token-main">
        <Box className="token-image">
          <Image src={tokenSvgs[token.symbol]} width={40} height={40} />
        </Box>
        <Typography variant="body2">$22,671.52</Typography>
        <Typography variant="h2">20,452.45 {token.symbol}</Typography>
      </Box>
    </TokenComponentStyle >
  );
};
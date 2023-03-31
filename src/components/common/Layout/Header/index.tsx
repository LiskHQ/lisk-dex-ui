import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Box, IconButton, MenuItem, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import { MENU_ITEMS, PATHS } from 'consts';
import { LightcurveIcon, LiskIcon } from 'imgs/icons';
import { HeaderStyle } from './index.style';
import AvatarImg from 'imgs/avatar.png';
import { useEffect } from 'react';
import { DropdownComponent } from 'components';

const compareUrl = (a: string, b: string) => {
  if (a.indexOf(b) === 0) return true;
  return false;
}

export const Header: React.FC = () => {
  const router = useRouter();
  const { pathname } = router || { pathname: '' };

  useEffect(() => {
  }, [pathname]);

  return (
    <HeaderStyle>
      <Container className="header-container" maxWidth="xl">
        <LightcurveIcon className="header-logo" />
        <Box className="header-menu">
          {
            MENU_ITEMS.map(item => (
              <Link href={item.href} passHref legacyBehavior key={item.href}>
                <Box
                  className={cn({
                    "header-menu-item": true,
                    "active": compareUrl(pathname, item.href),
                  })}
                >
                  <Typography variant="h5">{item.title}</Typography>
                </Box>
              </Link>
            ))
          }

          <DropdownComponent
            className="header-menu-chain"
            value={10}
          >
            <MenuItem value={10}><LiskIcon /><Typography variant="h5">Lisk-testnet</Typography></MenuItem>
          </DropdownComponent>

          <Box className="header-menu-wallet">
            <Typography variant="h5">2921LSK</Typography>
            <Box className="header-menu-wallet-address">
              <Typography variant="h5">0x45d5...9915</Typography>
              <Image src={AvatarImg} alt="avatar" />
            </Box>
          </Box>

          <IconButton className="header-menu-list-button">
            <FontAwesomeIcon icon={faEllipsis} />
          </IconButton>
        </Box>
      </Container>
    </HeaderStyle>
  )
}

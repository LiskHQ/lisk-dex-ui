import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Box, IconButton, MenuItem, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import { menuItems } from 'consts';
import { LightcurveIcon, LiskIcon } from 'imgs/icons';
import { HeaderStyle } from './index.style';
import AvatarImg from 'imgs/avatar.png';
import { useEffect } from 'react';
import { DropdownComponent } from 'components';

const compareUrl = (a: string, b: string) => {
  if (`/${a.split('/')[1]}` === b)
    return true;
  return false;
}

const ellipsisAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
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
            menuItems.map(item => (
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
              <Typography variant="h5">{ellipsisAddress("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1")}</Typography>
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

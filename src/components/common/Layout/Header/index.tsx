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
import { useEffect, useState } from 'react';
import { DropdownComponent, SettingsModal } from 'components';
import { compareUrl, ellipsisAddress } from 'utils';

interface IProps {
}

export const Header: React.FC<IProps> = (props) => {
  const router = useRouter();

  const { pathname } = router || { pathname: '' };
  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);

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
            defaultValue={10}
          >
            <MenuItem value={10}><LiskIcon /><Typography variant="h5">Lisk-testnet</Typography></MenuItem>
          </DropdownComponent>

          <Box className="header-menu-wallet">
            <Typography variant="h5">2921LSK</Typography>
            <Box className="header-menu-wallet-address">
              <Typography variant="h5">{ellipsisAddress("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1")}</Typography>
              <Image src="/assets/avatars/avatar.png" width={24} height={24} />
            </Box>
          </Box>

          <IconButton className="header-menu-list-button" onClick={() => { setOpenSettingsModal(true); }}>
            <FontAwesomeIcon icon={faEllipsis} />
          </IconButton>
        </Box>
        {
          openSettingsModal &&
          <SettingsModal
            onClose={() => { setOpenSettingsModal(false); }}
          />
        }
      </Container>
    </HeaderStyle>
  )
}

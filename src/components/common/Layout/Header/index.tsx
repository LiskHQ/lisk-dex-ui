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
import { IPlatformContext } from 'contexts';
import { ISettings } from 'models';

export interface IHeaderProps {
  platform: IPlatformContext
}

export const Header: React.FC<IHeaderProps> = (props) => {
  const router = useRouter();
  const { platform } = props;

  const { pathname } = router || { pathname: '' };
  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);
  const [settings, setSettings] = useState<ISettings>();

  useEffect(() => {
    setSettings({
      theme: platform.getThemeType(),
      currency: platform.currency,
      splipageTolerance: settings?.splipageTolerance || 0,
      transactionDeadline: settings?.transactionDeadline || 0,
    });
  }, [platform]);

  const onSaveSettings = (_settings: ISettings) => {
    platform.saveCurrency(_settings.currency);
    platform.saveTheme(_settings.theme);
    setSettings({ ..._settings });
  }

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
                    'header-menu-item': true,
                    'active': compareUrl(pathname, item.href),
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
              <Typography variant="h5">{ellipsisAddress('0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')}</Typography>
              <Image src="/assets/avatars/avatar.png" width={24} height={24} />
            </Box>
          </Box>

          <IconButton className="header-menu-list-button" onClick={() => { setOpenSettingsModal(true); }}>
            <FontAwesomeIcon icon={faEllipsis} />
          </IconButton>
        </Box>
        {
          openSettingsModal && settings &&
          <SettingsModal
            settings={settings}
            onClose={() => { setOpenSettingsModal(false); }}
            onSave={onSaveSettings}
          />
        }
      </Container>
    </HeaderStyle>
  );
};

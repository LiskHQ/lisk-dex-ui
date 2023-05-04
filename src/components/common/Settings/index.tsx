import Image from 'next/image';
import { Box, IconButton, MenuItem, Typography } from '@mui/material';
import { ButtonComponent, DropdownComponent, TransactionSettings, SwitchComponent } from 'components';
import { CancelIcon } from 'imgs/icons';
import { SettingsModalStyle } from './index.style';
import { mockFiatCurrnecies } from '__mock__';
import { useTheme } from '@mui/styles';
import { useContext, useEffect, useState } from 'react';
import { PlatformContext } from 'contexts';
import { ThemeType } from 'consts';


export interface ISettingsModalProps {
  onClose?: () => void,
}

export const SettingsModal: React.FC<ISettingsModalProps> = (props) => {
  const { onClose } = props;
  const theme: any = useTheme();
  const platformContext = useContext(PlatformContext);

  const [splipageTolerance, setSpliageTolerance] = useState<number>(0);
  const [transactionDeadline, setTransactionDeadline] = useState<number>(0);
  const [themeType, setThemeType] = useState<ThemeType>(ThemeType.Light);

  useEffect(() => {
    setThemeType(platformContext.getThemeType() === ThemeType.Dark ? ThemeType.Dark : ThemeType.Light);
  }, [platformContext]);

  const onSave = () => {
    platformContext.saveTheme(themeType);
    onClose && onClose();
  };

  return (
    <SettingsModalStyle>
      <Box className="settings-background"></Box>
      <Box className="settings-modal-container">
        <Box className="settings-modal-header">
          <Typography variant="h4">Settings</Typography>

          <IconButton onClick={() => { onClose && onClose(); }}>
            <CancelIcon />
          </IconButton>
        </Box>

        <Box className="settings-modal-body">
          <Box className="settings-dark-mode">
            <Box>
              <Typography className="title" variant="body1">Dark Mode</Typography>
              <Typography className="description" variant="body2">Toggle between dark and light mode</Typography>
            </Box>
            <SwitchComponent
              checked={themeType === ThemeType.Dark}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setThemeType((event.target.checked ? ThemeType.Dark : ThemeType.Light)); }}
            />
          </Box>

          <Box className="settings-currency">
            <Box>
              <Typography className="title" variant="body1">Currency</Typography>
              <Typography className="description" variant="body2">Select the fiat currency on display</Typography>
            </Box>
            <DropdownComponent
              className="currency-dropdown"
              defaultValue="USD"
              renderValue={(value) => {
                const item = mockFiatCurrnecies.find(el => el.shortName === value);
                return (
                  <Box sx={{
                    display: 'flex',
                  }}>
                    <Image src={item?.image} width={24} height={17} />
                    <Typography variant="body1" sx={{ marginLeft: '0.75rem' }}>{item?.shortName}</Typography>
                  </Box>
                );
              }}
            >
              {
                mockFiatCurrnecies.map(el => (
                  <MenuItem key={el.shortName} value={el.shortName} sx={{
                    display: 'flex',
                  }}>
                    <Image src={el.image} width={24} height={17} />
                    <Typography variant="body1" sx={{ marginLeft: '0.75rem' }}>{el.shortName}</Typography>
                    <Typography variant="body2" sx={{ marginLeft: '0.75rem', color: theme.text.paragraph }}>{el.name}</Typography>
                  </MenuItem>
                ))
              }
            </DropdownComponent>
          </Box>
          <TransactionSettings
            splipageTolerance={splipageTolerance}
            transactionDeadline={transactionDeadline}
            onChangeSplipageTolerance={(value) => { setSpliageTolerance(value); }}
            onChangeTransactionDeadline={(value) => { setTransactionDeadline(value); }}
          />
        </Box>

        <Box className="settings-modal-footer">
          <ButtonComponent
            data-testid="settings-modal-cancel-test"
            className="settings-modal-cancel"
            variant="outlined"
            onClick={() => { onClose && onClose(); }}
          >
            <Typography variant="body1">Cancel</Typography>
          </ButtonComponent>
          <ButtonComponent
            data-testid="settings-modal-confirm-test"
            className="settings-modal-confirm"
            onClick={() => { onSave(); }}
          >
            <Typography variant="body1">
              Save
            </Typography>
          </ButtonComponent>
        </Box>
      </Box>
    </SettingsModalStyle>
  );
};

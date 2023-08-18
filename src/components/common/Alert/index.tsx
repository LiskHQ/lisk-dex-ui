import { Box, IconButton, Typography } from '@mui/material';
import { AlertVariant } from 'consts';
import { CancelIcon, InfoIcon, SuccessIcon, FailureIcon } from 'imgs/icons';
import Link from 'next/link';
import { AlertComponentStyle } from './index.style';

export interface IAlertComponent {
  variant: AlertVariant,
  subject: string,
  description: string,
  link?: string,
  onClose: () => void,
}

export const AlertComponent: React.FC<IAlertComponent> = (props) => {
  const { variant, subject, description, link, onClose } = props;

  return (
    <AlertComponentStyle>
      <IconButton className="alert-component-cancel" onClick={() => { onClose(); }}>
        <CancelIcon />
      </IconButton>
      <Box className="alert-component-main">
        <Box className="alert-component-icon">
          {
            {
              [AlertVariant.success]: <SuccessIcon />,
              [AlertVariant.info]: <InfoIcon />,
              [AlertVariant.fail]: <FailureIcon />,
            }[variant]
          }
        </Box>
        <Box className="alert-component-content">
          <Typography className="alert-component-subject" variant="body1">{subject}</Typography>
          {description && <Typography className="alert-component-description" variant="body2">{description}</Typography>}
          {link && <Link href={link}><Typography className="alert-component-link" variant="body2">View on Liskscan</Typography></Link>}
        </Box>
      </Box>
    </AlertComponentStyle>
  );
};
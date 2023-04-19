import { Box, IconButton, Typography } from "@mui/material";
import { CancelIcon, InfoIcon } from "imgs/icons";
import { AlertComponentStyle } from "./index.style";

export interface IAlertComponent {
  subject: string,
  description: string,
  onClose: () => void,
}

export const AlertComponent: React.FC<IAlertComponent> = (props) => {
  const { subject, description, onClose } = props;

  return (
    <AlertComponentStyle>
      <IconButton className="alert-component-cancel" onClick={() => { onClose(); }}>
        <CancelIcon />
      </IconButton>
      <Box className="alert-component-main">
        <Box className="alert-component-icon">
          <InfoIcon />
        </Box>
        <Box className="alert-component-content">
          <Typography className="alert-component-subject" variant="body1">{subject}</Typography>
          <Typography className="alert-component-description" variant="body2">{description}</Typography>
        </Box>
      </Box>
    </AlertComponentStyle>
  )
}
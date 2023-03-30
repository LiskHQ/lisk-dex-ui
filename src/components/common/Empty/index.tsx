import { Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { DarkEmptyIcon, LightEmptyIcon } from 'imgs/icons';

import { EmptyStyle } from './index.style';

interface IProps {
  subject: string;
  description: string;
}

const Empty: React.FC<IProps> = (props) => {
  const { subject, description } = props;
  const theme = useTheme();
  return (
    <EmptyStyle>
      {theme?.palette.mode === 'light' ? <LightEmptyIcon /> : <DarkEmptyIcon />}
      <Typography className="empty-subject" variant="subtitle2">{subject}</Typography>
      <Typography className="empty-description" variant="body2">{description}</Typography>
    </EmptyStyle>
  )
}

export default Empty;
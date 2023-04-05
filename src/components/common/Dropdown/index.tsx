import { FormLabel, Select, SelectChangeEvent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useState } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { DropdownComponentStyle } from './index.style';
import { useTheme } from '@mui/styles';

interface IProps {
  className?: string,
  label?: ReactNode,
  children?: React.ReactNode,
  onChange?: (event: SelectChangeEvent<number>, child: ReactNode) => void;
  renderValue?: (value: number) => ReactNode;
  value?: number | string,
}

export const DropdownComponent: React.FC<IProps> = (props) => {
  const { className, label, children, ...selectProps } = props;
  const [isOpen, setOpen] = useState<boolean>(false);

  const theme = useTheme();
  return (
    <DropdownComponentStyle
      className={className}
    >
      {
        !!label && <FormLabel>{label}</FormLabel>
      }
      <Select
        displayEmpty
        IconComponent={() => (<FontAwesomeIcon className="dropdown-arrow" icon={isOpen ? faChevronUp : faChevronDown} />)}
        onOpen={() => { setOpen(true); }}
        onClose={() => { setOpen(false); }}
        MenuProps={{
          PaperProps: {
            style: {
              background: theme.bg.secondary,
            }
          }
        }}
        {...selectProps}
        data-testid="dropdown-select"
      >
        {children}
      </Select>
    </DropdownComponentStyle>
  )
}

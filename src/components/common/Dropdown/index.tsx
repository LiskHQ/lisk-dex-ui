import { FormLabel, Select, SelectChangeEvent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useState } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { DropdownComponentStyle } from './index.style';
import { useTheme } from '@mui/styles';

interface IProps {
  className?: string,
  label?: string,
  children?: React.ReactNode,
  onChange?: (event: SelectChangeEvent<number>, child: ReactNode) => void;
  renderValue?: (value: number) => ReactNode;
  value?: number | string,
}

export const DropdownComponent: React.FC<IProps> = (props) => {
  const { className, label, children, value, renderValue, onChange } = props;
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
        value={value}
        IconComponent={() => (<FontAwesomeIcon className="dropdown-arrow" icon={isOpen ? faChevronUp : faChevronDown} />)}
        onChange={onChange}
        onOpen={() => { setOpen(true); }}
        onClose={() => { setOpen(false); }}
        renderValue={renderValue}
        MenuProps={{
          PaperProps: {
            style: {
              background: theme.bg.secondary,
            }
          }
        }}
      >
        {children}
      </Select>
    </DropdownComponentStyle>
  )
}

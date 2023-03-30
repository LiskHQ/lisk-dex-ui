import { SelectChangeEvent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useState } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { DropdownStyle } from './index.style';

interface IProps {
  className?: string,
  children?: React.ReactNode,
  onChange?: (event: SelectChangeEvent<number>, child: ReactNode) => void;
  value?: any,
}

const Dropdown: React.FC<IProps> = (props) => {
  const { className, children, value, onChange } = props;
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <DropdownStyle
      className={className}
      value={value}
      IconComponent={() => (<FontAwesomeIcon className="dropdown-arrow" icon={isOpen ? faChevronUp : faChevronDown} />)}
      onChange={onChange}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}
    >
      {children}
    </DropdownStyle>
  )
}

export default Dropdown;
import { FormHelperText, FormLabel, Input } from "@mui/material"
import { InputComponentStyle } from "./index.style"
import cn from 'classnames';

interface IProps {
  className?: string,
  label?: string,
  placeholder?: string,
  error?: string,
}

export const InputComponent: React.FC<IProps> = (props) => {
  const {
    className,
    label,
    placeholder,
    error,
  } = props;

  return (
    <InputComponentStyle className={
      cn({
        "input-component-container": true,
        className: !!className,
      })
    }>
      {
        !!label && <FormLabel>{label}</FormLabel>
      }
      <Input placeholder={placeholder} />
      {
        error ??
        <FormHelperText>{error}</FormHelperText>
      }
    </InputComponentStyle>
  )
}

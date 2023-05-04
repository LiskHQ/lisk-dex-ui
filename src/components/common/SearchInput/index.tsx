import { SearchInputComponentStyle } from "./index.style"
import { useTheme } from "@mui/styles";
import { InputBase, InputLabel } from "@mui/material";
import { ReactNode } from "react";
import { RegisterOptions } from 'react-hook-form';
import { SearchIcon } from "imgs/icons";

interface IProps {
  name?: string,
  className?: string,
  label?: ReactNode,
  placeholder?: string,
  helper?: ReactNode,
  type?: string,
  multiline?: boolean,
  minRows?: number,
  maxRows?: number,
  maxLength?: number,
  min?: number,
  max?: number,
  value?: string | number,
  readOnly?: boolean,
  onChange?: (value: string) => void,
  options?: RegisterOptions,
}

export const SearchInputComponent: React.FC<IProps> = (props) => {
  const theme: any = useTheme();
  const { maxLength, onChange, options, className, type, label, ...inputProps } = props;

  return (
    <SearchInputComponentStyle
      className={className}
    >
      <InputLabel shrink>
        {label}
      </InputLabel>
      <SearchIcon className="search-icon" />
      <InputBase
        type={type}
        inputProps={{
          sx: {
            "&::placeholder": {
              opacity: 1,
              color: theme.text.placeholder,
            },
            "&::-webkit-outer-spin-button. &::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              display: "none"
            },
          },
          maxLength,
        }}
        onChange={(event) => { onChange && onChange(event.target.value) }}
        {...inputProps}
      />
    </SearchInputComponentStyle >
  )
}

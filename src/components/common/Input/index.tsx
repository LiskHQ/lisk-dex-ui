import { InputComponentStyle } from "./index.style"
import { useTheme } from "@mui/styles";
import { Box, InputBase, InputLabel, Typography } from "@mui/material";
import { ChangeEventHandler, KeyboardEventHandler, ReactNode } from "react";
import { UseFormRegister, RegisterOptions, UseFormWatch } from 'react-hook-form';

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
  disabled?: boolean,
  defaultValue?: string | number,
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  register?: UseFormRegister<any>,
  watch?: UseFormWatch<any>,
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  options?: RegisterOptions,
}

export const InputComponent: React.FC<IProps> = (props) => {
  const theme = useTheme();
  const { maxLength, register, watch, options, className, name: fieldName, type, min, max, label, ...inputProps } = props;
  const value = watch && fieldName && watch(fieldName);

  return (
    <InputComponentStyle
      className={className}
    >
      {
        label &&
        <InputLabel shrink>
          {label}
        </InputLabel>
      }
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
        {...(register && register(fieldName!, options))}
        {...inputProps}
      />
      {
        !!value && maxLength &&
        <Box className="input-length-counter">
          <Typography variant="caption">{value.length}/{maxLength}</Typography>
        </Box>
      }
    </InputComponentStyle >
  )
}

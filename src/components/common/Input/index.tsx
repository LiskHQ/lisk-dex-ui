import { InputComponentStyle } from "./index.style"
import { useTheme } from "@mui/styles";
import { Box, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { UseFormRegister, RegisterOptions, UseFormWatch } from 'react-hook-form';

interface IProps {
  name?: string,
  className?: string,
  label?: ReactNode,
  placeholder?: string,
  error?: string,
  type?: string,
  multiline?: boolean,
  minRows?: number,
  maxRows?: number,
  maxLength?: number,
  min?: number,
  max?: number,
  onChange?: (value: string) => void,
  register?: UseFormRegister<any>,
  watch?: UseFormWatch<any>,
  onKeyDown?: (e: any) => void,
  options?: RegisterOptions,
}

export const InputComponent: React.FC<IProps> = (props) => {
  const theme = useTheme();
  const { maxLength, onChange, register, watch, options, className, name: fieldName, type, min, max, ...inputProps } = props;
  const value = watch && fieldName && watch(fieldName);


  return (
    <InputComponentStyle
      className={className}
    >
      <TextField
        type={type}
        InputLabelProps={{ shrink: true }}
        inputProps={{
          sx: {
            "&::placeholder": {
              opacity: 1,
              color: theme.text.placeholder,
            },
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
              display: "none"
            }
          },
          maxLength,
        }}
        {...(register && register(fieldName!, options))}
        {...inputProps}
      />
      {
        !!value && maxLength &&
        <Box sx={{
          position: 'absolute',
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
          color: theme.text.paragraph,
          marginTop: '0.25rem',
          marginBottom: '0.25rem',
        }}>
          <Typography variant="caption">{value.length}/{maxLength}</Typography>
        </Box>
      }
    </InputComponentStyle>
  )
}

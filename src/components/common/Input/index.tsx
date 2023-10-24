import { InputComponentStyle } from './index.style';
import { useTheme } from '@mui/styles';
import { Box, FormHelperText, InputBase, InputBaseProps, InputLabel, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { UseFormRegister, RegisterOptions, UseFormWatch } from 'react-hook-form';

interface IProps extends InputBaseProps {
  name?: string,
  label?: ReactNode,
  type?: string,
  maxLength?: number,
  register?: UseFormRegister<any>,
  watch?: UseFormWatch<any>,
  options?: RegisterOptions,
  helperText?: string,
  variant?: string,
}

export const InputComponent: React.FC<IProps> = (props) => {
  const theme: any = useTheme();
  const { maxLength, register, watch, options, className, name: fieldName, type, label, helperText, ...inputProps } = props;
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
            '&::placeholder': {
              opacity: 1,
              color: theme.text.placeholder,
            },
          },
          maxLength,
        }}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        {...(register && register(fieldName!, options))}
        {...inputProps}
      />
      {
        !!value && maxLength &&
        <Box className="input-length-counter">
          <Typography variant="caption">{value.length}/{maxLength}</Typography>
        </Box>
      }
      {
        helperText &&
        <FormHelperText>
          <Typography variant="body2">{helperText}</Typography>
        </FormHelperText>
      }
    </InputComponentStyle >
  );
};

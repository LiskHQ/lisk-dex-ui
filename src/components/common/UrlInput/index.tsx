import { UrlInputComponentStyle } from './index.style';
import { useTheme } from '@mui/styles';
import { Box, InputBase, InputLabel, Typography } from '@mui/material';
import { KeyboardEventHandler, ReactNode } from 'react';
import { UseFormRegister, RegisterOptions, UseFormWatch } from 'react-hook-form';
import { LinkIcon } from 'imgs/icons';
import cn from 'classnames';
import { isValidURL } from 'utils';

interface IProps {
  name?: string,
  className?: string,
  label?: ReactNode,
  placeholder?: string,
  type?: string,
  multiline?: boolean,
  minRows?: number,
  maxRows?: number,
  maxLength?: number,
  value?: string,
  readOnly?: boolean,
  register?: UseFormRegister<any>,
  watch?: UseFormWatch<any>,
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  options?: RegisterOptions,
}

export const UrlInputComponent: React.FC<IProps> = (props) => {
  const theme: any = useTheme();
  const {
    maxLength,
    register,
    watch,
    options,
    className,
    name: fieldName,
    type,
    label,
    ...inputProps
  } = props;
  const value = watch && fieldName && watch(fieldName);

  const onClickLink = () => {
    if (isValidURL(value))
      window.location.href = value;
  };
  return (
    <UrlInputComponentStyle
      className={className}
    >
      <InputLabel shrink>
        {label}
      </InputLabel>
      <InputBase
        type={type}
        inputProps={{
          sx: {
            '&::placeholder': {
              opacity: 1,
              color: theme.text.placeholder,
            },
            color: theme.lightcurve[0],
            textDecoration: value ? 'underline' : 'unset',
          },
          maxLength,
        }}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        {...(register && register(fieldName!, options))}
        {...inputProps}
      />
      <LinkIcon className={
        cn(
          {
            'link-icon': true,
            'active': !!value,
          })}
      onClick={onClickLink}
      />
      {
        !!value && maxLength &&
        <Box className="input-length-counter">
          <Typography variant="caption">{value.length}/{maxLength}</Typography>
        </Box>
      }
    </UrlInputComponentStyle >
  );
};

import { ChangeEvent, InputHTMLAttributes } from "react";
import { RadioComponentStyle } from "./index.style";

interface IProps {
  checked?: boolean,
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void,
  value?: unknown,
  name?: string,
  inputProps?: InputHTMLAttributes<HTMLInputElement>,
}

export const RadioComponent: React.FC<IProps> = (props) => {
  return (
    <RadioComponentStyle
      {...props}
    />
  )
}
import { ReactNode } from "react"
import { ButtonComponentStyle } from "./index.style"

interface IProps {
  children?: ReactNode,
  disabled?: boolean,
  type?: string,
  onClick?: () => void,
}
export const ButtonComponent: React.FC<IProps> = (props) => {
  const { children } = props;

  return (
    <ButtonComponentStyle
      {...props}
    >
      {children}
    </ButtonComponentStyle>
  )
}
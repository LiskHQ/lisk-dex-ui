import { LoaderComponent } from "components";
import { ReactNode } from "react"
import { ButtonComponentStyle } from "./index.style"

interface IProps {
  children?: ReactNode,
  disabled?: boolean,
  loading?: boolean,
  type?: string,
  onClick?: () => void,
}
export const ButtonComponent: React.FC<IProps> = (props) => {
  const { children, loading, disabled, ...buttonProps } = props;

  return (
    <ButtonComponentStyle
      {...buttonProps}
      disabled={disabled || loading}
    >
      {
        loading ?
          <LoaderComponent /> :
          children
      }
    </ButtonComponentStyle>
  )
}
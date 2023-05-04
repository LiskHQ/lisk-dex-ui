import { LoaderComponent } from "components";
import { ReactNode } from "react"
import { ButtonComponentStyle } from "./index.style"

interface IProps {
  className?: string,
  children?: ReactNode,
  disabled?: boolean,
  loading?: boolean,
  variant?: string,
  size?: string,
  type?: string,
  "data-testid"?: string,
  onClick?: () => void,
}
export const ButtonComponent: React.FC<IProps> = (props) => {
  const { children, loading, disabled, variant = "contained", ...buttonProps } = props;

  return (
    <ButtonComponentStyle
      {...buttonProps}
      variant={variant}
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

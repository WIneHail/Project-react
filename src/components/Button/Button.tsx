import { FC } from "react";
import { ButtonProps } from "./props";
import './style.scss'

export const Button: FC<ButtonProps> = ({
  children,
  className,
  title,
  isDisabled,
  kind,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`button ${className} ${kind}`}
      title={title}
      disabled={isDisabled}
      {...props}
    >{children}</button >
  )

}
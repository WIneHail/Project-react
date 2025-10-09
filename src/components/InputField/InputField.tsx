import { FC } from "react";
import { Props } from "./props";
import './style.scss'

export const InputField: FC<Props> = ({
  imgChild,
  errorMessage,
  child,
  dropdown,
  btn
}) => {
  return (
    <>
      <div className="input">
        {imgChild}
        {child}
        {dropdown}
        {btn}
      </div>
      {errorMessage && (
        <span className="input__error">{errorMessage}</span>
      )}
    </>
  )
}
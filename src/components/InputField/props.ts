import { ReactNode } from "react"

export interface Props {
  imgChild: ReactNode,
  child: ReactNode,
  errorMessage?: string;
  dropdown?: ReactNode
  btn?: ReactNode
}
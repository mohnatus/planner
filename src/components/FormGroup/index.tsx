import { ReactNode } from "react";

export interface FormGroupProps {
  id?: string,
  label?: string,
  children: ReactNode
}

export function FormGroup({ id, label, children }: FormGroupProps) {
  return <div>
    { label && <div><label htmlFor={id}>{label}</label></div>}

    { children }
  </div>
}
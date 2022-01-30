import { FC } from "react"
import styles from "./Input.module.css"

interface InputProps {
  className?: string,
  [x: string]: any
}

const Input: FC<InputProps> = ({
  className,
  ...InputProps
}) => {
  return (
    <input className={`${styles.input} ${className}`} {...InputProps} />
  )
}

export default Input
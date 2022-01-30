import { FC } from "react"
import styles from "./Button.module.css"

interface ButtonProps {
  className?: string,
  variant?: 'secondary',
  [x: string]: any
}

const Button: FC<ButtonProps> = ({
  className,
  variant,
  ...buttonProps
}) => {
  return (
    <button
      className={`${styles.button} ${className} ${variant && styles[variant]}`} 
      {...buttonProps}
    />
  )
}

export default Button
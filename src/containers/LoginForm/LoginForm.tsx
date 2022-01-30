import { FC, useState } from 'react'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import styles from './LoginForm.module.css'

interface LoginFormProps {
  onLoginSubmit: (username: string, password: string) => void,
  isWrongCredentials: boolean
}

const LoginForm: FC<LoginFormProps> = ({onLoginSubmit, isWrongCredentials}) => {
  const [usernameValue, setUsernameValue] = useState('jonsnow@gmail.com')
  const [passwordValue, setPasswordValue] = useState('lorem')

  const isSubmitDisabled = usernameValue === '' || passwordValue === ''

  return (
      <form
        className={styles.loginForm}
        onSubmit={(e) => {
          e.preventDefault()
          onLoginSubmit(usernameValue, passwordValue)
        }}
      >
        <label>
          <p className={styles.labelText}>Username</p>
          <Input
            type='email'
            value={usernameValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsernameValue(e.target.value)}}
            />
        </label>

        <label>
          <p className={styles.labelText}>Password</p>
          <Input
            type='password'
            value={passwordValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPasswordValue(e.target.value)}} 
          />
        </label>

        {isWrongCredentials &&
          <p className={styles.errorMessage}>
            Please check your credentials and try again.
          </p>}

        <div className={styles.actions}>
          <Button
            type='submit'
            disabled={isSubmitDisabled}
            className={styles.submit}
          >
            Login
          </Button>
        </div>
      </form>
  )
}

export default LoginForm
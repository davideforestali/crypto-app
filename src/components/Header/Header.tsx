import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../Button/Button'
import styles from './Header.module.css'

interface HeaderProps {
  isLoggedIn: boolean,
  onLoginActivate: () => void,
  onLogout: () => void
}

const Header: FC<HeaderProps> = ({isLoggedIn, onLoginActivate, onLogout}) => {

  const getActiveLinkModifier = (navData: { isActive: boolean }) => {
    return navData.isActive ? styles.active : ''
  }

  let accountSectionToRender = (
    <Button variant='secondary' onClick={onLoginActivate}>Login</Button>
  )

  if (isLoggedIn) {
    accountSectionToRender = (
      <div>
        <button className={styles.avatar}>👤</button>
        <Button variant='secondary' onClick={onLogout}>Logout</Button>
      </div>
    )
  }

  return (
    <header className={styles.header}>
      <nav className={styles.mainSection}>
        <ul>
          <li>
            <NavLink className={getActiveLinkModifier} to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink className={getActiveLinkModifier} to='/trade'>Trade</NavLink>
          </li>
        </ul>
      </nav>

      {accountSectionToRender}
    </header>
  )
}

export default Header
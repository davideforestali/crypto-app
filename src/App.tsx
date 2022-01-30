import { useState } from 'react'
import { Route, Routes } from 'react-router'
import AssetsLister from './containers/AssetsLister/AssetsLister'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header/Header'
import ExchangeForm from './containers/ExchangeForm/ExchangeForm'
import LoginForm from './containers/LoginForm/LoginForm'
import Modal from './components/Modal/Modal'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginFormActive, setIsLoginFormActive] = useState(false)
  const [isWrongCredentials, setIsWrongCredentials] = useState(false)

  const loginSubmitHandler = (username: string, password: string) => {
    if (username === 'jonsnow@gmail.com' && password === 'lorem') {
      setIsLoginFormActive(false)
      setIsLoggedIn(true)
      setIsWrongCredentials(false)
    } else {
      setIsWrongCredentials(true)
    }
  }

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} onLoginActivate={() => setIsLoginFormActive(true)} onLogout={() => setIsLoggedIn(false)} />
      <Routes>
        <Route path='/' element={<AssetsLister />} />
        <Route path='/trade' element={<ExchangeForm isLoggedIn={isLoggedIn} />} />
      </Routes>
      
      <Modal show={isLoginFormActive} title='Login' onModalClose={() => setIsLoginFormActive(false)}>
        <LoginForm onLoginSubmit={loginSubmitHandler} isWrongCredentials={isWrongCredentials} />
      </Modal>
    </BrowserRouter>
  )
}

export default App

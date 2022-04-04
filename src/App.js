import './App.css'
import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { Dashboard } from './components/dashboard/Dashboard'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { NotFound } from './components/NotFound'
import styled from 'styled-components/macro'
import GlobalStyles from './GlobalStyles'
import { UserContext } from './contexts/UserContext'
import { LoadingOutlined } from '@ant-design/icons'

export const App = () => {
  const { checkedToken } = useContext(UserContext)

  return (
    <Router>
      <GlobalStyles />
      {checkedToken ? (
        <>
          <Header />
          <Main>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Main>
        </>
      ) : (
        <Main className='loading'>
          <LoadingOutlined spin />
        </Main>
      )}
    </Router>
  )
}

const Main = styled.main`
  background: #f375b224;
  min-height: 100vh;
  padding-top: 42px;
  display: flex;
  &.loading {
    opacity: 0.5;
  }
`

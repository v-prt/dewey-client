import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { Register } from './components/Register'
import { NotFound } from './components/NotFound'
import styled from 'styled-components/macro'
import GlobalStyles from './GlobalStyles'

export const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Main>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Main>
    </Router>
  )
}

const Main = styled.main`
  height: 100%;
  padding: 50px 20px;
  display: grid;
  place-content: center;
`

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { NotFound } from './components/NotFound'
import GlobalStyles from './GlobalStyles'

export const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

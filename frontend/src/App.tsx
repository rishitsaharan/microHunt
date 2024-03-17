import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/signup' Component={SignUp} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

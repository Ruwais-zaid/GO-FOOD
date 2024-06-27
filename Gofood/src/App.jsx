import React from 'react'
import Home from './screen/Home.jsx'
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Login from './screen/Login.jsx'
import SignUp from './screen/SignUp.jsx'
import Cart from './screen/Cart.jsx'
import { CartProvider } from './components/ContextReducer.jsx'
import Sucess from './screen/Sucess.jsx'

const App = () => {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<SignUp/>}/>
         <Route exact path="/cart" element={<Cart/>}/>
         <Route exact path="/success" element={<Sucess/>} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  )
}

export default App

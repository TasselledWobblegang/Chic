import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes , Route, Link} from 'react-router-dom';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import AllOutfits from './components/AllOutfits.jsx';

const App = () => {
  return (
     <Router>
      <Link to='/' style= {{margin : 10}}>
        Home
      </Link>
      <Link to='/signup' style= {{margin : 10}}>
        Signup
      </Link>
      <Link to='/login' style= {{margin : 10}}>
        Login
      </Link>
      <Link to='/dashboard' style= {{margin : 10}}>
        Dashboard
      </Link>
      <Link to='/allOutfits' style= {{margin : 10}}>
        All Outfits
      </Link>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/allOutfits' element={<AllOutfits/>} />
      </Routes>
    </Router>
  )
}
export default App;
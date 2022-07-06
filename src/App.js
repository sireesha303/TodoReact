import './App.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";

import Login from './components/Login/index';
import Home from './components/Home/index';
import Signup from './components/Signup';

const App = () =>(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Signup/>}/>
    </Routes>
   
      
  </BrowserRouter>
     
)


export default App;

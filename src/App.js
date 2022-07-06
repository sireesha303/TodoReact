import './App.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";

import Login from './components/Login/index';
import Home from './components/Home/index';
import Signup from './components/Signup';
import UserContext from './context/UserContext';
import { Component } from 'react';

class App extends Component{
  state = {name:"",userId:""}

  setUserDetails = (name,userId)=>{
    this.setState({name,userId})
  }

  render(){
    const {name,userId} = this.state

    return(
      <UserContext.Provider value={{name,userId, setUserDetails: this.setUserDetails}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Signup/>}/>
        </Routes>
    </BrowserRouter>
  </UserContext.Provider> 
    )
  }
}
    



export default App;

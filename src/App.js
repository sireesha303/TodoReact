import './App.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";

import Login from './components/Login/index';
import Home from './components/Home/index';
import Signup from './components/Signup';
import UserContext from './context/UserContext';
import { Component } from 'react';
import jsCookie from 'js-cookie';
import jwt_decode from "jwt-decode";

class App extends Component{
  state = {name:"",userId:""}

  

  setUserDetails = (name,userId)=>{
    this.setState({name,userId})
  }

  componentDidMount(){
    const jwtToken = jsCookie.get('todo-access-token');
    if(jwtToken != null){
      const decodedData = jwt_decode(jwtToken);
    this.setUserDetails(decodedData.name,decodedData.user_id);
    }
    
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

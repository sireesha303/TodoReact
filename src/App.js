import './App.css';
import { BrowserRouter,Route,Routes,Navigate } from "react-router-dom";

import Login from './components/Login/index';
import Home from './components/Home/index';
import Signup from './components/Signup';
import UserContext from './context/UserContext';
import { Component } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

class App extends Component{
  state = {name:"",userId:"",isRefreshTokenExpaired:false}

  

  setUserDetails = (name,userId)=>{
    this.setState({name,userId})
  }

  logoutUser = () =>{
    console.log("logout user called")
    Cookies.remove('todo-access-token')
    Cookies.remove('todo-refresh-token')
    this.setUserDetails(null,null);
    console.log("before navigate");
    this.setState({isRefreshTokenExpaired:true})
    console.log("after naviaget")
    
  }

  updateTokens = async () =>{
    const refreshToken  = Cookies.get('todo-refresh-token');

    const url = "http://127.0.0.1:8000/token/refresh/";
    const options ={
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "refresh":`${refreshToken}`}),
    };

    const response = await fetch(url,options);
    const data = await response.json()
    // console.log(response)
    // console.log(data)
    if(response.status === 200){
      var accessToken = data.access;
      var inOneMin = new Date(new Date().getTime() + 1 * 60 * 1000)
      
      // var inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
      Cookies.set('todo-access-token',accessToken,{ expires: inOneMin });
      var decodedData = jwt_decode(accessToken);
      this.setUserDetails(decodedData.name,decodedData.user_id);
    }
    else if(response.status === 401){
      this.logoutUser()
    }
  }

  componentDidMount(){
    this.updateTokens()
  }

  render(){
    const {name,userId,isRefreshTokenExpaired} = this.state

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

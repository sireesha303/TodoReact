import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './components/Login/index';
import Home from './components/Home/index';
import Signup from './components/Signup';
import UserContext from './context/UserContext';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [contextData, setContextData] = useState({
    name: "",
    userId: ""
  });

  const [intervalId, setIntervalId] = useState()


  const setUserDetails = (name, userId) => {
    setContextData({ name, userId })
  }

  const logoutUser = () => {
    console.log("logout user called")
    Cookies.remove('todo-access-token')
    Cookies.remove('todo-refresh-token')
    setUserDetails(null, null);
    window.location.href = "/login"
    console.log("completed logging out ")

  }

  const updateTokens = async () => {
    console.log("upfate token called")
    const refreshToken = Cookies.get('todo-refresh-token');

    if (refreshToken === undefined) {
      window.location.href = "/login"
      clearInterval(intervalId)
    }

    const url = "http://127.0.0.1:8000/token/refresh/";
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "refresh": `${refreshToken}` }),
    };

    const response = await fetch(url, options);
    const data = await response.json()
    if (response.status === 200) {
      var accessToken = data.access;
      var inOneMin = new Date(new Date().getTime() + 1 * 60 * 1000)

      // var inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
      Cookies.set('todo-access-token', accessToken, { expires: inOneMin });
      var decodedData = jwt_decode(accessToken);
      setUserDetails(decodedData.name, decodedData.user_id);
    }
    else if (response.status === 401) {
      logoutUser()
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateTokens();
    }, 60000);
    setIntervalId(interval)
    return () => clearInterval(interval);

  }, [])

  return (

    <UserContext.Provider value={{ name: contextData.name, userId: contextData.userId, setUserDetails: setUserDetails }}>
      <BrowserRouter>
        <Routes>
        {/* <Route path='/' element={<ProtectedRoute/>}>
            <Route exact path='/' element={<Home/>}/>
          </Route>
          <ProtectedRoute path="/" element={<Home />} /> */}
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

  )

}




export default App;

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import {useContext} from 'react';
import UserContext from "../../context/UserContext";
import {  Outlet } from 'react-router-dom';


const ProtectedRoute = (props) => {
    const accessToken = Cookies.get("todo-access-token");
    const refreshToken = Cookies.get("todo-refresh-token");

    const value = useContext(UserContext);
    const {setUserDetails} = value

    const navigate = useNavigate();

    const logoutUser = () => {
        console.log("logout user called")
        Cookies.remove('todo-access-token')
        Cookies.remove('todo-refresh-token')
        setUserDetails(null, null);
        // navigate("/");
        window.location.href = "/login"
        console.log("completed logging out ")
    
      }

    const updateTokens = async () => {
        console.log("upfate token called")
        const refreshToken = Cookies.get('todo-refresh-token');
    
    
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

    if (accessToken === undefined) {
        if(refreshToken !== undefined){
            updateTokens();

        }else{
            logoutUser()
        }
        
    }
    return <Outlet />;
};

export default ProtectedRoute;
import {useState,useContext} from 'react'
import Cookies from 'js-cookie';
import { useNavigate,Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";


import "./index.css"
import UserContext from '../../context/UserContext';


const Login = () => {
    const value = useContext(UserContext); 
    const {setUserDetails} = value;

    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [loginError,setLoginError] = useState({showLoginError:false,loginErrorMsg:""});

    const navigate = useNavigate();

    const onLoginSuccess = (accessToken,refreshToken) =>{

        var inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
        var inOneDay = 1;
        Cookies.set('todo-access-token',accessToken,{ expires: inFiveMinutes });
        Cookies.set('todo-refresh-token',refreshToken,{ expires: inOneDay });
        var decodedData = jwt_decode(accessToken);
        setUserDetails(decodedData.name,decodedData.user_id);
        navigate("/");
    }

    const onLoginFailure = (errorMsg) =>{
        setLoginError({showLoginError:true,loginErrorMsg:errorMsg})
    }

    const onFormSubmit = async event => {
        event.preventDefault();
                
        const url = "http://127.0.0.1:8000/login/"
        const options ={
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username":`${username}`,"password":`${password}`}),
        };

        const response = await fetch(url,options)
        console.log(response)
        const data = await response.json();
        console.log(data)

        if(response.ok === true){
            onLoginSuccess(data.access,data.refresh)
        }
        else{
            onLoginFailure(data.detail)
        }
    }

    const onChangeOfUsername = event => {
        setUsername(event.target.value)
    }

    const onChangeOfPassword = event =>{
        setPassword(event.target.value)
    }

    const renderPassWord = () =>{
        return(
            <div className="input-label-container">
                <label htmlFor="pass-word" className="label">Password</label>
                <input type="password" 
                id="pass-word" 
                placeholder="enter password"
                className="login-input-el"
                onChange={onChangeOfPassword}
                />
            </div>
        )
        
    }

    const renderUserName = () =>{
        return(
            <div className="input-label-container">
                 <label htmlFor="user-name" className="label">Username</label>
                 <input type="text" 
                 id="user-name" 
                 placeholder="enter username"
                 className="login-input-el"
                 onChange={onChangeOfUsername}
                 />
            </div>
        )
    }
    
    return(
        <div className="login-bg-container">
            <div className="login-contents-container">
            <form type="submit" className="form-container" onSubmit={onFormSubmit}>
                <h1 className="login-header">Login</h1>
                <p className='signup-link'>Don't have an account?<Link to="/register">Register Now</Link></p>
                <div className="username-password-container">
                   {renderUserName()}
                   {renderPassWord()}   
                </div>
                <div className="submit-btn-container"> 
                    <button type="submit" className="submit-btn">Login</button>
                </div>
                {loginError.showLoginError && <p className='login-fail-msg'>*{loginError.loginErrorMsg}</p>}
            </form>
            <div>
                <img src="https://res.cloudinary.com/sireesha30/image/upload/v1656604518/todo_zefcgt.jpg" 
                alt="todo login"
                className="login-page-image"
                />
            </div>

            </div>
            
        </div>
        
    )
}

export default Login
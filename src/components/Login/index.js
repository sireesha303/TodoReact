import {useState,useContext} from 'react'
import {Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./index.css"
import AuthContext from '../../context/UserContext';


const Login = () => {
    // const value = useContext(UserContext); 
    // const {setUserDetails} = value;

    let {loginUser} = useContext(AuthContext)

    const [username,setUsername] = useState()
    const [password,setPassword] = useState()


    
    const onFormSubmit = async event => {
        event.preventDefault();
        // console.log(username)
        // console.log(username.length)
        // let trimmedUsername = username.trim();
        // let trimmedPassword = password.trim();
        if((username !== undefined && username.trim().length >0 )&& (password !== undefined && password.trim().length >0)){
            
            loginUser(username,password)
            
        }
        else{
            if(username === undefined || username.trim().length === 0){
                toast.warning('Username Required.', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            if(password === undefined || password.trim().length === 0){
                toast.warning('Password Required.', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            
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
            </form>
            <div>
                <img src="https://res.cloudinary.com/sireesha30/image/upload/v1656604518/todo_zefcgt.jpg" 
                alt="todo login"
                className="login-page-image"
                />
            </div>
            <ToastContainer />

            </div>
            
        </div>
        
    )
}

export default Login
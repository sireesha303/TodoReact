
import "./index.css";
import { Link} from "react-router-dom";
import { useState } from "react";

const Signup = () =>{
    let [username,setUsername] = useState("");
    let [email,setEmail] = useState();
    let [password,setPassword] = useState();
    let [rePassword,setRePassword] = useState(); 
    let [isSignupFailed,setSignupFailed] = useState(false);
    let [signupFailedReason,setSignupFailedReason] = useState();
    let [isSignupSuccess,setSignupSuccess] = useState(false)


    const onChangeOfUsername = event =>{
        setUsername(event.target.value)
    }

    const onChangeOfEmail = event =>{
        setEmail(event.target.value)
    }

    const onChangeOfPassword = event =>{
        setPassword(event.target.value)
    }

    const onChangeOfRePassword = event =>{
        setRePassword(event.target.value)
    }

    const onFormSubmit = async event =>{
        event.preventDefault();

        const url = "https://todoapp-django-backend.herokuapp.com/account/users/"
        const options ={
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username":`${username}`,
            "email":`${email}`,
            "password":`${password}`,
            "re_password":`${rePassword}`
            }),
        };

        const response = await fetch(url,options);
        const data = await response.json();
        if(response.ok){
            setSignupSuccess(true);
            setSignupFailed(false);
        }
        else{
            setSignupFailed(true);
            setSignupSuccess(false);
            setSignupFailedReason(Object.values(data)[0])
        }
    }

    return(
        <div className="signup-page-bg-container">
            <form className="signup-contents-container" onSubmit={onFormSubmit}>
                <h1 className="signup-header">Signup</h1>
                <p className="signup-support-text">Please fill in this form to create an account!</p>
                <hr/>
                <div className="signup-inputs-container">
                    <input placeholder="*Username" className="signup-input-el" onChange={onChangeOfUsername}/>
                    <input placeholder="*Email" className="signup-input-el" onChange={onChangeOfEmail}/>
                    <input type="password" placeholder="*Password" className="signup-input-el" onChange={onChangeOfPassword}/>
                    <input type="password" placeholder="*Confirm Password" className="signup-input-el" onChange={onChangeOfRePassword}/>
                </div>
                
                <button className="submit-btn" type="submit">Submit</button>
                {isSignupFailed && <p className="signup-failed-reason">*{signupFailedReason}</p>}
                {isSignupSuccess && <p className="signup-success-msg">Your account created successfully! you can login now.</p>}
            </form>
            <p className="login-link">Already have an account?<Link to="/login">Login</Link></p>
        </div>
    )
}

export default Signup
import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [accessToken, setAccessToken] = useState(()=> Cookies.get('todo-accessToken') ? (Cookies.get('todo-accessToken')) : null)
    let [user, setUser] = useState(()=> Cookies.get('todo-accessToken') ? jwt_decode(Cookies.get('todo-accessToken')) : null)
    let [loading, setLoading] = useState(true)


    const navigate = useNavigate()

    let loginUser = async (username,password,setLoginLoading)=> {

        let response = await fetch('https://todoapp-django-backend.up.railway.app/login/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept': 'application/json'
                   
            },
            body:JSON.stringify({'username':username, 'password':password})
        })
        let data = await response.json()
        setLoginLoading(false)

        console.log(response)
        if(response.status === 200){
            setAccessToken({access:data.access})
            setUser(jwt_decode(data.access))

            var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
            Cookies.set('todo-accessToken',data.access,{expires:inFifteenMinutes})
            Cookies.set('todo-refreshToken',data.refresh,{expires:2})
            navigate('/')
        }else{
            // alert('Something went wrong!.. Not able to found the user account with given Details..')
            toast.error('Error : Incorrect username or password entered.', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }


    let logoutUser = () => {
        setAccessToken(null)
        setUser(null)
        Cookies.remove('todo-accessToken')
        Cookies.remove('todo-refreshToken')
        navigate('/login')
    }


    let updateToken = async ()=> {
        const refreshToken = Cookies.get('todo-refreshToken')

        if(refreshToken !== undefined){
            let response = await fetch('https://todoapp-django-backend.up.railway.app/token/refresh/', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'refresh':refreshToken})
            })
    
            let data = await response.json()
            
            if (response.status === 200){
                setAccessToken({access:data.access})
                setUser(jwt_decode(data.access))

                var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
                Cookies.set('todo-accessToken',data.access,{expires:inFifteenMinutes})
            }else{
                logoutUser()
            }
    
            if(loading){
                setLoading(false)
            }

        }
        else{
            if(loading){
                setLoading(false)
            }
            logoutUser()
        }
    }

    let contextData = {
        user:user,
        accessToken:accessToken,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }


    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let thirteenMinutes = 1000 * 60 * 13

        let interval =  setInterval(()=> {
            if(accessToken){
                updateToken()
            }
        }, thirteenMinutes)
        return ()=> clearInterval(interval)

    }, [accessToken, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

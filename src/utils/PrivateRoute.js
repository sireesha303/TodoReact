import {Navigate,Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/UserContext'

const PrivateRoute = ({children, ...rest}) => {
    let {accessToken} = useContext(AuthContext)

    return accessToken ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
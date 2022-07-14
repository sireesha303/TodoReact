import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './components/Login/index';
import Home from './components/Home/index';
import Signup from './components/Signup';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/UserContext';
import PrivateRoute from './utils/PrivateRoute';


const App = () => {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path='/' element={<Home/>}/>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
        </Routes>
      </AuthProvider> 
    </BrowserRouter>
  )

}




export default App;

import './index.css'
import UserContext from '../../context/UserContext';
import jsCookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';


const Header = () => {
         
    const value = useContext(UserContext);
    const {name} = value

    const navigate = useNavigate();

    const onClickOfLogout = () =>{
        jsCookie.remove('todo-access-token');
        jsCookie.remove('todo-refresh-token');
        navigate("/login");
    }

    return(
        <div className="header-bg-container">
            <h1 className='app-header'>Todo's Tracker</h1>
            <ul className="nav-items-list">
                <h1 className='greet-el'>Hello <span className='user-name'>{name}</span></h1>
                    <li className='link-item'>
                         <button className="route-link" onClick={onClickOfLogout}>Logout</button>
                    </li>
            </ul>
        </div>
    )
                
     }

export default Header
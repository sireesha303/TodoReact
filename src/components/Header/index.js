import './index.css'
import { useContext } from 'react';
import AuthContext from '../../context/UserContext';

const Header = () => {

    let {user,logoutUser} = useContext(AuthContext)
         
    const userName = user.name
    const onClickOfLogout = () =>{
        logoutUser()
    }

    return(
        <div className="header-bg-container">
            <h1 className='app-header'>Todo's Tracker</h1>
            <ul className="nav-items-list">
                <h1 className='greet-el'>Hello <span className='user-name'>{userName}</span></h1>
                    <li className='link-item'>
                         <button className="route-link" onClick={onClickOfLogout}>Logout</button>
                    </li>
            </ul>
        </div>
    )
                
     }

export default Header
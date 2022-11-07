import './index.css'
import { useContext } from 'react';
import AuthContext from '../../context/UserContext';
import {MdOutlineLogout} from 'react-icons/md';

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
                        <div className='logout-btn-icon-contianer'>
                            <button className="route-link" onClick={onClickOfLogout}>Logout </button>
                            <MdOutlineLogout fill='white' className='sm-nav-icon logout-icon' onClick={onClickOfLogout} />
                        </div>
                         
                    </li>
            </ul>
        </div>
    )
                
     }

export default Header
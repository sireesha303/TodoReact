import './index.css'
import { Link } from "react-router-dom";

const Header = () => (
         <div className="header-bg-container">
            <h1 className='app-header'>Todo's Tracker</h1>
            <ul className="nav-items-list">
                <li className='link-item'>
                    <Link className="route-link" to="/">Home</Link>
                </li>
                <li className='link-item'>
                    <Link className="route-link" to="/Logout">Logout</Link>
                </li>
            </ul>
         </div>
)

export default Header
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return(
        <nav className="navbar p-2 mb-3 bg-black flex-row">
            <span className="my-span">
                <Link to="/">Jake's Games</Link>
            </span>
            
            <div className='navbar-nav flex-row align-text-top'>
                <button className='nav-link mx-2'>
                    <Link to='/Games'>Games</Link>
                </button>
                <button className='nav-link mx-2'>
                    <Link to='/New'>New</Link>
                </button>
            </div>
        </nav>
    )
}

export default Navbar;
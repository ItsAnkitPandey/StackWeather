import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <div>
            <div className={`container ${showMenu ? 'active' : ''}`}>
                <div className="logo ">
                   
                    <Link to="/"> <i className="fa-regular fa-snowflake" style={{marginRight:'6px'}}></i>Weather Stack</Link>
                </div>
                <div className={`nav ${showMenu ? 'active' : ''}`}>
                    <Link to=" ">Pricing </Link>
                    <Link to=" ">Documentation</Link>
                    <Link to=" " className="login">Login</Link>
                    <Link to=" " className="login">Sign up</Link>
                </div>
                <div className="hamburger" onClick={toggleMenu}>
                    <div className={`bar ${showMenu ? 'active' : ''}`} />
                    <div className={`bar ${showMenu ? 'active' : ''}`} />
                    <div className={`bar ${showMenu ? 'active' : ''}`} />
                </div>
            </div>
        </div>
    )
}

export default Navbar
import React from "react";
import Navigation from '../components/Navigation';
import Logo from './Logo'

const Header = () =>{
    return(
        <div className="header-container m-0 container-fluid d-flex flex-row justify-content-between align-items-center">
            < Logo />
            <Navigation />           
        </div>
    )
}
export default Header;
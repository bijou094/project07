import React from 'react';
import '../styles/Footer-Header.css';
import Logo from './Logo';

function Footer() {
    return (
        <div className="footer-container  d-flex   flex-row justify-content-between align-items-center">
            
            <div className="footer-container  d-flex   flex-row justify-content-between align-items-center">
                <span className="text-dark "> <strong>Conditons Génerales</strong></span>
                <span className="text-dark "> <strong></strong></span>
                <span className="text-dark "> <strong></strong></span>
            </div>
           < Logo />

        </div>
    )
}
export default Footer;

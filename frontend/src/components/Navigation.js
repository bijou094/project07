import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Auth from '../context/contextAuth';
import { useHistory } from 'react-router';
import '../styles/Projet.css'

const Navigation = () => { 
    const history = useHistory();
    const {isAuthenticated, setIsAuthenticated } = useContext(Auth);
    const pomptConfirmation = () => {
        if (window.confirm(
            `voulez vous  quitter votre compte
              OK  - revenir à l'acceuil 
              ANNULER - deriger vers publication `)) {                
         
            setIsAuthenticated(false);
            history.push("/");

        } else {
            history.push("/Publication");
        }
    };
    const submitConnect = ()=>{
        pomptConfirmation();
    }
    return (
        <Fragment >
            {(isAuthenticated) ?
                (
                    <ul className="nav  text-dark justify-content-center  text-left">
                        <li className="nav-item">
                            <Link className="nav-link active text-dark  font-weight-bolder  text-left" to="/Profile">Profile </Link>
                        </li>                       
                        <li className="nav-item">
                            <div  onClick={submitConnect} className="nav-link active font-weight-bolder text-dark  text-left" to="/">Déconnexion </div>
                        </li>
                    </ul>
                )
                :
                (
                    <ul className="nav  text-dark justify-content-center  text-left">
                        <li className="nav-item">
                            <Link className="nav-link text-left active text-dark font-weight-bolder" to="/signup">S'inscrire</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-left text-dark font-weight-bolder" to="/login">Connection</Link>
                        </li>
                    </ul>
                )
            }
        </Fragment >
    )
}
export default Navigation;

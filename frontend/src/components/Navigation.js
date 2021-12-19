import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Auth from '../context/contextAuth';
import { useHistory } from 'react-router';
import '../styles/Headers.css'

function Navigation() {

    
    



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

        <div >

            {(isAuthenticated) ?
                (
                    <ul className="nav  text-dark text-dark justify-content-end ">
                        <li className="nav-item">
                            <Link className="nav-link active text-dark  font-weight-bolder" to="/Profile">Profile <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" color="black" fill="currentColor" className="bi bi-person-circle ml-3" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg></Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link  onClick={submitConnect} className="nav-link active font-weight-bolder text-dark display-4" to="/">Déconnexion </Link>
                        </li>

                    </ul>
                )
                :
                (
                    <ul className="nav  text-dark justify-content-end ">

                        <li className="nav-item">
                            <Link className="nav-link active text-dark font-weight-bolder" to="/signup">Signup</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link  text-dark font-weight-bolder" to="/login">Login</Link>
                        </li>
                    </ul>
                )
            }

        </div >

    )
}

export default Navigation;
/* */
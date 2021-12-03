import React, {useContext} from "react";
import  {Link} from "react-router-dom";
import Auth from '../pages/contextAuth';



function  Navigation (props){

    

    const {isAuthenticated} = useContext(Auth);



    







    return(
        <div >
            { ( isAuthenticated) ?
                (
                <ul className="nav text-white justify-content-center">                
                    <li className="nav-item">
                        <Link className="nav-link active text-white display-7"  to="/Profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white display-7" to="/publication">publication</Link>
                    </li>           
                    <li className="nav-item">
                        <Link className="nav-link active text-white display-7" to="/">deconnecter</Link>
                    </li>
                </ul>
                )   
            :
                (
                <ul className="nav text-white justify-content-end">
                    <li className="nav-item">
                        <Link className="nav-link active text-white display-7"  to="/signup">Signup</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-link text-white display-7" to="/login">login</Link>
                    </li>                
                </ul>
                 ) 
           }

        </div>
    )
}
export default Navigation;
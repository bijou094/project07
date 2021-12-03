import React,{ useState,useEffect,useContext } from 'react';
import {Link} from "react-router-dom";
import Auth from './contextAuth';

import '../styles/Formulaire.css';
import { useHistory } from 'react-router';
import Axios from 'axios';

//import {hasAuthenticated} from '../../services/AuthApi';

const LogOut = () => {

    const [pseudo, setPseudo ] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('');

     
    const history = useHistory();

    const {isAuthenticated, setIsAuthenticated,setToken,setUserId } = useContext(Auth) 
    

    useEffect(( ) => {
       
        if (!isAuthenticated){
            history.push ("/login") 
        }
       
    }, [isAuthenticated, history])


    const submitFrom = () =>{
        Axios.post("http://localhost:6000/api/auth/login", {pseudo:pseudo,password:password,email:email} )       
        .then((res) =>{
            console.log(res);
            alert('connection réuissi'); 
            const token = res.data.token;
            const userId = res.data.userId ;
            if  (token  != null && userId != null) {                    
                setIsAuthenticated(true);
                setUserId(userId);      
                setToken(token);                    
                history.push("/publication");                          
            }
        })
    }






    return (
        <div>

        </div>
    )
}
export default  LogOut;

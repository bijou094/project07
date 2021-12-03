import React,{ useState,useEffect,useContext } from 'react';
import {Link} from "react-router-dom";
import Auth from './contextAuth';

import '../styles/Formulaire.css';
import { useHistory } from 'react-router';
import axios from 'axios';


function Login() {

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


    const submitFrom = (e) =>{
        e.preventDefault();

        axios.post('http://localhost:8000/api/auth/login', {pseudo:pseudo,password:password,email:email } )       
        .then((res) =>{
           
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
            <main className=" container-fluid block-Panier "  >
                <div className=" row  d-flex flex-column align-items-sm-center align-items-md-center align-items-lg-center ">
                    <div className="col formil  d-flex flex-column align-items-center ">
                        <h2 className="  text-center mt-3 "> Se connecter</h2>
                        <form className="from bg-light  d-flex  flex-column align-items-center mb-3 shadow p-3 mb-5 bg-body rounded mb-4">

                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="pseudo">Pseudo </label>
                                <input value={pseudo} onChange={(e) =>{setPseudo(e.target.value)}} 
                                    className="form-control border border-dark" type="text"  id="pseudo" 
                                /> 
                            </div>                    
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="email">Email </label>
                                <input value={email}  onChange={(e) =>{setEmail(e.target.value)}} 
                                    className="form-control border border-dark" type="email"  id="email" placeholder="name@example.com" 
                                />
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="password">Password</label>
                                <input value={password} onChange={(e) =>{setPassword(e.target.value)}}
                                    className="form-control border border-dark" type="password"  id="password" 
                                />
                            </div>  
                           
                            <div className=" m-3 d-flex  flex-column align-self-center">
                            <button  onClick={submitFrom}  className="btn btn-secondary border border-dark font-weight-bolder m-1">Se connecter </button>
                                 <Link to="/signup">pas de compte? inscriver vous  </Link>
                            </div>                        
                        </form>                     
                    </div>
                </div>
            </main> 
        </div>
    )
}
export default Login;
import React,{useState} from 'react'
import {Link} from "react-router-dom";
//import Footer from '../components/Footer';
//import Header from '../components/Header';
import axios  from "axios";
import '../styles/Formulaire.css';



export default function Signup() {
    
    const data={ 

        firstName:'',
        lastName:'',
        pseudo :'',
        password :'',
        email : ''
       
    }
    

    const [dataSignup, setDataSignup ] = useState(data);
    console.log(dataSignup);
    console.log(setDataSignup);
   

    const{firstName,lastName, pseudo,password, email} = dataSignup ;
    
    
    
     
   const submitFrom = (e) =>{   
        e.preventDefault();       
   
       axios.post("http://localhost:8000/api/auth/signup",{firstName:firstName,lastName:lastName, pseudo:pseudo, email:email, password:password }
       )       
       .then((res) =>{ 
           console.log(res);           
            alert('succed insert');
        })
       
   }
  /*
   const btn = firstName !== ""  || lastName !== ""  || email !== ""  || password !== "" ||  pseudo !== "" 
    ? <button  onClick={submitFrom}  className="btn btn-secondary border border-dark font-weight-bolder m-1">S'inscrire </button> : <button disabled className="btn btn-secondary font-weight-bolder m-1">S'inscrire </button>
*/



    return (
        <div>
            <main className=" container-fluid block-Panier "  >
                <div className=" row  d-flex flex-column align-items-sm-center align-items-md-center align-items-lg-center ">
                    <div className="col formil  d-flex flex-column align-items-center ">
                        <h2 className="  text-center mt-3 "> s'inscrire</h2>
                        <form className="from bg-light  d-flex  flex-column align-items-center mb-3 shadow p-3 mb-5 bg-body rounded mb-4">

                            <div className="form-groups m-3 font-weight-bolder" >    
                                <label htmlFor="firstName"  > Nom  </label>
                                <input value={firstName} 
                                    onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}}
                                    className="form-control border border-dark " type="text" id="firstName"   
                                /> 
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="lastName">Prénom </label>
                                <input value={lastName}
                                    onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}}
                                    className="form-control border border-dark" type="text" id="lastName"  
                                />
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="pseudo">Pseudo </label>
                                <input value={pseudo}
                                    onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}} 
                                    className="form-control border border-dark" type="text"  id="pseudo" 
                                /> 
                            </div>                    
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="email">Email </label>
                                <input value={email} 
                                    onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}} 
                                    className="form-control border border-dark" type="email"  id="email" placeholder="name@example.com" 
                                />
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="password">Password:</label>
                                <input value={password}
                                    onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}}
                                    className="form-control border border-dark" type="password"  id="password" 
                                />
                            </div>  
                           
                            <div className=" m-3 d-flex  flex-column align-self-center">
                                <button  onClick={submitFrom}  className="btn btn-secondary border border-dark font-weight-bolder m-1">S'inscrire </button>
                                 <Link to="/login">déja inscrit? connecter vous </Link>
                            </div>                        
                        </form>                     
                    </div>
                </div>
            </main> 
        </div>
    )
}

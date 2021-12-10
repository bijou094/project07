import React,{useState} from 'react'
import {Link} from "react-router-dom";
//import Footer from '../components/Footer';
//import Header from '../components/Header';
import axios  from "axios";
import '../styles/Formulaire.css';
import { useHistory } from 'react-router';
import Header from './Header';
import Footer from './Footer';



export default function Signup() {
    const history = useHistory();
    
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
            history.push("/login");

        })
       
   }
  /*
   const btn = firstName !== ""  || lastName !== ""  || email !== ""  || password !== "" ||  pseudo !== "" 
    ? <button  onClick={submitFrom}  className="btn btn-secondary border border-dark font-weight-bolder m-1">S'inscrire </button> : <button disabled className="btn btn-secondary font-weight-bolder m-1">S'inscrire </button>
*/



    return (
        <div>
            <Header />
            <main className=" container-fluid blockLogin "  >
                <div className=" row  d-flex flex-column align-items-center align-items-sm-center align-items-md-center align-items-lg-center ">
                    <div className="col containerLogin  d-flex flex-column align-items-center  border border-dark shadow-lg p-3 mb-5 bg-white rounded rounded mt-5 ">
                        <h2 className="  text-center mt-4  mb-4 ">  <i>s'inscrire </i></h2>
                        <form className="from bg-light  d-flex  flex-column align-items-center  mb-4">

                            <div className="form-groups m-3 font-weight-bolder" >    
                                <label htmlFor="firstName" className="d-flex justify-content-start" > Nom  </label>
                                <input value={firstName} 
                                    onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}}
                                    className="form-control border border-dark " type="text" id="firstName"   
                                /> 
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="lastName" className="d-flex justify-content-start">Prénom </label>
                                <input value={lastName}
                                    onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}}
                                    className="form-control border border-dark" type="text" id="lastName"  
                                />
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="pseudo" className="d-flex justify-content-start">Pseudo </label>
                                <input value={pseudo}
                                    onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}} 
                                    className="form-control border border-dark" type="text"  id="pseudo" 
                                /> 
                            </div>                    
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="email" className="d-flex justify-content-start">Email </label>
                                <input value={email} 
                                    onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}} 
                                    className="form-control border border-dark" type="email"  id="email" placeholder="name@example.com" 
                                />
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="password" className="d-flex justify-content-start">Password:</label>
                                <input value={password}
                                    onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}}
                                    className="form-control border border-dark" type="password"  id="password" 
                                />
                            </div>  
                           
                            <div className=" m-3 d-flex flex-column align-self-center">
                                <button  onClick={submitFrom}  className="btn btn-danger align-self-center  border rounded-pill border-dark font-weight-bolder mb-3">S'inscrire </button>
                                 <Link to="/login">déja inscrit? connecter vous </Link>
                            </div>                        
                        </form>                     
                    </div>
                </div>
            </main> 
            <Footer />
        </div>
    )
}

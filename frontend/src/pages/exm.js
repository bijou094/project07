import React, {useState} from 'react';
import {Link} from "react-router-dom";
//import Footer from '../components/Footer';
//import Header from '../components/Header';
import axios  from "axios";
import '../styles/Formulaire.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


const  = () => {

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
   

    const{firstName,lastName, pseudo,password, email} = dataSignup
    /*
    if(pseudo === null || pseudo === '' || email === null || email === '' || password === null || password === '') {
    return alert("Veuillez remplir l'ensemble des champs du formulaire");}*/
    
     
   const submitFrom = () =>{   
            
       axios.post("http://localhost:8000/api/auth/signup",{firstName:firstName,lastName:lastName, pseudo:pseudo, email:email, password:password }
       )       
       .then((res) =>{ 
           console.log(res);           
            alert('succed insert');
        })
       
   }
  

  const btn = firstName !== ""  || lastName !== ""  || email !== ""  || password !== "" ||  pseudo !== "" 
    ? <button onClick={submitFrom} className="btnInscription btn btn-primary mb-4"> Inscription </button> : <button className="btnInscription btn btn-primary mb-4" disabled >Inscription </button>


  
 
   


   
    return (
       <div>
           <Header />
        <div className=" contenair   d-flex   flex-column justify-content-center align-items-center" >
                       
            <h1 className=" row m-3">S'inscrire</h1>
            <div className="  col mb-4 containerFrom border border-dark m-3 p-4 shadow p-3 mb-5 bg-body rounded mb-4" >
                
                    <div className="row mb-4">
                        <div className="col-12 col-md-2  col-lg-2">
                            <label  htmlFor ="firstName">firstName </label>
                        </div>
                        <div className="col-10 col-md-10  ">
                            <input value={firstName} onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}} type="text" id="firstName" required  />
                        </div>
                    </div>        
                    <div className="row mb-4">
                        <div className="col-12 col-md-2 ">
                            <label htmlFor ="lastName">lastName </label>
                        </div>
                        <div className="col-10 col-md-10  ">
                            <input value={lastName} onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}} type="text" id="lastName" required  />
                        </div>
                    </div>  
                    <div className="row mb-4">
                        <div className="col-12 col-md-2 ">
                            <label htmlFor ="pseudo">Pseudo </label>
                        </div>
                        <div className="col-10 col-md-10  ">
                            <input value={pseudo} onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}} type="text" id="pseudo" required  />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-12 col-md-2 ">
                            <label htmlFor ="email">Email </label>
                        </div>  
                        <div className="col-10 col-md-10  ">    
                            <input value={email}  onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}} type="email" id="email" required  />
                        </div>
                    </div> 
                    <div className="row mb-4">
                        <div className="col-12 col-md-2 ">
                            <label htmlFor ="password">Password </label>
                        </div>
                        <div className="col-10 col-md-10  ">    
                            <input  value={password} onChange={(e) =>{setDataSignup({...dataSignup,[e.target.id] : e.target.value})}} type="password" id="password" required  />
                        </div>
                    </div>
                    <div className="row mb-4">                        
                        {btn}
                    </div>
                    <div className="row mb-4">                                          
                        <Link to="/login">déja inscrit? connecter vous </Link>
                    </div>
                    
            </div>  
            
        </div> 
             <Footer />  
        </div>            
                
            
            
        
        
    )
}

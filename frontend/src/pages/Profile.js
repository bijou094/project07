import React, { useContext,useEffect,useState} from 'react';
import Header from '../components/Header';
import Auth  from './contextAuth';
//import { useHistory } from 'react-router';
//import {Link} from 'react-router-dom';
//import icon  from '../images/icon.png'

import axios from 'axios';
import Itemsuser from  '../components/ItemsUsers'

export default function Profile() {
    
    const {token, userId} = useContext(Auth) 
    
    const [data, setData] = useState([])
    
    //const history = useHistory()
    //const {isAuthenticated, setIsAuthenticated} = useContext(Auth)

    useEffect ((e) =>{
        
        axios.get(`http://localhost:8000/api/auth/users/${userId}`, 
        {headers: {'Authorization': 'Bearer ' + token}} )        
        .then( (res) => {                
            alert('users trouver')            
            setData([res.data])
        });
    },[token, userId]);

    /*const submitFrom = (e) =>{  
    
      
        axios.get(`http://localhost:8000/api/auth/users/${userId}` ,
        {headers: {'Authorization': 'Bearer ' + token}} 
        )   
       
        .then((res) =>{
            alert('users trouver'); 
            
            setData([...res,data])  
            
            
        })
 
    }*/

/*
    const submitdelet = () =>{  
        console.log(token);
      
        Axios.get(`http://localhost:5000/api/auth/users/${userId}`,
        {headers: {'Authorization': 'Bearer ' + token}} 
        )
      
       
        .then((res) =>{
            alert('users deconnecter'); 
            setIsAuthenticated(isAuthenticated)
            history.push ("/") 
                   
            
            
        })
 
    }*/











    return (
        <main className=" container-fluid block-Panier "  >
            <Header />
            <div className=" row  d-flex flex-column align-items-sm-center align-items-md-center align-items-lg-center ">
                <div className="col formil  d-flex flex-column align-items-center p-5 ">
                
                    <form className="from bg-light  d-flex  flex-column align-items-center mb-3 shadow p-3 mb-5 bg-body rounded mb-4">
                        <div className="from bg-light  d-flex  flex-column align-items-center mb-3 shadow p-3 mb-5 bg-body rounded mb-4">
                            <h2 className="  ">afficher les users</h2>
                            <ul className="card ">
                            {                          
                                data.map((user)=>{                            
                                    return  <Itemsuser key={user.id} user={user}  />                                 
                                })
                                                   
                            } 
                            </ul>
                            

                            
                       </div> 
                           
                        
                    
                    </form>
                </div>
            </div>
       </main> 
    
    
    
    
    )


}

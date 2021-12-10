import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Auth from './contextAuth';
//import { useHistory } from 'react-router';
//import {Link} from 'react-router-dom';
//import icon  from '../images/icon.png'

import axios from 'axios';
import Itemsuser from '../components/ItemsUsers'

export default function Profile() {

    const { token, userId } = useContext(Auth)

    const [data, setData] = useState([])

    //const history = useHistory()
    //const {isAuthenticated, setIsAuthenticated} = useContext(Auth)

    useEffect((e) => {
       

        axios.get(`http://localhost:8000/api/auth/users/${userId}`,
            { headers: { 'Authorization': 'Bearer ' + token } })
            .then((res) => {
                alert('users trouver')
                setData([res.data])
            });
    }, [token, userId]);

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
        <div>
            <main className=" container-fluid   "  >
                <Header />
                <div className=" row  d-flex bg-light flex-column align-items-sm-center align-items-md-center align-items-lg-center ">

                    <form className="col  d-flex flex-column align-items-center p-5 ">



                        
                        <ul className="card  p-2 border rounded   p-2   ">
                            {
                                data.map((user) => {
                                    return <Itemsuser key={user.id} user={user} />
                                })

                            }
                        </ul>







                    </form>

                </div>
            </main>
        </div>



    )


}

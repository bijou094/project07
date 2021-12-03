import React, { useContext,useState} from 'react';

import Auth  from '../pages/contextAuth';
//import { useHistory } from 'react-router';
//import {Link} from 'react-router-dom';
//import icon  from '../images/icon.png'

import axios from 'axios';








export default function ItemsUsers(props) {
    const { token, userId } = useContext(Auth)
    const [data, setData] = useState([]);
    const [imagrUrl, setImagrUrl] = useState([]);

    const submitFrom = (e) =>{  
    
      
        axios.put(`http://localhost:8000/api/auth/users/${userId}` ,
        {headers: {'Authorization': 'Bearer ' + token}} 
        )   
       
        .then((res) =>{
            alert('users trouver'); 
            setImagrUrl(...res,imagrUrl)
            
        })
 
    }

    return (
        <div>
            <div className="commentMessage bg-light  d-flex  flex-column align-items-center mb-3 shadow p-3 mb-5 bg-body rounded mb-4">
                <div className="bg-success  d-flex  flex-column align-items-center mb-3 shadow p-3 mb-5 bg-body rounded mb-4">  
                <div className="p-3">{props.user.firstName}</div>
                <img className="p-3" src={props.user.image} alt="photos de profile" />
                <div className="p-3">{props.user.firstName}</div> 
                <div className="p-3">{props.user.lastName}</div>          
                </div>
            </div>  
            <div className=" m-3 d-flex  flex-column align-self-center">
                <button onClick={submitFrom} className="btn btn-primary mb-4" type="submit" >image</button>
                <button className="btn btn-primary mb-4" type="submit">poster</button>
            </div>
        </div>
    )
}

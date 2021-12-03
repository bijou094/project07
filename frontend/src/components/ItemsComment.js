import React from 'react';//, {useState, useContext }
import '../styles/Formulaire.css';
//import Auth  from '../pages/contextAuth';
//import  axios  from 'axios';


function ItemsComment(props) {




    return (
        <div>
            <li>
                <ul>
                    {
                        (props.message.comment_id != null ) && ( 

                                                         
                              
                              <li className="d-flex  flex-row align-items-center mb-3 shadow p-3 mb-5 bg-body rounded mb-4">

                                <div className="border rounded-circle p-3"> {props.message.user_id}</div>
                                <div className="p-3"> {props.message.commenText}</div>
                            </li>  
                       )

                    }




                </ul>



            </li>


        </div>

    )
}
export default ItemsComment;//<div className="">{props.message.comment_id}</div>   verfier le user qui a commenter 
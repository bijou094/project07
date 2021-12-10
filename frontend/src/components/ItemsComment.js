import React from 'react';//, {useState, useContext }
import '../styles/Formulaire.css';
//import Auth  from '../pages/contextAuth';
//import  axios  from 'axios';


function ItemsComment(props) {




    return (
        <div>

            {
                (props.message.id != null) && (


                    <li className="contenairMsgCmt d-flex bg-light flex-row justify-content-start align-items-center mt-1">
                        <div>                            
                            <img className="bg-light border rounded-circle " src={props.message.user_id} alt="" width="50px" height="50px" />
                        </div>                        
                        
                        <div className=" bg-light ml-3 text-justify"> {props.message.commenText}</div>
                    </li>

                )
            }

        </div>

    )
}
export default ItemsComment;
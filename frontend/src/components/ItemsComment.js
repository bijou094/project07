import React, { useState, useContext } from 'react';//, {useState, useContext }

import '../styles/Formulaire.css';
import Auth from '../context/contextAuth';

import axios from 'axios';


function ItemsComment(props) {
    
    const { token, isAdmin } = useContext(Auth);
    console.log(isAdmin);
    console.log(token);



    const submitDelt = (e) => {


        axios.delete(`http://localhost:8000/api/auth/comments/${props.comment.id}`,
            {
                headers: {

                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => {
                console.log(res);
                alert('commentaire supprimer');
                props.setRefreche(!props.refreche);


            })

    }

    const submitupd = (e) => {

    }





    return (
        <div className=''>

            {
                (props.comment.messageId != null) && (


                    <li className=" d-flex flex-row align-content-start align-items-center    mb-2">

                        <div className="align-self-start">
                            <img className="align-self-start  border rounded-circle mr-2 " src={props.comment.imageUrl} alt="" width="50px" height="50px" />
                            <div className="  text-justify"> {props.comment.pseudo} </div>

                        </div>


                        <div className="  colFont p-3 m-2     ">

                            <div className="   text-left">{props.comment.commenText} </div>


                        </div>
                        <div className="   d-flex flex-row justify-content-center align-items-center mt-3">
                            {(isAdmin === 1) && (
                                <button onClick={submitDelt} className="btn-upload border-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="red" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                </svg></button>
                            )
                                
                            }
                        </div>



                    </li>

                )
            }

        </div>

    )
}
export default ItemsComment;
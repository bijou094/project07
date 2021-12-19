import React, { useState, useContext } from 'react';//, {useState, useContext }

import '../styles/Formulaire.css';
import Auth from '../context/contextAuth';

import axios from 'axios';


function ItemsComment(props) {
    const [refreche, setRefreche] = useState(false);
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
                setRefreche(!refreche);


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
                            {(isAdmin === 1) ? (
                                <button onClick={submitDelt} className="btn-upload border-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="red" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                </svg></button>
                            )
                                : (
                                    <div className=" ml-2">
                                        <button onClick={submitupd} className="btn-upload m-1 border-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="blue" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg> </button>

                                        <button onClick={submitDelt} className="btn-upload m-1 border-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="red" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg></button>
                                    </div>

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
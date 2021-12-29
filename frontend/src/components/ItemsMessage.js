import React, { useState, useContext, useEffect, Fragment } from 'react';//, {useState, useContext,useEffect }
import '../styles/Projet.css';
import ItemsComments from './ItemsComment';
import Auth from '../context/contextAuth';
import axios from 'axios';

function ItemsMessage(props) {
    const [data, setData] = useState([]);
    const { token, userId, isAdmin } = useContext(Auth);
    const [refreche, setRefreche] = useState(false);
    const [commenText, setCommenText] = useState('');
    
    // créé un commentaire d'un message 

    const submitcomment = (e) => {
        if (commenText !== '') {

            axios.post(`http://localhost:8000/api/auth/comments/` + props.message.id, { commenText: commenText, user_id: userId },
                {
                    headers:
                        { 'Authorization': 'Bearer ' + token }
                })

                .then((res) => {                    
                    setCommenText('')
                    setData([]);
                    setRefreche(!refreche)                    
                }).catch((error) => { console.log(error); });
            } else {
                alert('Veuillez saisir un commentaire')
            }
        
    }
    // recupérér les commentaire d'un message
    useEffect((e) => {

        axios.get(`http://localhost:8000/api/auth/comments/` + props.message.id,
            {
                headers:
                    { 'Authorization': 'Bearer ' + token }
            })
            .then((res) => {
                setData([...res.data]);


            }).catch((error) => { console.log(error); });

    }, [token, userId, props.message.id, refreche]);




    const submitDelt = (e) => {
        e.preventDefault()
        if (isAdmin === 1) {
            axios.delete("http://localhost:8000/api/auth/messages/ " + props.message.id,
                {
                    headers: {

                        'Authorization': 'Bearer ' + token
                    }
                })
                .then((res) => {
                    console.log(res);
                    setData([]);
                    props.setRefreche(!props.refreche)

                }).catch((error) => {
                    console.log(error);
                });
        }

    }


    return (
        <Fragment>
            <li className=" list-group  p-1 m-0 mb-2 bg-white  liPublication " >
                <div className="d-flex flex-column    ">
                    <div className="d-flex flex-row justify-content-between align-items-center rounded-pill p-2 bg-light">
                        <div className="m-1">
                            <div className="text-left">{props.message.pseudo} <br /> <span>{new Date(props.message.createdAt).toLocaleDateString()} à {new Date(props.message.createdAt).toLocaleTimeString()} </span> </div>
                        </div>
                        <div className="mr-1 ">
                            <img className=" rounded-circle mr-1 border border-dark" src={props.message.imageUrl} alt="" width="60px" height="60px" />
                        </div>
                    </div>
                    <div className=" d-flex  flex-column   align-content-center  align-items-center mt-2 ">
                        {(props.message.content) && (
                            <div className="  text-justify m-2">{props.message.content}</div>)}

                        {(props.message.messageUrl) && (
                            <img className="mt-2  " src={props.message.messageUrl} alt="profile de la personne" width="80%" height="100%" />
                        )}
                        {(isAdmin === 1) && (
                            <button onClick={submitDelt} className=" mt-2 btn-upload bg-danger" type="submit">supprimer </button>
                        )
                        }
                    </div>
                </div>
                <div style={{ borderTop: "2px solid #000 ", marginLeft: 30, marginRight: 30, marginTop: 20 }}></div>
                <span className=' align-self-center align-items-center mt-2 mb-2 text-primary'><strong>commenter</strong>  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-text-fill" viewBox="0 0 16 16">
                    <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                </svg></span>
                <div style={{ borderTop: "2px solid #000 ", marginLeft: 30, marginRight: 30 }}></div>
                <ul className="list-unstyled mt-2  ">
                    {
                        data.map((comment) => {
                            return <ItemsComments key={comment.id} comment={comment} setRefreche={setRefreche} refreche={refreche} />
                        })
                    }
                </ul>

                <div className=" d-flex flex-row mt-1 ">
                    <label className="mr-1" htmlFor="creatComment"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle mt-1" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg></label>
                    <input value={commenText}
                        onChange={(e) => { setCommenText(e.target.value) }}
                        type="text" className=" form-control  "
                        id="creatComment" placeholder="creatComment" required />
                    <div className="">
                        <button onClick={submitcomment} className="   btnPoster " type="button" ><strong> + </strong></button>
                    </div>
                </div>
            </li>
        </Fragment>
    )
}
export default ItemsMessage;
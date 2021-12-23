import React, { useState, useContext, useEffect, Fragment } from 'react';//, {useState, useContext,useEffect }
import '../styles/Formulaire.css';
import { useHistory } from 'react-router';
import ItemsComments from './ItemsComment';
import Auth from '../context/contextAuth';
import axios from 'axios';



function ItemsMessage(props) {

    const [data, setData] = useState([]);
    const { token, userId, isAdmin } = useContext(Auth);
    const [refreche, setRefreche] = useState(false);
    const [commenText, setCommenText] = useState('');
    //const history = useHistory();

    // créé un commentaire d'un message 

    const submitcomment = (e) => {

        axios.post(`http://localhost:8000/api/auth/comments/` + props.message.id, { commenText: commenText, user_id: userId },
            {
                headers:
                    { 'Authorization': 'Bearer ' + token }
            })

            .then((res) => {
                alert('succed insert');
                setCommenText('')
                setData([]);
                setRefreche(!refreche)
                console.log(res);
            });
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


            }).catch((error)=>{console.log(error);});

    }, [token, userId, props.message.id, refreche]);




    const submitDelt = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:8000/api/auth/messages/${props.message.id}`,
            {
                headers: {

                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => {
                console.log(res);
                setData([]);
                props.setRefreche(!props.refreche)

            })

    }


   
    


    return (
        <Fragment>

            <li className=" list-group ulMessage  d-flex flex-column justify-content-center align-content-center   mb-3 bg-white  m-2 "> {/*limite de chaque publication */}

                <div className=" d-flex flex-column align-content-start align-items-center   mb-4 rounded  ">

                    <div className="  d-flex  flex-row justify-content-start align-items-center ">

                        <div className=" align-self-start ">
                            <img className=" rounded-circle mr-1" src={props.message.imageUrl} alt="" width="60px" height="60px" />
                        </div>

                        <div className="pl-2  align-self-start text-left">
                            <div className=""><strong>{props.message.pseudo}</strong>  <br />{new Date(props.message.createdAt).toLocaleDateString()} à {new Date(props.message.createdAt).toLocaleTimeString()}  </div>
                        </div>

                    </div>
                   
                    <div style={{width:"400px"}} className=" d-flex  flex-column   align-content-center  align-items-center mt-2 ">
                        {(props.message.content) &&(
                        <div className=" rounded text-justify">{props.message.content}</div>)}

                        {(props.message.messageUrl) &&(
                            <img className="mt-2 " src={props.message.messageUrl} alt="" width="300px" height="150px" />
                        )}
                    
                    </div>
                    <div className="   d-flex flex-row justify-content-center align-items-center mt-3">
                        {(isAdmin === 1) && (
                            <button onClick={submitDelt} className="btn-upload border-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="red" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg></button>
                        )
                        }
                    </div>
                </div>

                <div style={{ borderTop: "2px solid #000 ", marginLeft: 40, marginRight: 40 }}></div>
                <span className=' align-self-center align-items-center mt-2 mb-2 text-primary'><strong>Commenter</strong>  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-text-fill" viewBox="0 0 16 16">
                    <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                </svg></span>
                <div style={{ borderTop: "2px solid #000 ", marginLeft: 30, marginRight: 30 }}></div>

                <ul className="list-unstyled m-2  ">
                    {
                        data.map((comment) => {
                            return <ItemsComments key={comment.id} comment={comment} setRefreche={setRefreche} refreche={refreche} />
                        })
                    }


                    <li className="  d-flex flex-row align-content-center align-items-center border border-dark   rounded mt-3" >


                        <div className="input-group  d-flex flex-row align-content-center align-items-center ajouteComment">
                            <label className="mr-2 ml-2" htmlFor="creatComment"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle mt-1" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg></label>


                            <input value={commenText}
                                onChange={(e) => { setCommenText(e.target.value) }}
                                type="text" className=" form-control "
                                id="creatComment" placeholder="creatComment" required />

                            <div className="input-group-prepend">

                                <button onClick={submitcomment} className="   btnPoster mr-4" type="button" ><strong> + </strong></button>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </Fragment>
    )
}
export default ItemsMessage;







/*<label className="ajouteComment bg-danger mt-1 ml-3" ></label>

                        <input value={commenText}
                            onChange={(e) => { setCommenText(e.target.value) }}
                            type="text" className=" form-control ajouteComment"
                            id="creatComment" placeholder="creatComment" required />

                         */














/*


<div className="  d-flex flex-row justify-content-start  align-items-center rounded  m-1"







const [data, setData] = useState([]);
    const { token, userId } = useContext(Auth);
    const [refreche, setRefreche ] = useState(false);
    const [commenText, setCommenText] = useState('');
    const identifMessage = props.message.id;
    //const [comMsg, setComMsg] = useState([]);


    const submitcomment = (e) => {

        axios.post(`http://localhost:8000/api/auth/comments/${identifMessage}`, { commenText: commenText, user_id: userId },
            {
                headers:
                    { 'Authorization': 'Bearer ' + token }
            })

            .then((res) => {
                alert('succed insert');
                setCommenText('')
                setData([])
                setRefreche(!refreche)
                // console.log(res);
            });
    }








    useEffect((e) => {

        axios.get("http://localhost:8000/api/auth/messages/" + props.message.id, { headers: { 'Authorization': 'Bearer ' + token } })
            .then((res) => {
                //console.log(res);
                setData([...res.data]);
                //res.send(res);
            });

    }, [refreche]);

 */
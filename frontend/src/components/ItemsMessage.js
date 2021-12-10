import React, { useState, useContext, useEffect } from 'react';//, {useState, useContext,useEffect }
import '../styles/Formulaire.css';
import ItemsComments from './ItemsComment';
import Auth from '../pages/contextAuth';
import axios from 'axios';



function ItemsMessage(props) {
    const [data, setData] = useState([]);
    const { token, userId } = useContext(Auth);

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

                setData([...res, data])
                setData([]);
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

    }, [token, userId, data]);


    return (
        <div>

            <li className=" list-group-item d-flex flex-column  justify-content-center align-items-center border rounded  border-warning  m-1"> {/*limite de chaque publication */}

                <div className="d-flex flex-column justify-content-center rounded  bg-light mb-2 ">

                    <div className="contenairMsgCmt  d-flex  flex-row justify-content-start align-items-center p-2">
                        <div className=" align-self-start align-items-center">
                            <img className=" rounded-circle" src={props.message.imageUrl} alt="" width="50px" height="50px" />
                        </div>
                        <div className="pl-2  align-self-start align-items-center text-left">
                            <div className=""> {props.message.pseudo} <br />{props.message.createdAt} </div>
                        </div>
                    </div>
                    <div className="contenairMsgCmt  bg-light  d-flex flex-column justify-content-center rounded  m-1 p-2">

                        <div className=" rounded text-justify">{props.message.content}</div>

                    </div>
                </div>

                <ul className=" list-group  d-flex flex-column justify-content-center  align-items-start rounded  mb-2 p-1 ">
                    {
                        data.map((message) => {
                            return <ItemsComments key={message.id} message={message} />
                        })
                    }
                    <li className="contenairMsgCmt  bg-light d-flex flex-column justify-content-center  rounded  m-1" >
                        <div className="  d-flex flex-row justify-content-start  align-items-center rounded  m-1">

                            <label htmlFor="creatComment  " ><svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" className="bi bi-person-circle border rounded-circle  justify-self-center mr-2  " viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg></label>

                            <input value={commenText}
                                onChange={(e) => { setCommenText(e.target.value) }}
                                type="text" className="border border-dark form-control"
                                id="creatComment" placeholder="creatComment" required />

                            <button onClick={submitcomment} className="btn  btnPoster  text-center justify-self-end " type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                            </svg></button>

                        </div>

                    </li>






                </ul>


            </li>




        </div>
    )
}
export default ItemsMessage;

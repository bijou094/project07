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

        axios.post(`http://localhost:8000/api/auth/comments/${identifMessage}`, { commenText: commenText },
            {
                headers:
                    { 'Authorization': 'Bearer ' + token }
            })

            .then((res) => {
                alert('succed insert');
                console.log(res);
            });
    }








    useEffect((e) => {


        axios.get("http://localhost:8000/api/auth/messages", {headers: { 'Authorization': 'Bearer ' + token } })
            .then((res) => {
                      

                setData([...res.data]);
                //res.send(res);
            });

    }, [token, userId]);


    return (
        <div>
            <li>
                <ul className="bg-warning d-flex  flex-column align-items-center mb-3 shadow p-3 mb-5 bg-body rounded mb-4">
                    <il className="p-3 m-1 bg-primary  d-flex  flex-colomn align-items-center">
                        <li className='d-flex  flex-row align-items-center'>
                            <div className="p-3">{props.message.pseudo}</div>
                            <div className="p-3">{props.message.createdAt}</div>
                        </li>

                        <li className="d-flex  flex-column align-items-center p-3 ">
                            <div className="p-3">{props.message.title}</div>
                            <div className="p-3">{props.message.content}</div>
                        </li>
                        <li className="border rounded-circle p-3">message.id {props.message.id} message.idUser {props.message.idUser}</li>
                        


                    </il>
                    <il>
                            { 
                               
                                ( props.message.messageId === props.message.id ) &&(    
                                data.map((message) => { return <ItemsComments key={message.messageId} message={message} />})
                              )
                                
                                
                                  
                               
                              
                            }
                                
                           
                            <li className="p-3 m-1 bg-danger d-flex  flex-row align-items-center" >
                                <label htmlFor="creatComment" className="font-weight-bold border rounded-circle p-3">{userId}</label>
                                <input value={commenText} onChange={(e) => { setCommenText(e.target.value) }} type="text" className="border border-dark form-control" id="creatComment" placeholder="creatComment" required />
                                <button onClick={submitcomment} className="btn btn-primary p-3 mb-4" type="submit">poster</button>
                            </li>

                        </il>


                </ul>
            </li>



        </div>
    )
}
export default ItemsMessage;

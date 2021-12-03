import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Auth from './contextAuth';
import Header from '../components/Header';


import ItemsMessage from '../components/ItemsMessage';



function Publication(props) {
    console.log(props);

    const [title, setTitle] = useState('');
    //const [messageId, setMessageId ] = useState('');
    const [content, setContent] = useState('');
    const [data, setData] = useState([]);
    


    const { token, userId } = useContext(Auth)

    const submitFrom = (e) => {
        e.preventDefault()
        //console.log(token);

        axios.post(`http://localhost:8000/api/auth/messages`, { title: title, content: content },
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


        axios.get("http://localhost:8000/api/auth/messages", { headers: { 'Authorization': 'Bearer ' + token } })
            .then((res) => {
                //console.log(res);            
                setData([...res.data]);
                //res.send(res);
            });

    }, [token, userId]);
    
    
    



    return (
        <main className=" container-fluid  block-Panier "  >
            <Header />
            <div className=" row bg-primary d-flex flex-column align-items-sm-center align-items-md-center align-items-lg-center ">
                <div className="col  d-flex flex-column align-items-center p-5 ">

                    <form className="from bg-info   d-flex  flex-column align-items-center mb-3 shadow p-3 mb-5 bg-body rounded mb-4">
                        <div className="form-groups m-3 font-weight-bolder" >
                            <label htmlFor="title" className="font-weight-bold ">titre :</label>
                            <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" className="border border-dark form-control" id="title" placeholder="titre" required />

                        </div>
                        <div className="form-groups m-3 font-weight-bolder" >
                            <label htmlFor="content" className="font-weight-bold "> message</label>
                            <textarea value={content} onChange={(e) => { setContent(e.target.value) }} className="border border-dark form-control" type="text" id="content" name="content" rows="5" cols="33" placeholder="message"></textarea>
                        </div>
                        <div className=" m-3 d-flex  flex-column align-self-center">
                            <button className="btn btn-primary mb-4" type="submit" >image</button>
                            <button onClick={submitFrom} className="btn btn-primary mb-4" type="submit">poster</button>
                        </div>

                    </form>
                    <div className="from bg-info   d-flex  flex-column align-items-center mb-3 shadow p-3 mb-5 bg-body rounded mb-4">
                        <h2 className="  ">afficher les messages</h2>
                        <ul >
                            {
                                data.map((message) => {
                                    return <ItemsMessage key={message.id} message={message} />
                                })
                            }
                           

                        </ul>

                    </div>



                </div>

            </div>

        </main>
    )
}
export default Publication;
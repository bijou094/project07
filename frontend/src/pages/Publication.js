import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Auth from './contextAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemsMessage from '../components/ItemsMessage';



function Publication(props) {
    console.log(props);

    //const [title, setTitle] = useState('');
    //const [messageId, setMessageId ] = useState('');
    const [content, setContent] = useState('');
    const [data, setData] = useState([]);   


    const { token, userId } = useContext(Auth)

    const submitFrom = (e) => {
        e.preventDefault()
      

        axios.post(`http://localhost:8000/api/auth/messages`, {content: content },
            {
                headers:
                    { 'Authorization': 'Bearer ' + token }
            })

            .then((res) => {

                alert('succed insert');
                setData([]);
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

    }, [token, userId, data]);
    
    
    /*
    const [messageUrl, setMessageUrl] = useState('');
      
    const changeImage = (e) => {
        //e.preventDefault()
       

        axios.post(`http://localhost:8000/api/auth/messages`, { formData:messageUrl },
            {
                headers:
                    { 'Authorization': 'Bearer ' + token }
            })

            .then((res) => {

                alert('succed insert');
                setMessageUrl([]);
                console.log(res);
            });
      
      
    };*/
  
    


    return (

        <main className=" container-fluid  blockLogin "  >
            <Header />
            <div className="  row  d-flex flex-column align-items-center align-items-sm-center align-items-md-center align-items-lg-center ">
                <div className="col containerLogin  d-flex flex-column align-items-center  ">
                    
                    <form className="  d-flex  flex-column align-items-center  border border-dark  rounded m-1 ">
                        <h2 className="  text-center mt-4  mb-4"> Postez vos messages </h2>
                        {/*<div className="form-groups m-3 font-weight-bolder" >
                            <label htmlFor="title" className="d-flex justify-content-start font-weight-bolder mb-2">titre :</label>
                            <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" className="border border-dark form-control" id="title" placeholder="titre" required />

                        </div>*/}
                        <div className="form-groups m-3 font-weight-bolder" >
                            <label htmlFor="content" className="d-flex justify-content-start font-weight-bolder mb-2"> message</label>
                            <textarea value={content} onChange={(e) => { setContent(e.target.value) }} className="border border-dark form-control" type="text" id="content" name="content" rows="5" cols="33" placeholder="message"></textarea>
                        </div>
                        <div className=" m-3 d-flex  flex-column align-self-center">
                            <button onClick={submitFrom} className="btn btn-primary align-self-center  border rounded-pill border-dark font-weight-bolder mb-3" type="submit">Publier</button>
                            <button onClick={submitFrom} className="btn btn-primary align-self-center  border rounded-pill border-dark font-weight-bolder mb-3" type="submit">Publier</button>
                        </div>

                    </form>

                    <div className="d-flex  flex-column justify-content-center align-items-center  border border-dark  rounded m-1 ">
                        <h2 >Suivez les piblications </h2>

                        <ul className=" list-group  border border-danger rounded  ">
                            {
                                data.map((message) => {
                                    return <ItemsMessage key={message.id} message={message} />
                                })
                            }
                           

                        </ul>

                    </div>



                </div>

            </div>
            <Footer />                        
        </main>
    )
}
export default Publication;
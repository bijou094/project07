import React, { useState, useContext, useEffect, useRef, Fragment } from 'react';
import axios from 'axios';
import Auth from '../context/contextAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemsMessage from '../components/ItemsMessage';
import '../styles/Formulaire.css'



const Publication = (props) => {

    const [data, setData] = useState([]);
    const [content, setContent] = useState('');
    const [refreche, setRefreche] = useState(false);
    const inputImg2 = useRef(null)
    const { token, userId } = useContext(Auth)



    // requêtes avec post pour cree un message
    const submitposteMsg = (e) => {
        e.preventDefault()
        if (inputImg2.current.files[0] !== null && content !== ''
        ) {
            let formData = new FormData()
            formData.set('image', inputImg2.current.files[0])
            formData.set('content', content)
            formData.set('idUser', userId)

            axios.post(`http://localhost:8000/api/auth/messages`, formData,
                {
                    headers:
                    {
                        'Authorization': 'Bearer ' + token,
                        'content-type': 'multipart/form-data',
                    }
                })
                .then((res) => {                    
                    setRefreche(!refreche)
                    setData([]);
                    setContent('')
                    console.log(res);
                }).catch((error) => { console.log(error); });
        } else {
            alert('Veuillez saisir un message')
        }

    }


    // requêtes avec get pour recuperer tout les messages
    useEffect((e) => {

        axios.get("http://localhost:8000/api/auth/messages", { headers: { 'Authorization': 'Bearer ' + token } })
            .then((res) => {
                setData([...res.data]);

            });

    }, [token, userId, refreche]);


    return (
        <Fragment>
            <Header />
            <main className=" container">
                <section className=" row d-flex flex-column align-content-center align-items-center mt-3"  >
                    
                    <form class=" mr-4 col col-10  col-md-8 col-lg-6 bg-white" >
                        <h1 className=" text-primary  mb-3"> Postez vos messages </h1>
                        <div  >
                            <label htmlFor="content" className="d-flex justify-content-start"> message</label>
                            <textarea value={content} onChange={(e) => { setContent(e.target.value) }} className="border border-dark form-control " type="text" id="content" name="content" rows="5" cols="33" placeholder="message"></textarea>
                        </div>
                        <div className="  d-flex flex-row  justify-content-between align-items-center mt-1 ">
                            <button onClick={submitposteMsg} className="btn-upload " type="submit">Publier</button>
                            <div className=" parent-div mt-1">
                                <button className="btn-upload" type="submit">Images</button>
                                <input type="file" ref={inputImg2} className="inputFile" />
                            </div>
                        </div>
                    </form>
                    <article class="border col  col-10  col-md-8 col-lg-6  mt-3   " >
                        <h2 className="text-primary   mt-2  mb-2" ><em>Messages</em></h2>
                        <ul className="list-unstyled   p-1 ">
                                {
                                    data.map((message) => {
                                        return <ItemsMessage key={message.id} message={message} setRefreche={setRefreche} refreche={refreche} />
                                    })
                                }
                        </ul>
                    </article>
                </section>
            </main>
            <Footer />
        </Fragment>
    )
}
export default Publication;











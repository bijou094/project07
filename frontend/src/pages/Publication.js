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
    const { token, userId, isAdmin } = useContext(Auth)



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
                    alert('succed insert');
                    setRefreche(!refreche)
                    setData([]);
                    setContent('')
                    console.log(res);
                }).catch((error)=>{console.log(error);});
        } else {
            alert('Veuillez saisir un message ou choisir un message')
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
            <main className=" container"  >
                <div className=" row   d-flex flex-column align-content-center">

                    <section className="col-xs-12 col-s-8 col-md-8 col-lg-8  ">

                        <h1 className=" text-primary mt-4  mb-4"> Postez vos messages </h1>

                        <form className=" row m-1 p-1 d-flex flex-column justify-content-center align-content-center" >
                            <div className="col-xs-12 col-s-8 col-md-12 col-lg-12  font-weight-bolder " >
                                <label htmlFor="content" className="d-flex justify-content-start font-weight-bolder"> message</label>
                                <textarea value={content} onChange={(e) => { setContent(e.target.value) }} className="border border-dark form-control " type="text" id="content" name="content" rows="5" cols="33" placeholder="message"></textarea>

                            </div>
                            <div className=" col-xs-12 col-s-8 col-md-12 col-lg-12 d-flex flex-row  justify-content-between align-items-center mt-1 ">
                                <button onClick={submitposteMsg} className="btn-upload " type="submit">Publier</button>
                                <div className=" parent-div mt-1">
                                    <button className="btn-upload" type="submit">Images</button>
                                    <input type="file" ref={inputImg2} className="inputFile" />
                                </div>
                            </div>
                        </form>
                        <article className="row text-center d-flex  flex-column align-items-center  justify-content-center ">
                            <h2 className="text-primary   mt-4  mb-4" ><em>Messages</em></h2>
                            <ul className="list-unstyled  col-xs-10 col-md-12 col-lg-12  p-1 m-1 ">
                                {
                                    data.map((message) => {
                                        return <ItemsMessage key={message.id} message={message} setRefreche={setRefreche} refreche={refreche} />
                                    })
                                }
                            </ul>
                        </article>

                    </section>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}
export default Publication;










/*


 <button onClick={submitFrom} className="btn  btn1 btn-primary align-self-center  border  border-dark font-weight-bolder" type="submit"> image</button>



col-xs-6 col-s-6 col-md-8  col-lg-12




const submitFrom = (e) => {
        e.preventDefault()

        let formData = new FormData() // instantiate it// suppose you have your file ready

        formData.set('image', inputImg.current.files[0])


        axios.post(`http://localhost:8000/api/auth/messages`, formData,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + token,
                    'content-type': 'multipart/form-data',
                }
            })

            .then((res) => {

                alert('succed insert');
                setRefreche(!refreche)
                console.log(res);
            });
    }

    const submitposteMsg = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/auth/messages`, { content: content },
            {
                headers:
                    { 'Authorization': 'Bearer ' + token }
            })

            .then((res) => {

                alert('succed insert');
                setRefreche(!refreche)
                console.log(res);
            });
    }

    useEffect((e) => {
        axios.get("http://localhost:8000/api/auth/messages", { headers: { 'Authorization': 'Bearer ' + token } })
            .then((res) => {
                setData([...res.data]);
            });

    }, [refreche]);

 */
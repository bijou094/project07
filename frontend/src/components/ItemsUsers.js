import React, { useContext, useState, useRef, Fragment } from 'react';
import Auth from '../context/contextAuth';
import { useHistory } from 'react-router';
import axios from 'axios';


export default function ItemsUsers(props) {

    const { token, userId, isAdmin } = useContext(Auth)
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [show, setShow] = useState(false)


    const [error, setError] = useState(null)



    const inputImg2 = useRef(null)

    const history = useHistory();

    const { setIsAuthenticated } = useContext(Auth)

    const submitchangemodi = (e) => {
        e.preventDefault();
        setShow(!show)

    }







    /* boutton pour changer la photos de profile*/
    const submitFrom = (e) => {
        e.preventDefault();
        let formData = new FormData() // instantiate it// suppose you have your file ready        
        formData.set('image', inputImg2.current.files[0])
        axios.put(`http://localhost:8000/api/auth/users/${userId}`, formData,
            {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            }
        )
            .then((res) => {
                console.log(res);               
                props.setRefreche(!props.refreche)

            })
            .catch((error) => {
                setError(error);
            })

    }

    /* boutton pour modifier le pseudo et le adresss email de profile*/


    const submitchange = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:8000/api/auth/user/${userId}`, { pseudo: pseudo, email: email },
            {
                headers: {

                    'Authorization': 'Bearer ' + token
                }
            }
        )
            .then((res) => {
                console.log(res);
                alert('cuser modifier');
                setPseudo('')
                setEmail('')
                setShow(!show)
                props.setRefreche(!props.refreche)

            })

    }



    /* boite de dialogue */
    const pomptConfirmation = () => {
        if (window.confirm(
            `voulez vous  supprimer votre compte
              OK  - revenir à l'acceuil 
              ANNULER - deriger vers publication `)) {
            setIsAuthenticated(false);
            history.push("/");

        } else {
            history.push("/Publication");
        }
    };


    /* boutton pour suprimer le compte*/

    const submitdeleCount = (e) => {


        axios.delete(`http://localhost:8000/api/auth/users/${userId}`,
            {
                headers: {

                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => {
                pomptConfirmation();
            })
            .catch((error) => {
                setError(error);
            })


    }




    return (
        <Fragment>
            <div className="d-flex  flex-column align-items-sm-center align-items-md-center align-items-lg-center">
                <div className="m-2 ">
                    <div>
                        <div className="ml-0  m-2 font-weight-bolder">{props.user.firstName}  {props.user.lastName}</div>
                        <div style={{ borderTop: "2px solid #000 " }}></div>

                        <div className=" d-flex flex-row   justify-content-center align-items-center mt-4 ">
                            <div className=" parent-div  ">
                                <button className="btn-upload" type="submit">Choisir l'image</button>
                                <input type="file" ref={inputImg2} className="inputFile" />
                            </div>
                            <button onClick={submitFrom} className="btn-upload ml-5" type="submit">Appliquer</button>
                        </div>
                        <img className="bg-dark p-2 border rounded-circle  m-3" src={props.user.imageUrl} alt="profile portrait" width="200px" height="200px" />
                    </div>


                    <div style={{ borderTop: "2px solid #000 " }}></div>

                    <div className="mt-3">
                        <div htmlFor="pseudo" className="d-flex justify-content-start "><strong>Pseudo:</strong> {props.user.pseudo} </div>
                        <div htmlFor="email" className="d-flex justify-content-start mb-2"> <strong>Email:</strong>{props.user.email} </div>
                        <button onClick={submitchangemodi} className='btn btn-primary align-self-center  border rounded-pill border-dark font-weight-bolder mb-3 mt-2'> modifier</button>
                    </div>
                </div>


                <div className="m-2 border  d-flex flex-column ">
                    {
                        (show) ? (
                            <div className=" m-3  d-flex flex-column align-self-center ">
                                <label htmlFor="pseudo" className="d-flex justify-content-start">saisir  votre  nouveau pseudo</label>
                                <input value={pseudo} onChange={(e) => { setPseudo(e.target.value) }}
                                    className="form-control border border-dark " type="text" id="pseudo" />

                                <label htmlFor="email" className="d-flex justify-content-start">saisir  votre  nouveau email</label>
                                <input value={email} onChange={(e) => { setEmail(e.target.value) }}
                                    className="form-control border border-dark" type="email" id="email" placeholder="name@example.com" />

                                <button onClick={submitchange} className="btn btn-primary align-self-center  border rounded-pill border-dark font-weight-bolder mt-3 mb-3">valider </button>
                            </div>) : ('')
                    }
                </div>
            </div>
            <div>
                <span>Supprimer votre compte </span>
                <button onClick={submitdeleCount} className="btn-upload mt-2 ml-5 bg-danger" type="submit">Supprimer</button>
            </div>




        </Fragment>
    )
}

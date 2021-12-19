import React, { useContext, useState, useRef, Fragment } from 'react';

import Auth from '../context/contextAuth';
import { useHistory } from 'react-router';
//import {Link} from 'react-router-dom';
//import icon  from '../images/icon.png'
import axios from 'axios';








export default function ItemsUsers(props) {
    const { token, userId, isAdmin } = useContext(Auth)
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')


    const [error, setError] = useState(null)
    const [refreche, setRefreche] = useState(false);


    const inputImg2 = useRef(null)

    const history = useHistory();

    const { setIsAuthenticated } = useContext(Auth)


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
                //alert('users trouvee');
                setRefreche(!refreche)

            })
            .catch((error) => {
                setError(error);
            })

    }

    const submitchange = (e) => {
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
                setRefreche(!refreche)



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

    const submitModify = (e) => {
        e.preventDefault();
        
        return(
        <input value={pseudo} onChange={(e) => { setPseudo(e.target.value) }}
            className="form-control border border-dark visible" type="text" id="pseudo"
        />)

    }


    return (
        <Fragment>
            <div className="d-flex bg-light flex-row align-items-sm-center align-items-md-center align-items-lg-center border border-dark">
                <div className="m-2 ">
                    <h1>Photo de profile </h1>
                    <img className="bg-dark p-2 border rounded-circle  m-3" src={props.user.imageUrl} alt="" width="250px" height="250px" />
                    <div className="p-3 align-content-start width=100px height=400px">{props.user.lastName} {props.user.firstName} </div>


                    <div className=" d-flex flex-row   justify-content-center align-items-center ">
                        <button onClick={submitFrom} className="btn-upload mr-5" type="submit">Publier</button>
                        <div className=" parent-div  ">
                            <button className="btn-upload" type="submit">Images</button>
                            <input type="file" ref={inputImg2} className="inputFile" />
                        </div>
                    </div>
                </div>
                <div className="m-2 border  d-flex flex-column ">

                    <div className="form-groups m-3 font-weight-bolder" >
                        <label htmlFor="pseudo" className="d-flex justify-content-start">Pseudo: {props.user.pseudo} </label>

                        <button onClick={submitModify} className="btn-upload m-2 border-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="blue" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg> </button>
                        <input value={pseudo} onChange={(e) => { setPseudo(e.target.value) }}
                            className="form-control border border-dark invisible" type="text" id="pseudo"
                        />
                    </div>
                    <div className="form-groups m-3 font-weight-bolder" >
                        <label htmlFor="email" className="d-flex justify-content-start">Email: {props.user.email} </label>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }}
                            className="form-control border border-dark" type="email" id="email" placeholder="name@example.com"
                        />
                    </div>
                    <div className=" m-3  d-flex flex-column align-self-center ">
                        <button onClick={submitchange} className="btn btn-danger align-self-center  border rounded-pill border-dark font-weight-bolder mb-3">modifier </button>
                    </div>

                </div>

            </div>

            <div>
                {(isAdmin === 1) ? (
                    <button onClick={submitdeleCount} className="btn-upload mt-2" type="submit">Supprimer</button>
                )
                    : (
                        <div>

                            <button onClick={submitdeleCount} className="btn-upload mt-2" type="submit">Supprimer</button>
                        </div>

                    )
                }
            </div>



        </Fragment>
    )
}

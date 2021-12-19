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
                props.setRefreche(!props.refreche)

            })
            .catch((error) => {
                setError(error);
            })

    }

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

                            <input value={pseudo} onChange={(e) => { setPseudo(e.target.value) }}
                                className="form-control border border-dark " type="text" id="pseudo" />

                            
                       
                        
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

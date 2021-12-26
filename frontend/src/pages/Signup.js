import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/Formulaire.css';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Signup = () => {

    const history = useHistory();

    const data = {
        firstName: '',
        lastName: '',
        pseudo: '',
        password: '',
        email: ''
    }

    const [dataSignup, setDataSignup] = useState(data);
    const { firstName, lastName, pseudo, password, email } = dataSignup;


    const handleChange = (e) => {
        setDataSignup(e)
    }

    // regex pour valider le formulaire
    const regexEmail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,5})$/;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const regexText = /^([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){3,20}$/;


    // requêtes avec post pour s'inscrire
    const submitFrom = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/auth/signup",
            { firstName: firstName, lastName: lastName, pseudo: pseudo, email: email, password: password })
            .then((res) => {
                console.log(res);

                alert('Votre compte à bien été créé ! Connectez-vous pour accéder aux derniers publications.');
                history.push("/login");
            }).catch((error) => {
                console.log(error);
            });
    }

    const btn = (firstName !== "" && lastName !== "" && pseudo !== "" && email !== "" && password !== "")





    return (
        <Fragment>
            <Header />
            <main className=" container-fluid blockLogin "  >
                <div className=" row  d-flex flex-column align-items-center align-items-sm-center align-items-md-center align-items-lg-center ">
                    <div className="col containerLogin  d-flex flex-column align-items-center shadow-lg p-3 mb-5 bg-white rounded rounded mt-5 ">
                        <h2 className="  text-center mt-2  mb-1 ">  <i>s'inscrire </i></h2>
                        <form className="from  m-3 d-flex  flex-column align-items-center  m-4">
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="firstName" className="d-flex justify-content-start" > Nom  </label>
                                <input value={firstName}
                                    onChange={(e) => { handleChange({ ...dataSignup, [e.target.id]: e.target.value }) }}
                                    className="form-control border border-dark " type="text" id="firstName" />
                                {(regexText.test(dataSignup.firstName || dataSignup.firstName !== '')) ?
                                    ('')
                                    : (
                                        <span className="text-danger "><small>Veuillez entrer un nom valide !</small></span>
                                    )
                                }
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="lastName" className="d-flex justify-content-start">Prénom </label>
                                <input value={lastName}
                                    onChange={(e) => { handleChange({ ...dataSignup, [e.target.id]: e.target.value }) }}
                                    className="form-control border border-dark" type="text" id="lastName"
                                />
                                {(regexText.test(dataSignup.lastName || dataSignup.lastName !== '')) ?
                                    ('')
                                    : (
                                        <span className="text-danger "><small>Veuillez entrer un prenom valide !</small></span>
                                    )
                                }
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="pseudo" className="d-flex justify-content-start">Pseudo </label>
                                <input value={pseudo}
                                    onChange={(e) => { handleChange({ ...dataSignup, [e.target.id]: e.target.value }) }}
                                    className="form-control border border-dark" type="text" id="pseudo"
                                />
                                {(regexText.test(dataSignup.pseudo) || (dataSignup.pseudo === '')) ?
                                    ('')
                                    : (
                                        <span className="text-danger "><small>Veuillez entrer un email valide !</small></span>
                                    )
                                }
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="email" className="d-flex justify-content-start">Email </label>
                                <input value={email}
                                    onChange={(e) => { handleChange({ ...dataSignup, [e.target.id]: e.target.value }) }}
                                    className="form-control border border-dark" type="email" id="email" placeholder="name@example.com"
                                />
                                {(regexEmail.test(dataSignup.email) || (dataSignup.email === '')) ?
                                    ('')
                                    : (
                                        <span className="text-danger "><small>Veuillez entrer un email valide !</small></span>
                                    )
                                }
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="password" className="d-flex justify-content-start">Password:</label>
                                <input value={password}
                                    onChange={(e) => { handleChange({ ...dataSignup, [e.target.id]: e.target.value }) }}
                                    className="form-control border border-dark" type="password" id="password"
                                />
                                {(regexPassword.test(dataSignup.password) || (dataSignup.password === '')) ?
                                    ('')
                                    : (
                                        <span className="text-danger "><small>Veuillez entrer un password valide !</small></span>
                                    )
                                }
                            </div>

                            <div className=" m-3 d-flex flex-column align-self-center  ">
                                {(btn)?(
                                <button onClick={submitFrom} className="btn btn-danger align-self-center  border rounded-pill border-dark font-weight-bolder m-3 ">S'inscrire </button>
                                ):(<button onClick={submitFrom} className="btn btn-danger align-self-center  border rounded-pill border-dark font-weight-bolder m-3 disabel">S'inscrire </button>)}
                                
                                <Link className="ml-4 mr-5" to="/login">déja inscrit? connectez vous </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}
export default Signup;
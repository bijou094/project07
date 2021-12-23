import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Link } from "react-router-dom";
import Auth from '../context/contextAuth';
import { useHistory } from 'react-router';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Formulaire.css';



const Login = () => {

    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { isAuthenticated, setIsAuthenticated, setToken, setUserId, isAdmin,setIsAdmin  } = useContext(Auth)


    useEffect((e) => {
        if (!isAuthenticated) {
            history.push("/login")
        }
    }, [isAuthenticated, history])


    // requêtes avec post pour se connecter
    const submitFrom = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/auth/login',
            { pseudo: pseudo, password: password, email: email })
            .then((res) => {
               
                const token = res.data.token;
                const userId = res.data.userId;
                const isAdmin = res.data.isAdmin;
                if (token != null && userId != null && isAdmin != null) {
                    setIsAuthenticated(true);
                    setUserId(userId);
                    setToken(token);
                    setIsAdmin(isAdmin);
                    history.push("/publication");
                }
            }).catch((error)=>{
                console.log(error);
            });
    }


    return (
        <Fragment>
            <Header />
            <main className=" container-fluid blockLogin "  >
                <div className=" row  d-flex flex-column align-items-center align-items-sm-center align-items-md-center align-items-lg-center ">
                    <div className="col containerLogin  d-flex flex-column align-items-center shadow-lg p-3 mb-5 bg-white rounded rounded mt-5 ">
                        <h2 className="  text-center mt-4  mb-4"> <i>Identifiez-vous</i> </h2>
                        <form className=" from d-flex  flex-column align-items-center mb-4">

                            <div className="form-groups m-3 font-weight-bolder " >
                                <label htmlFor="pseudo" className="d-flex justify-content-start">Pseudo </label>
                                <input value={pseudo} onChange={(e) => { setPseudo(e.target.value)}}
                                className="form-control border border-dark" type="text" id="pseudo"/>
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="email" className="d-flex justify-content-start">Email </label>
                                <input value={email} onChange={(e) => { setEmail(e.target.value) }}
                                    className="form-control border border-dark" type="email" id="email" placeholder="name@example.com"/>                                
                            </div>
                            <div className="form-groups m-3 font-weight-bolder" >
                                <label htmlFor="password" className="d-flex justify-content-start">Password</label>
                                <input value={password} onChange={(e) => { setPassword(e.target.value) }}
                                    className="form-control border border-dark" type="password" id="password"/>
                            </div>

                            <div className=" m-3  d-flex flex-column align-self-center ">
                                <button onClick={submitFrom} className="btn btn-danger align-self-center  border rounded-pill border-dark font-weight-bolder mb-3">Se connecter </button>
                                <Link to="/signup"> Pas encore inscrit ? Créer un compte </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}
export default Login;
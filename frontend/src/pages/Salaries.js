import React, { useState, useContext, useEffect, Fragment } from 'react';
import "../styles/Projet.css"
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Auth from '../context/contextAuth';
import axios from 'axios';
import ItemsSalarie from '../components/ItemsSalarie';
const Salaries= (props) => {
    const [data, setData] = useState([]);
    const { token,  isAdmin } = useContext(Auth);
    const [refreche, setRefreche] = useState(false);
    useEffect((e) => {
        if(isAdmin){
        
            axios.get("http://localhost:8000/api/auth/users",
                { headers: { 'Authorization': 'Bearer ' + token } })
                .then((res) => {
                     setData([...res.data])

                    console.log(res);
                }).catch((error) => {
                    console.log(error);
                });     
        }
    }, [isAdmin,token,refreche])

    return (
        <Fragment>
            <Header />
            <main className=" container">
                <section className=" row d-flex flex-column align-content-center align-items-center mt-3"  >
                    <article class=" col border col-10  col-md-8 col-lg-6  mt-3 "   >
                        <h2 className="text-primary   mt-2  mb-4" ><em>tous les utilisateurs</em></h2>
                        <ul className="list-unstyled d-flex flex-wrap  justify-content-center ulSalarie " >
                            {      
                                data.map((user) => {
                                    return <ItemsSalarie key={user.id} user={user}  setRefreche={setRefreche} refreche={refreche}/>
                                })                               
                            }
                        </ul>
                        <div className='mt-4 mb-5'>
                                <Link className=' font-weight-bolder  mb-4' to="/Publication">retour à  la publication</Link>
                            </div>
                    </article>
                </section>
            </main>
            <Footer />
        </Fragment>
    );
}
export default Salaries;

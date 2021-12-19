import React, { Fragment, useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Auth from '../context/contextAuth';
import { Link } from "react-router-dom";

import axios from 'axios';
import Itemsuser from '../components/ItemsUsers'
import Footer from '../components/Footer';

export default function Profile() {

    const { token, userId } = useContext(Auth)

    const [data, setData] = useState([])
    const [refreche, setRefreche] = useState(false);

    //const history = useHistory()
    //const {isAuthenticated, setIsAuthenticated} = useContext(Auth)

    useEffect((e) => {
        axios.get(`http://localhost:8000/api/auth/users/${userId}`,
            { headers: { 'Authorization': 'Bearer ' + token } })
            .then((res) => {
                alert('users trouver')
                console.log(res);
                setData([res.data])


            });
    }, [token, userId, refreche]);


    return (
        <Fragment>
            <Header />
            <main className=" container  "  >
                <div className=" row   d-flex flex-column align-content-center">

                    <div className=" col-xs-12 col-s-8 col-md-8 col-lg-8  ">

                        <form className="col  d-flex flex-column align-items-center p-5 ">
                            <ul className="card  p-2 border rounded   p-2   ">
                                {
                                    data.map((user) => {
                                        return <Itemsuser key={user.id} user={user} setRefreche={setRefreche} refreche={refreche} />
                                    })
                                }
                            </ul>
                            <Link className=' font-weight-bolder text-dark display-6' to="/Publication">retour à  la publication</Link>
                        </form>

                    </div>
                </div>
            </main>
            <Footer />
        </Fragment>
    )


}

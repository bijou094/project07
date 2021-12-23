import React, { Fragment, useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Auth from '../context/contextAuth';
import { Link } from "react-router-dom";
import axios from 'axios';
import Itemsuser from '../components/ItemsUsers'
import Footer from '../components/Footer';




const Profile = (props) => {

    const { token, userId } = useContext(Auth)

    const [data, setData] = useState([])
    const [refreche, setRefreche] = useState(false);

    
    useEffect((e) => {
        axios.get(`http://localhost:8000/api/auth/users/${userId}`,
            { headers: { 'Authorization': 'Bearer ' + token } })
            .then((res) => {                
                setData([res.data])
            });
    }, [token, userId, refreche]);


    return (
        <Fragment>
            <Header />
            <main className=" container  "  >
                <div className=" row   d-flex flex-column align-content-center align-items-center ">

                    <div className=" col-xs-12 col-s-8 col-md-8 col-lg-8  ">

                        <form className="col  d-flex flex-column align-items-center  align-content-center m-5 ">
                            <ul className="card  p-2  border border-dark bg-light col-xs-12 col-s-8 col-md-12 col-lg-12">
                                {
                                    data.map((user) => {
                                        return <Itemsuser key={user.id} user={user} setRefreche={setRefreche} refreche={refreche} />
                                    })
                                }
                            </ul>
                            <Link className=' font-weight-bolder text-dark display-5 m-2' to="/Publication">retour à  la publication</Link>
                        </form>

                    </div>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}
export default  Profile;

import React, { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';


const Home = () => {
    return (
        <Fragment>
            <Header />
            <div className="homeContainer d-flex flex-column align-items-center  justify-content-center">                
                <h1 className="titre "> Bienvenue sur votre espace <i>Salarié </i></h1>
                <span className="fs-1"> échanger avec vos collégues </span>

            </div>

            <Footer />

        </Fragment>
    )
}
export default Home;
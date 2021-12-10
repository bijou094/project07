import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';
import Login from '../pages/Login'
//import Home from '../pages/Signup';

function Home() {
    return (
        <div className="homeContainer">            
            <Header />
            <div className="homeContainer  d-flex flex-column align-items-sm-center align-items-md-center align-items-lg-center">         
                 <h1 className=" text-center mt-5"> Bienvenue sur votre espace <i>Salarié </i></h1>    
                           
            </div>       
           
            <Footer /> 
        </div>
    )
}
export default Home;
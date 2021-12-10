import React, { useContext, useState } from 'react';
import Auth from '../pages/contextAuth';
import { useHistory } from 'react-router';
//import {Link} from 'react-router-dom';
//import icon  from '../images/icon.png'
import axios from 'axios';








export default function ItemsUsers(props) {
    const { token, userId } = useContext(Auth)
    //const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);



    const history = useHistory();

    const { setIsAuthenticated } = useContext(Auth)









    const submitFrom = (e) => {
        e.preventDefault();


        let formData = new FormData() // instantiate it// suppose you have your file ready
        formData.set('image', setImageUrl)

        axios({
            URL: `http://localhost:8000/api/auth/users/${userId}`,
            method: 'PUT',
            headers: {

                'Authorization': 'Bearer ' + token
            },
            data: formData

        }).then((res) => {
            console.log(res);
            alert('users trouvee');
            //setImageUrl([]);
        })

    }





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
    const submitdeleCount = (e) => {


        axios.delete(`http://localhost:8000/api/auth/users/${userId}`,
            {
                headers: {

                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => {
                console.log(res);
                pomptConfirmation();
                

            })



    }

    return (
        <div className="">
            <div className="d-flex bg-light flex-row align-items-sm-center align-items-md-center align-items-lg-center">
                <div className="ml-5 border">
                    <h1>Photo de profile </h1>
                    <img className="bg-dark p-2 border rounded-circle  m-3  " src={props.user.imageUrl} alt="" width="150px" height="150px" />
                    <div className="p-3"> {props.user.firstName} {props.user.lastName}</div>
                    <button onClick={submitFrom} className="btn btn-primary m-4" type="button"  >Modifier l'image</button>
                </div>
                <div className="ml-5 border width=250px height=400px">
                    <div className="p-3"> {props.user.email} {props.user.lastName}</div>
                    <div className="p-3  bg-warning width=100px height=400px"> {props.user.bio}</div>
                    <button onClick={submitFrom} className="btn btn-primary m-4" type="button"  >Modifier la bio</button>
                </div>

            </div>
            <div className=" border width=250px height=400px">
                <span className="p-3"> voulez vous supprimer votre compe</span>

                <button onClick={submitdeleCount} className="btn btn-primary m-4" type="button"  >supprimer </button>
            </div>






        </div>
    )
}

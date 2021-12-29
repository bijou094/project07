import React, { Fragment, useContext } from 'react';
import axios from 'axios';
import Auth from '../context/contextAuth';
const ItemsSalarie = (props) => {
    const { token, isAdmin } = useContext(Auth);
    const submitDelt = (e) => {
        e.preventDefault()
        if (isAdmin === 1) {
            axios.delete("http://localhost:8000/api/auth/users/ " + props.user.id,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then((res) => {
                    console.log(res);
                    alert("compte user supprimer")
                    props.setRefreche(!props.refreche)

                }).catch((error) => {
                    console.log(error);
                });
        }

    }
    return (
        <Fragment>           

            <li className=" m-3 liSalarie d-flex flex-row align-items-center justify-content-between ">
                
                    <div className="d-flex flex-row align-items-center align-content-center ">
                        <img className=" m-1 border rounded-circle " src={props.user.imageUrl} alt="" width="40px" height="50px" />
                        <div > {props.user.pseudo} </div>
                    </div>
                    <div>
                        <button onClick={submitDelt} className=" ml-3 mr-2 btn-upload bg-danger display-7 " type="submit"> X </button>
                    </div>                
            </li>
        </Fragment>
    );
}

export default ItemsSalarie;
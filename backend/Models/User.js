const mysql =  require('mysql');
const express =require('express');
const db = require('../baseD/db');

function User(user) {
  this.pseudo = user.pseudo;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.password = user.password;
  this.imageUrl = user.imageUrl;
  //this.bio = user.bio;
  //this.isAdmin = user.isAdmin;
}
module.exports = User;




// fonction pour créer un utilisateur
User.create = (newUser, result) =>{
  const sqlInsert = "INSERT INTO users  SET ?";
  db.query(sqlInsert,newUser,(err, res) =>{
    if (err){
      result(err, null); // si erreur non cree
      return;
    }else{
      result( null, { // si ok envoi moi le user cree avec le nouveau id_user
        id:res.id,//idUSERS,               
        //id:res.id,
        ...newUser
      })
    }
  })
};

// trouver utilisateur by email
User.findOneByEmail = (email, result) =>{
  const sqlfindEmail = "SELECT *  FROM  users  WHERE email=?";
  db.query(sqlfindEmail,email,(err, res) =>{
    if (err){
      result(err, null); // si erreur non cree
      return;
    }else{
      result(null, res[0]);
    }
  });
};

// trouver un user par son id
User.findOneById = (id, result) => {  
  const sqlById ="SELECT * FROM users WHERE id=? ";
  db.query(sqlById, id, (err, res) => {
    if(err) {
      result(err, null);
       return;
    }else{      
      result(null, res[0]);
    }       
  })
};

// trouver tout les users
User.findAll = (result) => {
  const sqlAll ="SELECT * FROM users ";
  db.query(sqlAll, (err, res) => {
    if(err) {
      result(err, null);
      return;
    }else{
      result(null, res);
    }       
  })
};

// Modifier un user

User.modifyImage = (user, result) => {
  const sqlModifyUser ="UPDATE users SET imageUrl=? WHERE id=?";
  db.query(sqlModifyUser,[user.imageUrl,user.id], (err, res) => {
    if(err) {
      result(err, null);
      return;
    } else {
      result(null, res)
    }
  })
};

User.modifyUser = (user, result) => {
  const sqlModUser ="UPDATE users SET pseudo=?,email=? WHERE id=?";
  db.query(sqlModUser,[user.pseudo,user.email,user.id], (err, res) => {
    if(err) {
      result(err, null);
      return;
    } else {
      result(null, res)
    }
  })
};

 





// supprimer le user
User.deleteUser = (id, result) => {
  const sqlDeleteUser ="DELETE FROM users  WHERE id=? ";
  db.query(sqlDeleteUser, id, (err, res) => {
    if(err) {
      result(err, null);
      return;
    } else {
      result(null, res)
    }
  })
};
















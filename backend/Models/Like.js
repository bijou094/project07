const mysql =  require('mysql');
const express =require('express');
const db = require('../baseD/db');

function Like(like) {
  
  this.idMessage_like = like.idMessage_like;
  this.idUser_like = like.idUser_like;
  
}
module.exports = Like;


Like.create = (newLike, result) =>{
  const sqlInsert = "INSERT INTO likes SET ? ";
  db.query(sqlInsert,newLike,(err, res) =>{        
    if (err){result(err, null); return;
    }else{result(null,{id:res.id, ...newLike})}
  })
};


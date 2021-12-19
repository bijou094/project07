const express =require('express');
const mysql =  require('mysql');
const db = require ('../baseD/db.js');



function Comment (comment) {
    this.user_id=comment.user_id,
    this.messageId=comment.messageId,
    this.commenText=comment.commenText,
    this.createdAt=new Date();
    this.updatedAt=new Date();
}
module.exports = Comment;


// Créer un comment


Comment.create = (newComment, result) =>{
    const sqlInsert = "INSERT INTO comments SET ? ";
    db.query(sqlInsert,newComment,(err, res) =>{        
      if (err){result(err, null); return;
      }else{result(null,{id:res.id, ...newComment })}
    })
  };



Comment.getLatest = (messageId,result) => {// Récupérer le dernier commentaire
   const sqllast = "SELECT comments.*,users.pseudo,users.imageUrl FROM comments JOIN users ON users.id = comments.user_id ORDER BY messageId DESC LIMIT 0,1"; 
    db.query ( sqllast,messageId, (err, res) => {
        if(err) {result(err, null);return
        }else{result(null, res[0])};
    })
};

Comment.findAllMessageComment = (messageId,result) => {// Récupérer les commentaires par message
    const sqllast ="SELECT comments.*,users.pseudo,users.imageUrl FROM comments left JOIN users ON users.id = comments.user_id left join messages  on messages.id = comments.messageId  WHERE messageId=? ORDER BY createdAt DESC " ;
    db.query(sqllast,[messageId], (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

Comment.updateComment = ( comment, result) => {  
    const sqlUpdateCmt = "UPDATE comments SET commenText=? WHERE id=? ";    
    db.query(sqlUpdateCmt,[comment.commenText,comment.id], (err, res) => {
      if(err){result(err, null);return;
      } else {result(null, res)}
    })
  }
  


Comment.deleteComments = (id, result) => {// Supprimer un comment
    const sqlDelete ="DELETE FROM comments  WHERE id=?";
    db.query(sqlDelete, id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};
















/*
Comment.findAllMessageComment = (id, result) => {// Récupérer les commentaires par message
    const sqllast ="SELECT comments.*,users.pseudo,users.imageUrl FROM comments JOIN users ON users.id = comments.user_id WHERE messageId=? " ;
    db.query(sqllast,id , (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

Comment.findAllMessageComment = (id, result) => {  
    const sqllast = "SELECT * From comments WHERE messageId=? ORDER BY createdAt DESC";  
    db.query(sqllast,id,  (err, res) => {
      if(err){result(err, null);return;
      }else {result(null, res)}
    })
  };
  Comment.findAllMessageComment = (result) => {// Récupérer les commentaires par message
    const sqllast ="SELECT comments.*  FROM comments WHERE messageId=? " ;
    db.query(sqllast,id , (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};
  


Comment.deleteComments = (id, result) => {// Supprimer un comment
    const sqlDelete ="DELETE FROM comments WHERE id=?";
    db.query(sqlDelete, Number(id), (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};  */


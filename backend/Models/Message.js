const express =require('express');
const mysql =  require('mysql');
const db = require ('../baseD/db.js');



function Message(message) { 
    this.idUser = message.idUser;      
    this.content=message.content;    
    this.messageUrl=message.messageUrl;
    this.createdAt=new Date();
    this.updatedAt=new Date();
}

module.exports = Message;



// creation d'un message

Message.create = (newMessage, result) =>{
  const sqlInsert = "INSERT INTO messages SET ? ";
  db.query(sqlInsert,newMessage,(err, res) =>{        
    if (err){result(err, null); return;
    }else{result(null,{id:res.id, ...newMessage })}
  })
};

// Récupérer le dernier message
/*
Message.getLatest = (id, result) => {
  const sqlSelectLast = "SELECT * FROM messages ORDER BY id DESC LIMIT 0,1";
  db.query(sqlSelectLast,(err, res) => {
      if(err) {
          result(err, null);
          return;
      } else {
          result(null, res[0])
      }
  })
};*/








Message.findAllMessage = (result) => {    
  const sqlFindAllMsg = "SELECT messages.*,users.pseudo FROM messages LEFT JOIN users ON users.id = messages.idUser ORDER BY createdAt DESC";  
  db.query(sqlFindAllMsg, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

// Trouver tous les messages avec commentaires
Message.findAllMessageWithComments = (result) => {
    db.query(`SELECT messages.*,users.pseudo,users.imageUrl,comments.user_id,comments.id AS comment_id,
    comments.messageId,   
    comments.commenText 
    FROM messages 
    LEFT JOIN users ON messages.idUser = users.id
    LEFT JOIN comments ON messages.id = comments.messageId
    LEFT JOIN users AS user_comment ON comments.user_id = user_comment.id               
    ORDER BY createdAt DESC;`, 
              (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res)
        }
    })
};













Message.findOne = (id, result) => {
  const sqlFindOneMsg = "SELECT * FROM messages LEFT JOIN comments  ON messages.id = comments.messageId WHERE messages.id=? ";    
  db.query(sqlFindOneMsg, id, (err, res) => {
    if(err){result(err, null);return;
    } else {result(null, res)}
  })
};


Message.updateMessage = ( message, result) => {  
  const sqlUpdateMsg = "UPDATE messages SET content=?, messageUrl=? WHERE id=? ";    
  db.query(sqlUpdateMsg,[message.content, message.messageUrl, message.id], (err, res) => {
    if(err){result(err, null);return;
    } else {result(null, res)}
  })
};




Message.deleteMessage = ( id, result) => {
  const sqlUpdateMsg = "DELETE FROM messages  WHERE id=?  ";    
  db.query(sqlUpdateMsg, id, (err, res) => {
    if(err){result(err, null);return;
    } else {result(null, res)}
  })
};
const Comment = require('../Models/Comment');


module.exports.createComment = (req, res, next) => {
  const comment = new Comment({
    messageId: req.params.messageId,// id de message
    user_id: req.body.user_id,// celui qui comment    
    commenText: req.body.commenText,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  console.log(comment);
  Comment.create(comment, (err, data) => {
    if (err) {
      return res.status(400).json({ message: 'Impossible de créer le message' });
    } else {res.status(200).json(data)
      console.log(comment);
     /* Comment.getLatest('', (err, result) => {
        if (err) {
          return res.status(400).json({ message: 'Message non trouvé' });
        } else {
          //res.send(data)
          res.status(200).json(result)
          console.log(result);
        }



      })*/
    }
  })
}







    exports.getAllComment = (req, res, next) => {// Récupérer tous les commentaires 

      Comment.findAllMessageComment(req.params.messageId, (err, data) => {

        if (err) {
          return res.status(400).json({ message: 'Impossible de récupérer les comments' });
        }
        res.status(200).json(data)
        //res.send(data);
      });
    };

    exports.updateOneComment = (req, res, next) => {// Supprimer un comment
      const comment = {
        'id': req.params.id,
        'user_id': req.body.user_id,
        'commenText': req.body.commenText
      }
      Comment.updateComment(comment, (err, result) => {
        if (err) {
          return res.status(400).json({ message: 'Comment  pas été modifier' });
        }
        res.status(200).json({ message: 'Le comment a été modifier !' })
      })
    };

    exports.deleteOneComment = (req, res, next) => {// Supprimer un comment
      Comment.deleteComments(req.params.id, (err, result) => {
        if (err) {
          return res.status(400).json({ message: 'Comment non supprimé' });
        }
        res.status(200).json({ message: 'Le comment a été supprimé !' })
      })
    };







/*
module.exports.createComment = (req, res, next) => {
  const newComment = new Comment ({
    user_id : req.body.user_id,// celui qui comment
    messageId:req.params.messageId,// id de message
    commenText:req.body.commenText, 
    createdAt : new Date(),
    updatedAt : new Date(),
  })  
  Comment.create(newComment, (err,data) => {     
    if(err) {
      return res.status(400).json({ message: 'Impossible de créer le comment' });
    } 
   
   Comment.latest((err, result) => {
     console.log(result);
    res.send({
        messageId: result.messageId, 
        id: result.id, 
        comment_pseudo: result.pseudo,
        comment_imageUrl :result.imageUrl,	  
        commenText_content: result.commenText
    });
    
  });  
  })  
};


exports.getAllComment = (req, res, next) => {// Récupérer tous les commentaires 

  Comment.findAllMessageComment(req.body.messageId, (err, data) => {

    if (err) {
      return res.status(400).json({ message: 'Impossible de récupérer les comments' });
    }
    // res.status(200).json(data)
    res.send(data);
  });
};*/
/*
exports.getAllMessageComment = (req, res, next) => {
  
  Comment.findAllMessageComment((err, result) => { 
    console.log(result);
        if(err) {
          return res.status(404).json({ message: 'messages non trouvés' });
        }
        //res.send(result); 
        res.status(200).json(result)
      
    
  })
};

exports.deleteOneComment = (req, res, next) => {// Supprimer un comment
  Comment.deleteComment(req.params.id, (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Comment non supprimé' });
    }
    res.status(200).json({ message: 'Le comment a été supprimé !' })
  })
};
*/

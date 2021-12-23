const Comment = require('../Models/Comment');

// créé un  commentaire
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
    } else {
      res.status(200).json(data)
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

// Récupérer tous les commentaires 
exports.getAllComment = (req, res, next) => {

  Comment.findAllMessageComment(req.params.messageId, (err, data) => {

    if (err) {
      return res.status(400).json({ message: 'Impossible de récupérer les comments' });
    }
    res.status(200).json(data)
    //res.send(data);
  });
};

// modifier un commentaires
exports.updateOneComment = (req, res, next) => {
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

// Supprimer un commentaires
exports.deleteOneComment = (req, res, next) => {
  if (req.isAdmin) {
    Comment.deleteComments(req.params.id, (err, result) => {
      if (err) {
        return res.status(400).json({ message: 'Comment non supprimé' });
      }
      res.status(200).json({ message: 'Le comment a été supprimé !' })
    })
  } else {
    res.status(401).json({ message: 'vous avez pas le droit de supprimer' });

  }
};








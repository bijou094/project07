const Message = require('../Models/Message');

// créé un message
module.exports.createMessage = (req, res, next) => { 
  const message = new Message({
    idUser: req.body.idUser,    
    content: req.body.content,
    messageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
  Message.create(message, (err, data) => {
    if (err) {
      return res.status(400).json({ message: 'Impossible de créer le message' });
    } 
    Message.getLatest('', (err, result) => {
      if (err) {
        return res.status(400).json({message: 'Message non trouvé' });
      }
      res.status(200).json(result)
    });
    
  })
}

// recupérer tous les  messages
exports.getAllMessages = (req, res, next) => {
  Message.findAllMessage((err, newMessage) => {
    if (err) {
      return res.status(400).json({ message: 'Impossible de récupérer les messages' });
    }   
    res.status(200).json(newMessage)
  })
};

// recupérer un   message
exports.getOneMessage = (req, res, next) => {

  Message.findOneMessage(req.params.id, (err, msgfound) => {

    if (err) {
      console.log(err);
      return res.status(404).json({ message: 'message non trouvé' });
    } else {
      console.log(msgfound);
      res.status(200).json(msgfound)
    }
  })
};


// modifier un  message
exports.updateOneMessage = (req, res, next) => {
  
  const message =  {
    'id': req.params.id,
    'idUser' : req.body.idUser,    
    'content': req.body.content,    
    'messageUrl': req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
  }
  Message.updateMessage(message, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: 'Modification non effectuée' });
    }
    res.status(200).json({ message: 'message Modifier' });

  })
  
};

// suprimer un  message par un  administrateur 
exports.deleteOneMessage = (req, res, next) => {
  if(req.isAdmin){
  Message.deleteMessage(req.params.id, (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Impossible de supprimer le message' });
    }
    res.status(200).json({ message: 'message supprimer' });
  })}else{
    res.status(401).json({ message: 'vous avez pas le droit de supprimer' });

  }
};











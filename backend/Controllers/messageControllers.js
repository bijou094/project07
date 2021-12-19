const Message = require('../Models/Message');
//const Comment = require('../Models/Comment');

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

exports.getAllMessages = (req, res, next) => {
  Message.findAllMessage((err, newMessage) => {
    if (err) {
      return res.status(400).json({ message: 'Impossible de récupérer les messages' });
    }   
    res.status(200).json(newMessage)
  })
};

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










/*
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
    }res.status(200).json(data)
    
  })
};





exports.getAllMessages = (req, res, next) => {
  Message.findAllMessageWithComments((err, data) => {
    if (err) {
      return res.status(400).json({ message: 'Impossible de récupérer les messages' });
    }
    let newMessage = [];
    let newId = -1;
    let i = -1;

    data.forEach(message => {
      if (newId != message.id) {
        i++;
        newId = message.id;
        newMessage[i] = { ...message };

        newMessage[i].newComments = [];
      }
      if (message.comment_id != null) {
        newMessage[i].newComments.push({
          comment_id: message.comment_id,
          user_id: message.user_id,
          imageUrl:message.imageUrl,
          messageId: message.messageId,
          commenText: message.commenText

        });
      }
    });
    res.status(200).json(newMessage)
  })
};





exports.getOneMessage = (req, res, next) => {

  Message.findOne(req.params.id, (err, msgfound) => {

    if (err) {
      console.log(err);
      return res.status(404).json({ message: 'message non trouvé' });
    } else {
      console.log(msgfound);
      res.status(200).json(msgfound)
    }
  })
};






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




exports.deleteOneMessage = (req, res, next) => {
  Message.deleteMessage(req.params.id, (err, result) => {

    if (err) {
      return res.status(400).json({ message: 'Impossible de supprimer le message' });
    }
    res.status(200).json({ message: 'message supprimer' });
  })
};

*/










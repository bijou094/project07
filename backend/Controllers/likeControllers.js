//const Message = require('../Models/Message');
const Like = require('../Models/Like');

module.exports.createLike = (req, res, next) => {
  const like = new Like({
    idMessage_like: req.params.idMessage_like,
    idUser_like: req.body.idUser_like,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
  Like.create(like, (err, data) => {
    if (err) {
      return res.status(400).json({ message: 'Impossible de créer le like' });
    }  
    res.status(200).json(data)
  

  })
}

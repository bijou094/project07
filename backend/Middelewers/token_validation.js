const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv').config();
 // Importation du package jsonwebtoken (authentification par token)


 exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];                    // Extraction du token du header authorization
    const decodedToken = jwt.verify(token, process.env.TOKEN);         // Décodage du token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({error: "User ID non valable !"})
  } else if (req.body.isAdmin && req.body.isAdmin !== isAdmin) {
      console.log(isAdmin)
      return res.status(401).json({error: "User role non valable !"})
  } else{
    //console.log(res);
    //res.status(200).json(res);
    req.userId = userId;
    next();
  }
} catch (error) {
  res.status(401).json({ error: error | 'Requête non authentifiée !' });
}
};
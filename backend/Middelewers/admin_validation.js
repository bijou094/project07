const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv').config();
 // Importation du package jsonwebtoken (authentification par token)


admin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];                    // Extraction du token du header authorization
    const decodedToken = jwt.verify(token, process.env.TOKEN);       // Décodage du token    
    const isAdmin = decodedToken.isAdmin;
    if (req.body.isAdmin && req.body.isAdmin !== isAdmin) {
      return res.status(401).json({error: "User role non valable !"})
    } 
    else{
        //console.log(res);
        //res.status(200).json(res);
    
    req.isAdmin= isAdmin;
    next();
  }
} catch (error) {
  res.status(401).json({ error: error | 'Vous avez pas le droit de faire du changement !' });
}
};
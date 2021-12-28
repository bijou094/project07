const User = require('../Models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

// fonction pour s'inscrire
module.exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)// hacher le mot de passe recupere de la requette
    .then(hash => {
      User.findOneByEmail(req.body.email, (err, user) => {
        if (err) {
          return res.status(400).json({ message: 'Impossible de créer l\'utilisateur' });
        } else {
          if (user) {
            return res.status(400).json({ message: ' l\'utilisateur exixte déja!' });
          } else {
            const user = new User({ // cree  un nouveau utilisateur  avec le mot de passe hacher           
              pseudo: req.body.pseudo,
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              password: hash,
            });
            User.create(user, (err, data) => {
              if (err) {
                return res.status(400).json({ message: 'Impossible de créer l\'utilisateur' });
              }
              res.send(data);
            })
          }
        }
      })
    }).catch(error => res.status(500).json({ error }));
  }
// function pour se connecter
module.exports.login = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;

        User.findOneByEmail(req.body.email, (err, user) => {
          if (err) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
          }
          if (user) {
            console.log(user);
            bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                if (!valid) {
                  return res.status(401).json({ message: 'Mot de passe invalide' })
                } else {
                  res.status(200).json({
                    userId: user.id,
                    isAdmin: user.isAdmin,

                    token: jwt.sign({
                      userId: user.id,
                      isAdmin: user.isAdmin,

                    },
                      process.env.TOKEN,
                      {
                        expiresIn: '24h'
                      }
                    )

                  })

                }

              }).catch(error => res.status(500).json({ error }));
          }
        })

      };
  // fonction pour chercher tout les users
  exports.getAllUsers = (req, res, next) => {
    User.findAll((err, result) => {
      if (err) {
        return res.status(404).json({ message: 'Utilisateurs non trouvés' });
      } else {
        res.status(200).json(result)
      }
    })
  };
  // fonction pour chercher un user par id
  exports.getOneUser = (req, res, next) => {
    User.findOneById(req.params.id, (err, result) => {

      if (err) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      } else {
        res.status(200).json(result)

      }
    })
  };
  // modifier l'image  user
  exports.updateOneUser = (req, res, next) => {
    const user = {
      'id': req.params.id,
      'imageUrl': req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
    }
    User.modifyImage(user, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'Modification non effectuée' });
      }
      res.status(200).json({ message: 'User Modifier' });

    })
  };
  // modifier mail et pseudo   user
  exports.updateUserText = (req, res, next) => {
    const user = {
      'id': req.params.id,
      'pseudo': req.body.pseudo,
      'email': req.body.email,
    }
    User.modifyUser(user, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'Modification non effectuée' });
      }
      res.status(200).json({ message: 'User Modifier' });

    })
  };
  // fonction supprimer le user
  exports.deleteOneUser = (req, res, next) => {
    if (req.isAdmin) {
      User.deleteUser(req.params.id, (err, result) => {

        if (err) {
          return res.status(400).json({ message: 'Impossible de supprimer l\'utilisateur' });
        }
        res.status(200).json({ message: 'User supprimer' });
      })
    } else {
      res.status(401).json({ message: 'vous avez pas le droit de supprimer ce compte' });

    }
  };
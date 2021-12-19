
const express = require('express');
const authCtrl = require('../Controllers/userControllers');
const {auth }= require('../Middelewers/token_validation');
//const {admin} = require('../Middelewers/admin_validation');
const router = express.Router();

//const verifyPassword = require('../Middlewors/verifyPassword')
const multer = require('../Middelewers/multer-config');//gestion des images



// authantification
router.post('/signup' , authCtrl.signup );
router.post('/login', authCtrl.login );

// users
router.get('/users',auth, authCtrl.getAllUsers);
router.get('/users/:id',auth,  authCtrl.getOneUser);
router.put('/users/:id',auth, multer, authCtrl.updateOneUser);
router.put('/user/:id',auth, authCtrl.updateUserText);
router.delete('/users/:id',auth,  authCtrl.deleteOneUser);

//router.delete('/users/:id',admin,  authCtrl.deleteOneUser);

module.exports = router;
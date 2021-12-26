const express = require('express');
const messageCtrl = require('../Controllers/messageControllers');
const {auth} = require('../Middelewers/token_validation');
const likeCtrl = require('../Controllers/likeControllers');
const router = express.Router();
const multer = require('../Middelewers/multer-config.js');

// message

router.post('/',auth,  multer,  messageCtrl.createMessage);
router.get('/', auth , messageCtrl.getAllMessages);//,
router.get('/:id',auth,  messageCtrl.getOneMessage);
router.put('/:id',auth, multer, messageCtrl.updateOneMessage);
router.delete('/:id',auth, messageCtrl.deleteOneMessage);

router.post('/:idMessage_like',auth, likeCtrl.createLike);


module.exports = router;
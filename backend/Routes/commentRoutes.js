const express = require('express');
const commentCtrl = require('../Controllers/commentControllers');
const {auth }= require('../Middelewers/token_validation');
const router = express.Router();





// message

router.post('/:messageId', auth, commentCtrl.createComment);
router.get('/', auth,  commentCtrl.getAllComment);
//router.get('/:id', auth, messageCtrl.getOneMessage);
router.delete('/:id',auth,  commentCtrl.deleteOneComment);

module.exports = router;
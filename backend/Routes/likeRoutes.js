const express = require('express');

const {auth} = require('../Middelewers/token_validation');
const router = express.Router();






// message

router.post('/',auth, likeCtrl.createMessage);
//router.get('/', auth , likeCtrl.getAllMessages);//,


//router.delete('/:id',admin, messageCtrl.deleteOneMessage);

module.exports = router;
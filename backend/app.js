const express = require('express')
const bodyParser = require('body-parser');
//d'extraire l'objet JSON des requêtes POST
const mysql = require('mysql')
const db = require ('./baseD/db.js');
const dotenv = require('dotenv').config();
const helmet = require ('helmet');
const morgan = require ('morgan');
const cors = require('cors');
const auth = require('./Middelewers/token_validation');




const authRoutes = require('./Routes/userRoutes');
const path = require('path');// chemain vers les fichiers
const messageRoutes = require ('./Routes/messageRoutes');
const commentRoutes = require('./Routes/commentRoutes')


const app = express();//Création d'une application express




db.connect( function(err){  
  console.log("Connected!");
});




app.use((req, res, next) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, text/html,  Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header ('Access-Control-Allow-Credentials', true);  
    res.header ('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());





























app.use(cors());
app.use(helmet());
app.use(morgan('dev'));








app.use('/api/auth', authRoutes);
app.use('/api/auth/messages', messageRoutes);

app.use('/api/auth/comments',commentRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));//gére les  ressources  statiquement(charger les fichiers qui sont dans le repertoire images)



module.exports = app;//Export de l'application express 

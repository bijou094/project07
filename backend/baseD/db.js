const mysql = require('mysql');
const dotenv = require('dotenv').config();



  
const db = mysql.createConnection({

   host: "localhost",//process.env.DB_HOST,

   user: "root",//process.env.DB_USER,

   password: "Mane08/06",// process.env.DB_PASS,

   database :"projet7",//process.env.DB_NAME,
   port: 3306,
    ssl: true

 });

module.exports =db ;


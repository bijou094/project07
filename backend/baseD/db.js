const mysql = require('mysql');
/*
const dotenv = require('dotenv').config();
const{
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
}=process.env
const DB_HOST = "localhost";
const DB_USER = "root";
const DB_PASS = "Mane08/06";
const DB_NAME = "groupomania"; 
*/


  
const db = mysql.createConnection({

   host: "localhost",//process.env.DB_HOST,

   user: "root",//process.env.DB_USER,

   password: "Mane08/06",// process.env.DB_PASS,

   database :"projet7",//process.env.DB_NAME,
   port: 3306,
    ssl: true

 });

module.exports =db ;


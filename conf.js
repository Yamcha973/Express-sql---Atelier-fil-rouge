const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'yamcha_server97', // le mot de passe
database :  'fil_rouge', // le nom de la base de données
});
module.exports = connection;
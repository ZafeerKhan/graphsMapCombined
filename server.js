const express = require('express');

const app = express();

var PORT = 8082

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
 
var cloud = true;
 
var mongodbHost = '127.0.0.1';
var mongodbPort = '27017';

//Parse user credentials from external file "userCredentials.xlsx" for security purposes 
var XLSX = require('xlsx')
var workbook = XLSX.readFile('userCredentials.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

var user = xlData[0].User;
var password = xlData[0].Password;

console.log(user);
console.log(password);
 
var authenticate ='';
//cloud
if (cloud) {

 mongodbHost = '172.25.220.81';
 mongodbPort = '27017';
 authenticate = user + ':' + password + '@'
 console.log(authenticate);
}
 
var mongodbDatabase = 'hydrodata';
 
// connect string for mongodb server running locally, connecting to a database called test
var url = 'mongodb://'+authenticate+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase;


app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


app.get('/cost', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
         db.collection('cost2018').find({}).toArray(function(err, results){
             db.close();
             console.log("Connection to database is closed.");
             res.send(results)
         });
     }) 
});

app.get('/hydro', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
         db.collection('directhydro2018').find({}).toArray(function(err, results){
             db.close();
             console.log("Connection to database is closed.");
             res.send(results)
         }); 
     }) 
	
});

app.get('/siteLocations', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
         db.collection('ranDBSites').find({}).toArray(function(err, results){
             db.close();
             console.log("Connection to database is closed.");
             res.send(results)
         }); 
     }) 
	
});


app.listen(PORT, () => console.log('server started on port: ' + PORT));
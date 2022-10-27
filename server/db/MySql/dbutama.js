var mysql = require('mysql');
var db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'ekokraf'
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Terkoneksi dengan DATABASE UTAMA');
    }
})

module.exports = db;
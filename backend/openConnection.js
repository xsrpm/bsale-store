const mysql = require('mysql')

/* This is a function that returns a connection to the database. */
function openConnection(){
  const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
  })

  con.connect(function (err) {
    if (err) {
      console.log("[mysql error]",err);
      return
    }
    console.log('connected as id ' + con.threadId);
  })
  
  con.on('error', function(err) {
    console.log("[mysql error]",err);
  });

  return con
}

module.exports = openConnection

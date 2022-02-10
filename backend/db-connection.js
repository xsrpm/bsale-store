const mysql = require('mysql')

/* This creates a connection to the database. */
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  multipleStatements: true
})

/* This is a callback function that is called when the connection is made. */
con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

module.exports = con

const express = require('express')
const app = express()
const port = 8000

var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'react_bbs',
  password : '1234',
  database: 'react_bbs'
});

db.connect();

app.get('/', (req, res) => {

  const sql = "INSERT INTO requested (rowno) VALUES (1)";
  
db.query(sql, function(err, rows, fields) {
  if (err) throw err;
  res.send('성공')
  console.log('데이터 추가 성공');
});

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




//db.end();
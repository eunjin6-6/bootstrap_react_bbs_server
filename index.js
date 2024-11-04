const cors = require('cors');
const express = require('express');
const app = express();
const port = 8000;

var corsOptions = {
  //origin: 'http://localhost:3000',
  origin: '*' //모든 출처 허용
  //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));


const mysql = require('mysql');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'react_bbs',
  password : '1234',
  database: 'react_bbs'
});

db.connect();

/*
app.get('/', (req, res) => {

  const sql = "INSERT INTO requested (rowno) VALUES (1)";
  
  db.query(sql, function(err, rows, fields) {
    if (err) throw err;
    res.send('성공')
    console.log('데이터 추가 성공');
  });

})
*/

app.get('/list', (req, res) => {
  const sql = "SELECT BOARD_ID, BOARD_TITLE, BOARD_CONTENT, REGISTER_ID, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE FROM board";
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




//db.end();
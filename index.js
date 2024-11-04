const cors = require('cors');
const express = require('express');
const app = express();
const port = 8000;

//본문을 통해서 넘어온 요청 파싱(=변환)하기 위해 설치한 미들웨어 (body-parser)를 이용
app.use(express.json()); //jason 형식으로 변환 //{"name":"Alice", "age":"25"}
app.use(express.urlencoded()); //json -> object로 변환 {name:"Alice", age: '29'}

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


app.post('/insert', (req, res) => {
  //console.log(req.body.title); //post 방식이라 body 안에 숨어서옴
  let title = req.body.title;
  let content = req.body.content;

  const sql = "INSERT INTO board (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?, ?, 'admin')"; //보안상 아래 작성
  db.query(sql, [title, content], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




//db.end();
const express = require("express")
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5001;
const cors = require('cors')
const mysql = require('mysql');
const fs = require('fs');


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())


const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

app.get('/', (req, res) => {
    res.send("gg")
})


app.get('/database', (req, res) => {
    try {
        connection.query('SELECT * FROM duo97', function (err, rows, fields) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(rows)
        })
    } catch (error) {
        console.log(error)
    }
   
})
app.put('/database:data', (req,res)=>{
    let sql = 'UPDATE duo97 SET count=count+1 WHERE name=?';
    let name = req.params.data
    connection.query(sql,name, (err,rows,fields)=>{
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rows)
    })
})


app.listen(port, (req, res) => {
    console.log("서버 작동")
})

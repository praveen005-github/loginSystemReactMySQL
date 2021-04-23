const express = require('express')
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const mysql = require('mysql')

const db = mysql.createConnection({
    user : 'root',
    host : 'localhost',
    password : 'password',
    database : 'my_db'
})

app.post('/login',(req,res) =>{

    const username = req.body.username;
    const password = req.body.password;


    db.query("SELECT * FROM users WHERE username = ? AND password = ?",[username,password],
    (err,result) => {
        if(err){
            res.send({err : err});
        }
        if(result.length > 0){
            res.send(result);
        }else{
            res.send({msg:"Wrong username and password"});
        }
    });
});

app.post('/register',(req,res) =>{

    const username = req.body.username;
    const password = req.body.password;


    db.query("INSERT INTO users (username,password) VALUES (?,?)",[username,password],
    (err,result) => {
        if(err){
        console.log(err);
        }else{
            res.send({msg:"registration successful!!"})
        }
    });
});

app.listen(8080, ()=> {
    console.log("server running") 
});

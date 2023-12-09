const express = require('express')
const app = express()
const cors = require('cors')
const server = require('http').Server(app)

const mongoose = require('mongoose');
const mongoString = "mongodb+srv://alanrs:mongoDb%402022@cluster0.mwfhaia.mongodb.net/"

mongoose.connect(mongoString);
const database = mongoose.connection;
let loggedUser = "No user!";
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
app.use(cors())
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get("/isLoggedIn",(req,res)=>{
  if(loggedUser != "No user!" || loggedUser != "Invalid email or password!"){
    res.send(loggedUser)
  }else{
    res.send("Not logged in");
  }
})
app.get("/users",async (req,res)=>{
    let data = await database.collection("users").find().toArray();
    res.send(data)
})
app.post("/new",async (req,res)=>{
    let data = req.body;
    let result = await database.collection("users").insertOne(data);
    res.send(result).status(204);

});
app.post("/login",async (req,res)=>{

  (await database.collection("users").find().toArray()).forEach(data=>{
    if(data.username == req.body.username){
      if(data.password == req.body.password){
        loggedUser = data;
      }else{
        loggedUser = "Invalid email or password!"
      }
    }else{
      loggedUser = "Invalid email or password!"
    }
  })

  res.send(loggedUser);
})

server.listen(3000,'localhost',() =>{
  console.log("Server is Running");
})
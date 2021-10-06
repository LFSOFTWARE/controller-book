const express = require("express");
const app = express();
const routes = require("./routes/routes.js");
const connection = require("./database/database.js")


connection.authenticate().then(()=>{
    console.log("Db is Up!")
}).catch((err)=>{
    console.log("Db is down"+err);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/",routes);

port = 8081;

app.listen(port, ()=>{
    console.log("Server is Up!");
})
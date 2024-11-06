const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config()

const PORT = process.env.DB_PORT;

app.use(express.json());

app.get("/api", (req,res)=> {
    res.send("Hello world")
})



app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
})
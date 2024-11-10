const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config()

const prokerRouter = require("./routes/prokerRoute");

app.use('/proker',prokerRouter);

app.get('/', (req, res) => {
    res.render('login');
  });

const PORT = process.env.DB_PORT;

app.use(express.json());

app.get("/api", (req,res)=> {
    res.json("Hello world")
})



app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
})

module.exports = app;

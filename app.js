const express = require("express");
const dotenv = require("dotenv");
const app = express();


dotenv.config()

const prokerRouter = require("./routes/prokerRoute");
const absensiRouter = require("./routes/absensiRoute");
const profileRouter = require("./routes/profileRoute")
const { otomatisUpdate } = require("./controllers/absensiControllers");

app.use(express.json());
app.use('/proker',prokerRouter);
app.use('/absensi',absensiRouter)
app.use('/profil',profileRouter)

app.get('/', (req, res) => {
    res.render('login');
  });

const PORT = process.env.DB_PORT;

app.use(express.json());
app.use(otomatisUpdate)
app.get("/api", (req,res)=> {
    res.json("Hello world")
})
app.get("/test",otomatisUpdate)



app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
})

module.exports = app;

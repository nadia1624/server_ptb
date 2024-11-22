const express = require("express");
const dotenv = require("dotenv");
const app = express();


dotenv.config()

const authRoutes = require('./routes/authRoute');
const prokerRouter = require("./routes/prokerRoute");
const absensiRouter = require("./routes/absensiRoute");
const profileRouter = require("./routes/profileRoute")
const { otomatisUpdate } = require("./controllers/absensiControllers");

const { authenticateToken } = require('./middleware/authToken');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/proker',prokerRouter);
app.use('/absensi',absensiRouter)
app.use('/profil',profileRouter)

app.get('/', (req, res) => {
    res.render('login');
  });

const PORT = process.env.DB_PORT;

app.use(express.json());
otomatisUpdate()
app.get("/api", (req,res)=> {
    res.json("Hello world")
})




app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
})

module.exports = app;

const express = require("express");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
const admin = require("firebase-admin");

dotenv.config();

const authRoutes = require("./routes/authRoute");
const prokerRouter = require("./routes/prokerRoute");
const absensiRouter = require("./routes/absensiRoute");
const profileRouter = require("./routes/profileRoute");
const kegiatanRoutes = require("./routes/kegiatanRoute");
const { otomatisUpdate } = require("./controllers/absensiControllers");

const { authenticateToken } = require("./middleware/authToken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inisialisasi Firebase Admin SDK dengan kredensial
const serviceAccount = require("./config/proksi-f12e5-firebase-adminsdk-ap37g-de7fb7c6ca.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use("/auth", authRoutes);
app.use("/proker", authenticateToken, prokerRouter);
app.use("/absensi", authenticateToken, absensiRouter);
app.use("/profil", authenticateToken, profileRouter);
app.use("/api", authenticateToken, kegiatanRoutes);

app.get("/", (req, res) => {
  res.render("login");
});

const PORT = process.env.DB_PORT;

app.use(express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

otomatisUpdate();
app.get("/api", (req, res) => {
  res.json("Hello world");
});
app.get("/test", otomatisUpdate);

// Tempat untuk menyimpan token (simulasi database)
// Simpan tokens dalam array
let userTokens = [];

// Endpoint untuk register token
app.post("/register-token", (req, res) => {
  const { token } = req.body;
  console.log("Received token:", token);

  if (token) {
    // Cek apakah token sudah ada untuk menghindari duplikasi
    if (!userTokens.includes(token)) {
      userTokens.push(token);
      console.log("Current tokens:", userTokens);
    }
    return res.status(200).send({ message: "Token berhasil disimpan" });
  } else {
    return res.status(400).send({ message: "Token tidak valid" });
  }
});

// Endpoint untuk mengirim notifikasi
app.post("/send-notification", async (req, res) => {
  const { title, body } = req.body;
  console.log("Sending notification:", { title, body });
  console.log("Available tokens:", userTokens);

  if (!title || !body) {
    return res.status(400).send({ message: "Judul dan Body harus disediakan" });
  }

  if (userTokens.length === 0) {
    return res.status(400).send({ message: "Tidak ada token yang terdaftar" });
  }

  try {
    const message = {
      notification: {
        title,
        body,
      },
      data: {
        title,
        body,
      },
    };

    // Kirim ke setiap token satu per satu
    const sendPromises = userTokens.map((token) =>
      admin.messaging().send({
        ...message,
        token: token, // Send to single token
      })
    );

    const results = await Promise.all(sendPromises);
    console.log("Notification sent successfully:", results);

    return res.status(200).send({
      message: "Notifikasi berhasil dikirim",
      results,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).send({
      message: "Gagal mengirim notifikasi",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});

module.exports = app;

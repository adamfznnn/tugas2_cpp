// Import Package dan File
const express = require("express");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");

// Inisialisasi Express dan Cors
const app = express();
const cors = require("cors");

// Izinkan origin frontend lokal dan IP Publik VM untuk Bonus Deployment
app.use(cors({
  origin: ['http://localhost', 'http://127.0.0.1:5500', 'http://localhost:5173'], // Sesuaikan dengan Live Server kamu
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware untuk parsing JSON
app.use(express.json());

// Route dasar untuk testing
app.get("/", (req, res) => {
  res.send("Backend Aplikasi Notes Jalan!");
});

// Setting Routes
// 2. Load Model agar Tabel 'notes' dibuat otomatis oleh Sequelize
require("./models/noteModels");

// 3. Gunakan Routes Note
// Saya sarankan pakai prefix /api/v1/notes agar rapi
app.use("/api/v1", noteRoutes);

// Sync Database dan Jalankan Server
const port = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log("Database & Tabel Notes Berhasil Disinkronisasi");

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });

}).catch((err) => {
  console.error("Gagal sinkronisasi database:", err.message);
});
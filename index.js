const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

// 1. Middleware CORS (PENTING: Agar Frontend bisa akses port 3000)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 2. Middleware JSON
app.use(express.json());

// 3. Load Model (Agar tabel otomatis terbuat di Cloud SQL)
require("./models/noteModels");

// 4. Routes (Gunakan prefix /api/v1 sesuai URL di frontend kamu)
app.use("/api/v1", noteRoutes);

const port = 3000;

// 5. Sync Database & Jalankan Server
sequelize.sync({ force: false }).then(() => {
  console.log("Database & Tabel Notes Berhasil Disinkronisasi");

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server Backend running on port ${port}`);
  });
}).catch((err) => {
  console.error("Gagal sinkronisasi database:", err.message);
});
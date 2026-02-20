# Dokumentasi
File ini dibuat untuk membantu memahami konsep database dan ORM di Node.js menggunakan Sequelize.

## Prerequisite
1. Nodejs
2. MySQL pake XAMPP

## Instalasi
1. Setup projek node.js `npm init -y`
2. install packagenya `npm install express mysql2 dotenv sequelize --save`
3. install nodemon `npm i --save-dev nodemon`

## Langkah Yang dilakukan
1. Buat struktur foldernya dulu
```
config/ --> untuk  naruh config
controllers/ --> untuk logika API nya
models/ --> untuk query nya
routes/ --> untuk route atau endopintnya
schema/ --> untuk buat tabel database
server.js --> untuk menjalankan server bisa juga index.js
```
2. Buat file `.env` isikan config mysqlnya
3. Buat file config/database.js untuk konekin sequalizenya
4. Buat file schema/User.js untuk membuat tabel nya
5. Buat file models/userModels.js untuk querynya
6. Buat file controllers/userController.js untuk logika API nya
7. Buat file routes/userRoutes.js untuk route API nya
8. Buat file index.js untuk menjalankan server
9. Test API pake api.rest pake extenstion REST.API
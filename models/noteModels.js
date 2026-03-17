const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Note = db.define('notes', {
    judul: { type: DataTypes.STRING },
    isi: { type: DataTypes.TEXT },
    tanggal_dibuat: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false // Karena kita pakai manual tanggal_dibuat
});

module.exports = Note;
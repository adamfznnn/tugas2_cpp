const noteModel = require("../models/noteModels");

// 1. Lihat Daftar Catatan (Get All)
const getAllNotes = async (req, res) => {
  try {
    const allNotes = await noteModel.findAll({
      order: [['tanggal_dibuat', 'DESC']] // Urutkan dari yang terbaru
    });
    res.status(200).json({
      message: "Notes retrieved successfully",
      data: allNotes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving notes",
      error: error.message,
    });
  }
};

// 2. Tambah Catatan (Create)
const createNote = async (req, res) => {
  const { judul, isi } = req.body;

  try {
    const newNote = await noteModel.create({ judul, isi });
    res.status(201).json({
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation error",
      error: error.message,
    });
  }
};

// 3. Lihat Catatan Berdasarkan ID (Get by ID)
const getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await noteModel.findByPk(id); // Sequelize menggunakan findByPk untuk ID

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving note",
      error: error.message,
    });
  }
};

// 4. Edit Catatan (Update)
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { judul, isi } = req.body;

  try {
    const note = await noteModel.findByPk(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // Update data
    await note.update({ judul, isi });

    res.status(200).json({
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
};

// 5. Hapus Catatan (Delete)
const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await noteModel.findByPk(id);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await note.destroy();
    res.status(200).json({
      message: "Note deleted successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting note",
      error: error.message,
    });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};
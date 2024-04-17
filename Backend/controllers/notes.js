const Notes = require("../models/notes");

exports.createNotes = async (req, res) => {
  if (!req.body.note || !req.body.description || !req.body.todo) {
    return res.status(422).json({
      status: 422,
      notes: {
        note: "note is required",
        description: "description is required",
        todo: "todo is required",
      },
    });
  }
  const notes = new Notes(req.body);
  try {
    await notes.save();
    res.status(201).json({
      status: 201,
      message: "Create successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).send({
        status: 409,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: `Something wen't wrong`,
      });
    }
  }
};

exports.readNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).send({
      status: 200,
      response: notes,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: `Something wen't wrong`,
    });
  }
};

exports.readNotesById = async (req, res) => {
  const id = req.params.notesId;
  try {
    const notes = await Notes.findById(id);
    res.status(200).send({
      status: 200,
      response: notes,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: `Something wen't wrong`,
    });
  }
};

exports.updateNotes = async (req, res) => {
  const id = req.params.notesId;
  try {
    const notes = await Notes.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!notes) {
      return res.status(500).send({
        status: 500, 
      });
    }
    res.status(200).send({
      status: 200,
      message: "Update successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).send({
        status: 409,
        message: "Email already exists",
      });
    } else {
      res.status(500).send({
        status: 500,
        message: `Something wen't wrong`,
      });
    }
  }
};

exports.deleteNotes = async (req, res) => {
  const id = req.params.notesId;
  try {
    const notes = await Notes.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!notes) {
      return res.status(500).send({
        status: 500, 
      });
    }
    res.status(200).send({
      status: 200,
      message: "Delete successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: `Something wen't wrong`,
    });
  }
};

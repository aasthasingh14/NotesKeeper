var mongoose = require("mongoose");

var notesSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    todo: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", notesSchema);

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: ["Fiction", "Science", "Comic"],
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const bookModel = mongoose.model("Book", bookSchema);

module.exports = { bookModel };

const express = require("express");
const { bookModel } = require("../model/bookModel");
const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {
  try {
    const booksData = await bookModel.find();
    res.status(200).send({ message: "All Book Data fetched", booksData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

bookRouter.get("/filter/:genre", async (req, res) => {
  try {
    const genreFilter = req.params.genre;
    const query = genreFilter ? { genre: genreFilter } : {};
    const books = await bookModel.find(query);
    res.status(200).send({ message: "Book Data Filtered By Genre", books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

bookRouter.get("/sort/:sortBy", async (req, res) => {
  try {
    const sortBy = req.params.sortBy;
    const sortOrder = sortBy === "asc" ? 1 : -1;
    const books = await bookModel.find().sort({ price: sortOrder });
    res.status(200).send({ message: "Book Data Sorted By Price", books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

bookRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const newBook = new bookModel(payload);
    await newBook.save();
    res.status(201).send({ message: "New Book Data Added", newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

bookRouter.delete("/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const deleteBook = await bookModel.findByIdAndDelete(bookId);
    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book Data Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { bookRouter };

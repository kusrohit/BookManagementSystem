import express from "express";
import { Book } from "../models/book.model.js";

const router = express.Router();

// route to save a book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publisher) {
      return res
        .send({ message: "please send title, author, publisher" })
        .status(400);
    }

    const newbook = {
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
    };

    const book = await Book.create(newbook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message }).status(500);
  }
});

// route for get all book from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// route for get the book with id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// route for update a book

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publisher) {
      return res
        .send({ message: "please send title, author, publisher" })
        .status(400);
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// route to delete a book

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: "book not found",
      });
    }

    return res.status(200).send({ message: "book deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});


export default router;
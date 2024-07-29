import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoute from "./routes/book.route.js"
import cors from "cors";


dotenv.config({
  path: "./.env",
});

const app = express();

// middlewares

//to parse json data
app.use(express.json());

// cors policy
app.use(cors());

// for main page
app.get("/", (req, res) => {
  console.log(`Welcome to Main route!!`);
  // console.log(req) // its gives what inside this reqest object
  return res.send(`Welcome to Main Page!!`).status(234);
});

// for book router
app.use('/books', bookRoute)

// db connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log(`App connected to DB`);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("error in connecting with db:", error);
  });

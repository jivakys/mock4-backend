const express = require("express");
const cors = require("cors");
const { connection } = require("./config/mongoDB");
const { bookRouter } = require("./routes/bookRoutes");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
  res.send("Book Find Home Page");
});

app.use("/book", bookRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server Running on ${process.env.PORT}`);
  } catch (error) {
    console.log("err", error);
  }
  console.log("Database is connected");
});

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

// database init
mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to database...");
  })
  .catch(() => {
    console.log("failed connected to database");
  });

// Routes
const notesRoutes = require("./routes/notes");

// Middlewares
app.use(bodyParser.json());
app.use(cors(
  {
    origin:["https://notes-keeper-frontend-indol.vercel.app"],
    methods:["POST","GET"],
    credentials: true
  }
));

// Routes
app.use("/api", notesRoutes);

app.get("/", (req, res) => {
  res.send("App is working...");
});

// PORT
const port = process.env.PORT || 5000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const app = express();

//DB Connections
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("Oops!.. Error occured.");
  });

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//Port
const port = process.env.PORT || 8000;

//Server
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});

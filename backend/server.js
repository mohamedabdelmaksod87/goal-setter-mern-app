const express = require("express");
const dotenv = require("dotenv").config();
const router = require("./routes/goalRoutes");
//The process.env property returns an object containing the user environment
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", router);

app.listen(port, () => console.log(`Server started on port ${port}`));

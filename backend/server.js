const express = require("express");
const dotenv = require("dotenv").config();
const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");
//The process.env property returns an object containing the user environment
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

app.use("*", (req, res) => {
  res.status(404).json({ error: "requested URL can not be found" });
});

app.listen(port, () => console.log(`Server started on port ${port}`));

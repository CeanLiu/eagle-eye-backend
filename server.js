const express = require("express");
const app = express();

app.set("view engine", "ejs");

const indexRouter = require("./src/routes/index");
app.use("/", indexRouter);

app.listen(5000);

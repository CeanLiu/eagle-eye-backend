import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
  // throw Error("Something went wrong!");
});

export default router;

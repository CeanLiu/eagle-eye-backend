import "dotenv/config";
import express from "express";
import { errorHandler } from "./src/utils/middleware.js";
import esp32Router from "./src/routes/esp32.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Start the HTTP server using Express
app.listen(process.env.PORT, process.env.PUBLIC_IP, () => {
  console.log(
    `Server running on http://${process.env.PUBLIC_IP}:${process.env.PORT}`
  );
});

// Use the esp32 routes
app.use("/esp32", esp32Router);

// Example route for handling GET requests
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express server!" });
});

// Error handling middleware
app.use(errorHandler);

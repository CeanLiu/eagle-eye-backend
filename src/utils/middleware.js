import { checkEsp32Status } from "./esp32.js";

//check if esp is available(i.e. if it is on)
export async function checkEsp32(req, res, next) {
  try {
    const isReady = await checkEsp32Status();
    if (isReady) {
      next();
    }
  } catch (error) {
    // Catch the error thrown by checkEsp32Status
    const err = new Error(error.message || "ESP32 is not available");
    err.statusCode = error.status || 503;
    next(err); // Pass the error to the error handler
  }
}

//keep errorHandler last in middleware.js
//this is a customizeable erorr handler function
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode);

  const responseBody = {
    status: err.statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "💥" : err.stack,
  };
  console.error("Error: ", responseBody);
  res.json(responseBody);
}

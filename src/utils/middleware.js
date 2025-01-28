import { checkEsp32Status } from "./esp32-old.js";
import path from "path";

//check if esp is available(i.e. if it is on)
export async function checkEsp32(req, res, next) {
  try {
    const isReady = req;
    console.log(res);
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

//ensure a file is submitted
export function filesExists(req, res, next) {
  if (!req.files)
    return res.status(400).json({ status: "error", message: "Missing Files" });

  next();
}

//limit extension type
export function fileExtLimiter(allowedExtArray) {
  return (req, res, next) => {
    const files = req.files;

    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    // are the files allowed?
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      const message =
        `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(
          ",",
          ", "
        );

      return res.status(422).json({ status: "error", message });
    }
    next();
  };
}

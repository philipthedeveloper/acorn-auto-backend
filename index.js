import "express-async-errors";
import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { authRouter, generalRouter, careerRouter } from "./router/index.js";
import {
  routeNotFound,
  errorHandler,
  methodChecker,
  requestLogger,
  validateToken,
} from "./middlewares/index.js";
import connectDB from "./connection/mongodb.js";
dotenv.config({ path: ".env" });
const app = express();
const PORT = process.env.PORT;
const HOSTNAME = process.env.HOST;

// Middlewares
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.137.1:5173",
      ...corsOrigins,
    ],
    credentials: true,
  })
);

// Configure Multer to specify where to store uploaded files and set other options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder where uploaded files will be stored
    cb(null, "./uploads"); // Change this path to your desired upload directory
  },
  filename: (req, file, cb) => {
    // Define how the file should be named
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Add middleware to handle multipart/form-data requests
app.use(methodChecker); // Checks if the incoming request method is supported
app.use(upload.any()); // This allows handling any type of file or field in the form data
app.use(express.urlencoded({ extended: true })); // Parse urlencoded data in request body
app.use(express.json({})); // Parse json data in request body
app.use(requestLogger); // Log any incoming request to the console

app.use("/", generalRouter);
app.use("/auth", authRouter);
app.use("/career", careerRouter);
// All route that are not handled from the top will be handled here
app.all("*", routeNotFound); // Returns a 404 response for such routes
app.use(errorHandler); // Handles all error in the app

const startServer = () =>
  app.listen(PORT, HOSTNAME, () => {
    console.log(`Server listening on http://${HOSTNAME}:${PORT}`);
  });

connectDB(startServer);

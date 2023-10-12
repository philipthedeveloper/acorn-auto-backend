import { Router } from "express";
import validateToken from "../middlewares/validate-jwt.js";
import {
  createAboutPage,
  getAboutPage,
  updateAboutPage,
} from "../controllers/aboutPageController.js";

// Create a new router
const aboutRouter = Router();

// Bind routes to controllers
aboutRouter.get("/get-page", getAboutPage);
aboutRouter.post("/create-page", validateToken, createAboutPage);
aboutRouter.patch("/update-page/:pageId", validateToken, updateAboutPage);

// Export the router
export default aboutRouter;

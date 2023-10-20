import { Router } from "express";
import validateToken from "../middlewares/validate-jwt.js";
import {
  getAllNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

// Create a new router
const newsRouter = Router();

// Bind routes to controllers
newsRouter.route("/").get(getAllNews).post(validateToken, createNews);
newsRouter.route("/:newsId").get(getNews).patch(updateNews).delete(deleteNews);

// Export the router
export default newsRouter;

import express from "express";
import {
  createMovie,
  getAllMovie,
  searchMovie,
} from "../controller/movie-controller";

const router = express.Router();

router.route("/").get(getAllMovie).post(createMovie);
router.route("/search").get(searchMovie);

export default router;

import express from "express";
import movieRouter from "./routes/movie-route";
import { notFoundMiddleware } from "./middlewares/not-found-middleware";

const app = express();

app.use(express.json());

const PORT = 8080;

app.use("/api/v1/movies", movieRouter);
app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log("Server started and listening on port ", PORT);
});

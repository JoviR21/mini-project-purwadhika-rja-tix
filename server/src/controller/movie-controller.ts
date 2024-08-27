import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { catchHandle } from "../middlewares/catch-handle-middleware";

const prisma = new PrismaClient();

// GET METHOD--
// Get all Movie
export async function getAllMovie(req: Request, res: Response) {
  try {
    const movies = await prisma.movie.findMany();

    res.status(200).json({ data: movies });
  } catch (error) {
    catchHandle(error, res);
  }
}

// Search Movie by Query
export async function searchMovie(req: Request, res: Response) {
  try {
    const { text } = req.query;

    const movies = await prisma.movie.findMany({
      where: {
        OR: [
          {
            title: {
              contains: text as string,
            },
          },
          {
            director: {
              contains: text as string,
            },
          },
        ],
      },
    });

    res.status(200).json({ data: movies });
  } catch (error) {
    catchHandle(error, res);
  }
}

// POST METHOD --
// Create new Movie
export async function createMovie(req: Request, res: Response) {
  try {
    const { title, director, genre, rated, duration, releaseYear } = req.body;

    await prisma.movie.create({
      data: {
        title,
        director,
        genre,
        rated,
        duration,
        releaseYear,
      },
    });

    res.status(200).json({ message: "Movie successfully created" });
  } catch (error) {
    catchHandle(error, res);
  }
}

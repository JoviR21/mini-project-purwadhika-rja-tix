import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function inputData() {
  console.log("Start seeding movies...");

  const movieData: Prisma.MovieCreateInput[] = [
    {
      title: "Inception",
      director: "Christopher Nolan",
      genre: "SCI_FI",
      rated: "PG_13",
      duration: 148,
      releaseYear: 2010,
    },
    {
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      genre: "DRAMA",
      rated: "R",
      duration: 142,
      releaseYear: 1994,
    },
    {
      title: "The Grand Budapest Hotel",
      director: "Wes Anderson",
      genre: "COMEDY",
      rated: "R",
      duration: 99,
      releaseYear: 2014,
    },
  ];

  for (const m of movieData) {
    const movie = await prisma.movie.create({
      data: m,
    });
    console.log(`Successfully create movie with title: ${movie.title}`);
  }

  console.log("Seeding movies finished!");
}

inputData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect;
    process.exit(1);
  });

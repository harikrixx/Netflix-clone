const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

/* GET ALL MOVIES */
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

/* ADD MOVIE (for testing) */
router.post("/", async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
});

module.exports = router;
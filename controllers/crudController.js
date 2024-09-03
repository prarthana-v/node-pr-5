const MovieModel = require("../models/crudModel");
const fs = require("fs");
const path = require("path");

const viewPage = async (req, res) => {
  try {
    const movieList = await MovieModel.find();
    // console.log("movielist", movieList);
    res.render("view", {
      movieList: movieList,
    });
  } catch (error) {
    console.log("cc-viewpage", error);
    res.status(500).send("Error fetching movies");
    return false;
  }
};

const addPage = (req, res) => {
  res.render("add");
};

const upload = async (req, res) => {
  try {
    // console.log(req.body);
    const { title, year } = req.body;
    const user = new MovieModel({
      title: title,
      year: year,
      poster: req.file.path,
    });
    await user.save();
    console.log("Movie Added..!");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    return false;
  }
};

// delete movie record
const remove = async (req, res) => {
  try {
    // console.log(req.query);
    const id = req.query.id;

    // old poster removal
    const movie = await MovieModel.findById(id);
    if (!movie) return res.status(404).send("movie not found");

    // delete poster
    if (movie.poster) {
      fs.unlinkSync(movie.poster);
    }
    // delete movies
    await MovieModel.findByIdAndDelete(req.query.id);

    console.log("movie deleted..!");

    res.redirect("/");
  } catch (error) {
    console.log("delete-cc", error);
    res.status(500).send("Error deleting movie");
    return false;
  }
};

const edit = async (req, res) => {
  try {
    // console.log(req.query);
    let id = req.query.id;
    const movie = await MovieModel.findById(id);
    // console.log(movie);
    if (!movie) {
      res.status(404).send("Movie not found");
    }
    res.render("edit", {
      movie,
    });
  } catch (error) {
    console.log("edit-cc", error);
    res.status(500).send("Error fetching movie");
    return false;
  }
};

const update = async (req, res) => {
  // console.log(req.body);
  let id = req.body.id;
  // console.log(id);
  const { title, year } = req.body;
  const poster = req.file ? req.file.path : req.body.existingPoster;

  try {
    // old poster removal
    const movie = await MovieModel.findById(id);
    // console.log("movie", movie);
    if (!movie) return res.status(404).send("movie not found");

    // delete old poster if new is uploaded
    if (req.file && movie.poster) {
      fs.unlinkSync(movie.poster);
    }

    // update movie record
    await MovieModel.findByIdAndUpdate(id, {
      title: title,
      year: year,
      poster: poster,
    });

    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error updating movie");
    console.log("update-cc", error);
  }
};

module.exports = {
  addPage,
  viewPage,
  upload,
  edit,
  update,
  remove,
};

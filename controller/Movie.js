const MovieComment = require("../model/mongo/MovieComment");
const mongoose = require('mongoose');

const Movie = require("../model/mongo/Movie");
const list = async (req, res, next) => {
  try {
    const {skip=0,limit=10} = req.query
    const {year, genre, similar, sort} = req.query
    const criteria = {};
    let sortCriteria = {_id:-1}
    if (year) {
      criteria.year = year;
    }
    if (genre) {
      criteria.genres = genre;
    }
    if (similar) {
      const movie = await Movie.findById(similar)
      // console.log(movie)
      criteria.genres = {$all:movie.toObject().genres}
      criteria._id={$ne:mongoose.Types.ObjectId(similar)}
    }
    if (sort) {
      if (sort === "name"){
        sortCriteria = {title:1}
      }
      if (sort === "rating") {
        sortCriteria = {"imdb.rating":-1}
        criteria["imdb.rating"] = {$ne:''}
      }
    }
    console.log(criteria)
    res.json({
      count: await Movie.countDocuments(criteria),
      items: await Movie.find(criteria).skip(+skip).limit(+limit).sort(sortCriteria),
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    res.json({
      item: await Movie.findById(req.params.id),
      comments: await MovieComment.find({movie_id:req.params.id})
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { list, getById };

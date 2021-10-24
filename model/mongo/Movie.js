const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    year: Number,
    title: String,
});
const model = mongoose.model('Movie', MovieSchema, 'movies');
module.exports = model
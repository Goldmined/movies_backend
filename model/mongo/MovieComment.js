const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieCommentSchema = new Schema({
    movie_id: Schema.Types.ObjectId,
    name: String,
});
const model = mongoose.model('MovieComment', MovieCommentSchema, 'movie_comments');
module.exports = model
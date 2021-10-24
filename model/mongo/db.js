const mongoose = require('mongoose');
const CONNECTION =
  process.env.CONNECTION || 'mongodb://127.0.0.1:27017/RoadMap1';

mongoose.connect(CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
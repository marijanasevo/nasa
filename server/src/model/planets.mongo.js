const { Schema, model } = require('mongoose');

const planetsSchema = new Schema({
  keplerName: {
    required: true,
    type: String,
  },
});

module.exports = model('Planet', planetsSchema);

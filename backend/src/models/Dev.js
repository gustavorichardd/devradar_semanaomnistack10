const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

// aqui eu crio qual vai ser a estrutura que vai ter um registro no banco
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere',
    }
});

module.exports = mongoose.model('Dev', DevSchema);
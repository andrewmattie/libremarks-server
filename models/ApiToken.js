const mongoose = require('mongoose');
const ApiTokenSchema = mongoose.Schema({
    'uuid': String
});

module.exports = mongoose.model('jwt', ApiTokenSchema);
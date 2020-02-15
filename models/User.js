(() => {
    const mongoose = require('mongoose');
    const passportLocalMongoose = require('passport-local-mongoose');

    const UserSchema = mongoose.Schema({
        'email': String,
        'password': String
    });
    
    UserSchema.plugin(passportLocalMongoose, {
        selectFields: 'email password',
        usernameField: 'email'
    });
    
    module.exports = mongoose.model('user', UserSchema);
})();
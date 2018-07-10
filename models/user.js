const {mongoose} = require('../server/server'),
    timestamp = require('mongoose-timestamp');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        trim: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
        trim: true
    }
},{collection: 'User'});


UserSchema.plugin(timestamp);


module.exports = {
    User: mongoose.model('User',UserSchema)
};
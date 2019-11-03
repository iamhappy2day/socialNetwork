const mongoose = require('mongoose');
const Shema = mongoose.Schema;  

const UserSchema = new Shema({

    name: {
        type: String,
        required: true,
        min: 3
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 3 
    }

    
});

module.exports = mongoose.model('User', UserSchema);
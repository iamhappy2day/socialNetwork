import mongoose from 'mongoose';
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
    },
    age: {
        type: Number
    },
    surname: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    sex: {
        type: String
    }

});

export const User = mongoose.model('User', UserSchema);


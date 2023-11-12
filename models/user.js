const mongoose = require('mongoose')

const ExerciseShema = new mongoose.Schema({
    date: {
        type: String
    },
    duration: {
        type: Number
    },
    description: {
        type: String
    }
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'must provide username'],
        unique: true
    },
    count: {
        type: Number,
        default: 0
    },
    log: {
        type: [ExerciseShema],
        default: []
    }

})


module.exports = mongoose.model('User', UserSchema)
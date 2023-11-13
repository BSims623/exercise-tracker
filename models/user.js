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
}, { _id: false })

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


module.exports = mongoose.model('user', UserSchema)
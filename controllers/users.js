const User = require('../models/user')
const { UsernameAlreadyExistsError, ProvideInputError, UserNotFoundError, InvalidError } = require('../errors')
const { parseISO, format } = require('date-fns');


const createNewUser = async (req, res) => {
    //const del = await User.deleteMany({})
    const { username } = req.body
    const searchUser = await User.findOne({ username: username }).select('username')
    if (searchUser) {
        return res.status(200).json(searchUser)
    }
    if (!username) {
        throw new ProvideInputError("Please provide a username")
    }
    const createUser = await User.create({ username: username })
    const user = await User.findOne({ username: username }).select('username')
    res.status(200).send(user)
}

const getAllUsers = async (req, res) => {
    //const del = await User.deleteMany({})
    const allUsers = await User.find({}).select('username')
    res.status(200).json(allUsers)
}

const addNewExercise = async (req, res) => {
    const { _id: id, description, duration, date } = req.body
    //console.log(id);
    const searchUser = await User.findById(id).select('username')
    //console.log(searchUser);
    if (!searchUser) {
        throw new UserNotFoundError("No user with that id")
    }
    if (!description) {
        throw new ProvideInputError("Please provide a description")
    }
    if (!duration) {
        throw new ProvideInputError("Please provide a duration")
    }
    let theDuration;
    theDuration = Number(duration)
    if (!theDuration) {
        throw new InvalidError("Duration must be a number")
    }
    let theDate = date
    if (!theDate) {
        theDate = new Date().toDateString()
    } else if (new Date(theDate.replace(/-/g, '\/')).toDateString() === "Invalid Date") {
        throw new InvalidError("Invalid date entry")
    } else {
        theDate = new Date(theDate.replace(/-/g, '\/')).toDateString()
        console.log(theDate)
    }

    //console.log(Number('a'))

    const newLog = { description: description, duration: theDuration, date: theDate }

    const updateUser = await User.findByIdAndUpdate(id, { $push: { log: newLog }, $inc: { count: 1 } }, { new: true })

    res.status(200).json({ ...searchUser._doc, ...newLog })
}

const getUserLogs = async (req, res) => {
    const { _id: id } = req.params
    try {
        const searchUser = await User.findById(id)
        return res.status(200).json(searchUser)
    } catch (error) {
        throw new UserNotFoundError("No user with that id")
    }
}



module.exports = {
    createNewUser,
    getAllUsers,
    addNewExercise,
    getUserLogs
}

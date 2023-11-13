const user = require('../models/user')
const { ProvideInputError, UserNotFoundError, InvalidError } = require('../errors')

const createNewUser = async (req, res) => {
    const { username } = req.body
    if (!username) {
        throw new ProvideInputError("Please provide a username")
    }
    const searchUser = await user.findOne({ username: username }).select('username')
    if (searchUser) {
        return res.status(200).json(searchUser)
    }
    const createUser = await user.create({ username: username })
    const theUser = await user.findOne({ username: username }).select('username')
    res.status(200).send(theUser)
}

const getAllUsers = async (req, res) => {
    const allUsers = await user.find({}).select('username')
    res.status(200).json(allUsers)
}

const addNewExercise = async (req, res) => {
    const { description, duration, date } = req.body
    const id = req.params._id
    const searchUser = await user.findById(id).select('username')
    if (!searchUser) {
        throw new UserNotFoundError("No user with that id")
    }
    if (!description) {
        throw new ProvideInputError("Please provide a description")
    }
    if (!duration) {
        throw new ProvideInputError("Please provide a duration")
    }
    let theDuration = Number(duration)
    if (!theDuration) {
        throw new InvalidError("Duration must be a number")
    }
    let theDate = date
    if (!theDate) {
        theDate = new Date().toLocaleDateString("en-US", {
            timeZone: "UTC", weekday: "short", month: "short",
            day: "2-digit", year: "numeric"
        }).replaceAll(',', '')
    } else if (new Date(theDate.replace(/-/g, '\/')).toDateString() === "Invalid Date") {
        throw new InvalidError("Invalid date entry")
    } else {
        theDate = new Date(theDate.replace(/-/g, '\/')).toDateString()
    }

    const newLog = { description: description, duration: theDuration, date: theDate }

    const updateUser = await user.findByIdAndUpdate(id, { $push: { log: newLog }, $inc: { count: 1 } }, { new: true })

    res.status(200).json({ ...searchUser._doc, ...newLog })
}

const getUserLogs = async (req, res) => {
    const { from, to, limit } = req.query
    let fromDate;
    let toDate;
    if (from) {
        let fromDate = new Date(from.replace(/-/g, '\/')).toDateString()
    }
    if (to) {
        let toDate = new Date(to.replace(/-/g, '\/')).toDateString()
    }

    try {
        const searchUser = await user.findById(req.params._id).select('-__v')
        let filterUserLog = searchUser.log
        if (fromDate && fromDate !== 'Invalid Date') {
            searchUser.from = fromDate
            filterUserLog = filterUserLog.filter((log) => new Date(log.date) > new Date(fromDate))
        }
        if (toDate && toDate !== 'Invalid Date') {
            searchUser.to = toDate
            filterUserLog = filterUserLog.filter((log) => new Date(log.date) < new Date(toDate))
        }
        if (limit && limit.match(/^\d+$/)) {
            filterUserLog = filterUserLog.slice(0, limit)
            searchUser.count = filterUserLog.length
        }
        searchUser.log = filterUserLog
        return res.status(200).json(searchUser)
    } catch (error) {
        console.log(error);
        throw new UserNotFoundError("No user with that id")
    }
}



module.exports = {
    createNewUser,
    getAllUsers,
    addNewExercise,
    getUserLogs
}

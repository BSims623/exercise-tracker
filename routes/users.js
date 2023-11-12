const express = require('express')
const router = express.Router()
const { createNewUser, getAllUsers, addNewExercise, getUserLogs } = require('../controllers/users')

router.route('/').post(createNewUser)
router.route('/').get(getAllUsers)
router.route('/:_id/exercises').post(addNewExercise)
router.route('/:_id/logs').get(getUserLogs)
//router.route('/:_id/logs?[from][&to][&limit]', getUserExerciseLog)

module.exports = router
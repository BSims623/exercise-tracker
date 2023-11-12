const CustomApiError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class UserNotFoundError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statuscode = StatusCodes.NOT_FOUND
    }
}

module.exports = UserNotFoundError
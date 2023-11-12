const CustomApiError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class UsernameAlreadyExistsError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statuscode = StatusCodes.NOT_ACCEPTABLE
    }
}

module.exports = UsernameAlreadyExistsError
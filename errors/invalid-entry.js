const CustomApiError = require("./custom-error")
const { StatusCodes } = require('http-status-codes')

class InvalidError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statuscode = StatusCodes.BAD_REQUEST
    }
}

module.exports = InvalidError
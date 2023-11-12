const CustomApiError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class ProvideInputError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statuscode = StatusCodes.NO_CONTENT
    }
}

module.exports = ProvideInputError
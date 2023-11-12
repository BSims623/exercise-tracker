const { CustomApiError } = require('../errors/index')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.json({ err: err.message })
    }
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: "Something went wrong, please try again later." })
}

module.exports = errorHandlerMiddleware
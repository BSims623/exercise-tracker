const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/connect')
require('express-async-errors')
const userRouter = require('./routes/users')
const bodyParser = require('body-parser')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api/users', userRouter)

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    connectDB(process.env.URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

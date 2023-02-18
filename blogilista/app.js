const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require("./utils/config")
const logger = require("./utils/logger")
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
mongoose.connect(config.MONGODB_URI)


app.use(cors())
app.use(express.json())
app.use(require("./utils/tokenExtractor"))
app.use("/api/blogs",blogsRouter)
app.use("/api/users",usersRouter)
app.use(require("./controllers/errorHandler"))
app.use("/api/login",loginRouter)
if (process.argv[2] === 'test') {
    console.log("testing enabled")
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }

  
module.exports = app
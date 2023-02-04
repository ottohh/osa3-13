const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require("./utils/config")
const logger = require("./utils/logger")
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')


mongoose.connect(config.MONGODB_URI)


app.use(cors())
app.use(express.json())

app.use("/api/blogs",blogsRouter)

app.use(require("./controllers/errorHandler"))


  
module.exports = app
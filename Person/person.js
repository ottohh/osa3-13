const mongoose = require('mongoose')
const password = process.argv[2]
const url =
  `mongodb+srv://otto:${password}@cluster0.5mebanv.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
module.exports  = mongoose.model('Person', personSchema)
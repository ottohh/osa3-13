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
    name: {
      type:String,
     
      minlength:[3, 'Name length must be atleast 3']
    },
    number: {
      type:String,
      validate: {
        validator: function(v) {
          //tests for being valid phone number
          return /\d{2,3}-\d{3,10}/gm.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      minlength:[8, 'Number must be atleast 8 digits long!']
    }
   
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
module.exports  = mongoose.model('Person', personSchema)
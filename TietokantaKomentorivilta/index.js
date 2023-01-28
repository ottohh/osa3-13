const mongoose = require('mongoose')



const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

console.log(password)
const url =
  `mongodb+srv://otto:${password}@cluster0.5mebanv.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

const personsSchema = new mongoose.Schema({
    name: String,
    number: String,
    id:String
  })
  
const Person = mongoose.model('person', personsSchema)
mongoose.connect(url)

if(process.argv.length<5){
    console.log(222)
    Person.find({}).then(result => {
        console.log(result)
        console.log("phonebook:")
        result.forEach(person => {
          console.log(person.name , "   ", person.number,"    ",person.id)
        })
        mongoose.connection.close()
      })
    
}else {
    const person = new Person({name,number})
person.save().then(result => {
    console.log('note saved!')
    console.log(result)
    mongoose.connection.close()
  })
}

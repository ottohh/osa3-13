

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require("cors")
const Person = require("./Person/person.js")

morgan.token('content', function (req, res) {
    console.log(req.body)
     return JSON.stringify(req.body) })

app.use(express.static("build"))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.use(cors())







app.get('/info/', (req, res) => {
    res.send('<p>Phonebook has info for ' + persons.length + ' people</p><p>' + new Date().toDateString() + '</p>')
})


app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    
    
  
    Person.findByIdAndUpdate(req.params.id, body, {new: true, runValidators: true, context: 'query' })
      .then(updatedPerson => {
        res.json(updatedPerson)
      })
      .catch(error => next(error))
  })


app.get('/api/persons/:id', (req, res,next) => {
    
    Person.findById(req.params.id).then(person => {
        
        if(person){
            res.json(person)
        }else {
            res.status(404).end()

        }
        
      })
      .catch(error => {
        
        next(error)
      })
   
})

app.delete('/api/persons/:id', (req, res,next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
    .then(result=>res.status(204).json(result).end())
    .catch(error=>next(error))
})

app.post('/api/persons', (req, res,next) => {
    const newPersonData=req.body

    const person = new Person(newPersonData)
    person.save().then(result => {
    console.log('note saved!')
    console.log(result)
    
    res.json(result)
    
  }).catch(error => {
        
    next(error)
  })
    
   
    
})

app.get('/api/persons', (req, res) => {




   
    Person.find({}).then(result=>{
        res.json(result)
        console.log(result)
        
    })
    
})

const errorHandler = (error, request, response, next) => {
    
    console.log(error.text)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }else if(error.name==="ValidationError"){
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
app.use(errorHandler)
  




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
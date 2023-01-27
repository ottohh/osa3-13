
let persons = [
    {
        "name": "Otto Haarahiltunen",
        "number": "1321",
        "id": 1
    },
    {
        "name": "132",
        "number": "1233",
        "id": 2
    }
]


const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require("cors")
morgan.token('content', function (req, res) {
    console.log(req.body)
     return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.json())
app.use(cors())
app.use(express.static("build"))




app.get('/info/', (req, res) => {
    res.send('<p>Phonebook has info for ' + persons.length + ' people</p><p>' + new Date().toDateString() + '</p>')
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    console.log(persons)
    let person =persons.find(function (person) {
        console.log(person.id)
        return person.id == id
    })
    if(person==undefined)res.status(404).end()

    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    let personsPreviousLenght=persons.length
    persons =persons.filter(person=>person.id!=id)

    if(persons.length===personsPreviousLenght){
        res.status(404).end() 
        return
    }
    console.log(id)
    console.log(persons)
   
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const newPerson=req.body
    
    if(!("name" in newPerson)||!("number" in newPerson))
    {
        res.status(404)
        res.json({ error: 'Must have name and number' })
        return
    }

  

    if(persons.find((person)=>person.name===newPerson.name)!==undefined){
        res.status(404)
        res.json({ error: 'name must be unique' })
        return
    }
    let id = Math.floor(Math.random()*1000)
    while(persons.find(person=>person.id===id)!==undefined){
    
        id = Math.floor(Math.random()*1000)
        console.log(id)
    }
    console.log(id)
    newPerson.id=id
    persons=persons.concat(newPerson)
    
   
    res.json(newPerson)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
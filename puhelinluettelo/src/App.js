import { useState, useEffect } from 'react'
import React from 'react'
import services from './services/services'
import './index.css'

const Filter = (props)=>{
  return (<div>
    filter shown with <input value={props.filter}
          onChange={props.filterChanged} />


  </div>)

}


const PersonForm = (props)=>{
  return(
    <form onSubmit={props.addPerson} >
        <div>
          name: <input  value={props.NewName}
          onChange={props.handleNameChange} />

          <div>number: <input value={props.number}
          onChange={props.handleNumberChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )

}

const Notification = ( props ) => {
  if (props.message === "") {
    return null
  }

  return (
    <div className={props.type==="inform"?"inform":"error"}>
      {props.message}
    </div>
  )
}

const Persons = (props)=>{

  const persons=props.persons
  const filter=props.filter

  const deletePerson = personId =>{
    const newPersons = Array.from(persons)
    console.log(personId)
    console.log(newPersons)
    const index = newPersons.findIndex(Person=>Person.id==personId)
    const deletedPerson =newPersons.splice(index,1)
    console.log(deletedPerson)
    console.log(newPersons)
    props.setPersons(newPersons)
    services.deleteById(personId).then(req=>{
      props.setNotification(`deleted ${deletedPerson[0].name}`)
      props.setNotificationType("inform")
      setTimeout(()=>props.setNotification(""),5000)
    }    

    ).catch(error =>handleError(error,props.setNotification,props.setNotificationType))

      

  }


  console.log("----------------")
  console.log("persons",persons)
  const filterPersons = (person)=>{

    if(person.name.toLowerCase().includes(filter)){
      return(
        <li key={person.id}>{person.name} {person.number} <button onClick={()=>deletePerson(person.id)} >Delete</button></li>
     )  
    }
  }
  return(<ul>

    {persons.map(filterPersons)}
    
    </ul>)
}


const handleError = (error,setNotification,setNotificationType)=>{

  setNotification(error.response.data.error)
  setNotificationType("error")
  setTimeout(()=>setNotification(""),5000)
  console.log(error);
}




const App = (props) => {

  
  const [filter,setFilter] = useState("")
  const [persons, setPersons] = useState([])
  const [NewName, setNewName] = useState('')
  const [number,SetNewNumber] = useState('')
  const [notification,setNotification]=useState("")
  const [notificationType,setNotificationType]=useState("error")

  

  
  useEffect(()=>{services.getAll().
    then((response)=>{setPersons(response.data)})
  
  },[])
  

  const handleNameChange = (event) => {
    
    setNewName(event.target.value)
  }


  const handleNumberChange = (event)=>{
    SetNewNumber(event.target.value)

  }


  const filterChanged = (event)=>{
    setFilter(event.target.value.toLowerCase())
  }


  const addPerson = (event) => {
    event.preventDefault()
    let id=1 
    const newPerson = {
      "name": NewName,
      "number": number,
    }
    if(persons.find(person=>person.name===NewName)){
      let result = window.confirm(`${NewName} already exists. Do you want to change number?`)
      if(result===true){
        services.update(persons.find(person=>person.name===NewName).id,newPerson).then(
          response=>{
            console.log(response)
            
            const modifiedPerson = {...persons.find(person=>person.name===NewName),number:number}
            console.log("modified:",modifiedPerson)
            setPersons(persons.map(person=>person.name===NewName?modifiedPerson:person))
            setNotification(`Changed ${newPerson.name}`)
            setNotificationType("inform")
            setTimeout(()=>setNotification(""),5000)

          }
        ).catch(error =>handleError(error,setNotification,setNotificationType))
        
        
      }
      
    }else{
     
      services.create(newPerson).then(function (response) {
        console.log(response);
        setNotification(`Added ${newPerson.name}`)
        setNotificationType("inform")
        setTimeout(()=>setNotification(""),5000)
        setPersons(persons.concat(response.data))
      })
      .catch(error =>handleError(error,setNotification,setNotificationType))
    }
    console.log(persons)
    
    
    SetNewNumber("")
    setNewName("")
  }

  

 
  


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChanged={filterChanged} />
      
      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} number={number} NewName={NewName} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}
      />
      <Notification type={notificationType} message={notification} />
      <h2>Numbers</h2>
      <Persons setNotificationType={setNotificationType} setNotification={setNotification} persons={persons} filter={filter} setPersons={setPersons}/>
     
      <div>debug: {NewName}</div>
   
    </div>
  )

}

export default App
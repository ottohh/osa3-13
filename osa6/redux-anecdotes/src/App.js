
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/filter'
import Notification from './components/Notification'



const App = () => {
  
  return (
    <div>
       <h2>Anecdotes</h2>
       <Notification/>
      <AnecdoteList/>
      <AnecdoteForm/>
      <Filter/>
    </div>
  )
}


export default App
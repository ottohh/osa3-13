
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/AnecdoteList'


const App = () => {
  return (
    <div>
       <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}


export default App
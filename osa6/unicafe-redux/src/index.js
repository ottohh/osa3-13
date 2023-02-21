import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from './reducer'
import { createStore } from 'redux'



const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
       
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'GOOD' })}
      >
        GOOD
      </button>
      <button
        onClick={e => store.dispatch({ type: 'OK' })}
      >
        OK
      </button>
      <button
        onClick={e => store.dispatch({ type: 'BAD' })}
      >
        BAD
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        reset
      </button>

        <ul>
            <li>GOOD {store.getState().good}</li>
            <li>OK {store.getState().ok}</li>
            <li>BAD {store.getState().bad}</li>
        </ul>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
import { useState } from 'react'

export const useCountry = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = (event)=>{
    setValue('')
  }
  return {
    name,
    value,
    onChange,
    reset
  }
}

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => {
  // ...
}
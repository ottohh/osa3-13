import { createContext, useReducer, useContext } from 'react'

const UserContext = createContext()


const userReducer =  (state,action ) => {
  switch (action.type) {
  case 'set':
    return action.payload
  case 'empty':
    return null
  default:
    return state
  }
}


export const useUserObject = () => {
  const UserAndDispatch = useContext(UserContext)
  return UserAndDispatch[0]
}

export const useUserDispatch = () => {
  const UserAndDispatch = useContext(UserContext)
  return UserAndDispatch[0]
}
export const UserContextContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(userReducer)

  return (
    <UserContext.Provider value={[counter, counterDispatch] }>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
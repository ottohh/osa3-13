import { createSlice} from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice= createSlice({
    name:"notification",
    initialState,
    reducers:{
        setNotification(state,action){
            console.log("asddddddd")
            return action.payload

        },
        deleteNotification(state,action){
            return '';
        }
    }


})

export const { setNotification, deleteNotification } = notificationSlice.actions

export const notification = (content,time) => {
    return async dispatch => {
        dispatch(setNotification(content))
        setTimeout(() => {
          dispatch(deleteNotification())
        }, time)
    }
  }
  

export default notificationSlice.reducer
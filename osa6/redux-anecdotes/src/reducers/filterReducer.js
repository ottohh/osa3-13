import { createSlice } from "@reduxjs/toolkit"

const filterReducer = (state = '', action) => {

    switch(action.type){

        case 'SET_FILTER':
            return state=action.payload

  }
  return state=''

}
const initialState=''
const filterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:
    {
        filterChange(state,action){

            return state=action.payload
        }
    }


})

  


 
export const {filterChange}=filterSlice.actions



  export default filterSlice.reducer
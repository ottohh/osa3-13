import { useState,useEffect } from "react"
import axios from 'axios'

export const useCountry = (name) => {
    
    const [data,setData]=useState({})
    const [found,setFound]=useState(false)
    

    useEffect(()=>{
        console.log('effect')
        axios
          .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
          .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
            setData({...response.data[0]})
            setFound(true)
            console.log("found")
          }).catch(()=>setFound(false))
        

    },[name])

    return {
      name,
      data,
      found
    
    }
  }
  
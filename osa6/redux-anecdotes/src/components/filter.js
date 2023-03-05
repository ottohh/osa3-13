import { useSelector, useDispatch} from "react-redux"
import { filterChange } from "../reducers/filterReducer"
const Filter = () => {

    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)

    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      dispatch(filterChange(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} value={filter} />
      </div>
    )
  }
  
  export default Filter
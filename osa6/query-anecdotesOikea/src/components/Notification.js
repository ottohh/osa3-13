
import { useContext } from 'react'
import notificationContext from './notificationContext'


const Notification = () => {
  const [notification, notificationDispatch]  = useContext(notificationContext)
 
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification=="") return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification

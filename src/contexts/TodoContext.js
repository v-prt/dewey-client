import { createContext } from 'react'
import { useQuery } from 'react-query'
import { useQueryClient } from 'react-query'
import axios from 'axios'
import { API_URL } from '../constants'

export const TodoContext = createContext(null)
export const TodoProvider = ({ children }) => {
  const queryClient = new useQueryClient()

  // TODO: pass in listId if selected via sidebar
  const { data, status } = useQuery('todos', async () => {
    const res = await axios.get(`${API_URL}/todos`)
    return res.data.todos
  })

  const addList = async data => {
    try {
      const res = await axios.post(`${API_URL}/lists`, data)
      queryClient.invalidateQueries('lists')
      return res.data.list
    } catch (err) {
      console.log(err)
    }
  }

  const addTodo = async todo => {
    try {
      const res = await axios.post(`${API_URL}/todos`, todo)
      return res.data.todo
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <TodoContext.Provider value={{ data, status, addList, addTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

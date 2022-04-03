import { createContext } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
const baseUrl = 'http://localhost:4000'

export const TodoContext = createContext(null)
export const TodoProvider = ({ children }) => {
  const { data, status } = useQuery('todos', async () => {
    const res = await axios.get(`${baseUrl}/todos`)
    return res.data.todos
  })

  const addTodo = async todo => {
    try {
      const res = await axios.post(`${baseUrl}/todos`, todo)
      return res.data.todo
    } catch (err) {
      console.log(err)
    }
  }

  return <TodoContext.Provider value={{ data, status, addTodo }}>{children}</TodoContext.Provider>
}

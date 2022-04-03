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

  return <TodoContext.Provider value={{ data, status }}>{children}</TodoContext.Provider>
}

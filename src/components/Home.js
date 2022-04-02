import { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'

export const Home = () => {
  const { data, status } = useContext(TodoContext)
  console.log(data)

  return (
    <div className='home'>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && (
        <div className='todo-list'>
          {data.map(todo => (
            <p className='todo-item' key={todo._id}>
              {todo.description}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

import { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'
import { Formik } from 'formik'
import { Form, Input, Select } from 'formik-antd'
import styled from 'styled-components/macro'
import { backgrounds } from '../GlobalStyles'
const { Option } = Select

export const Home = () => {
  const { data, status } = useContext(TodoContext)
  console.log(data)

  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Wrapper>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && (
        <div className='todo-list'>
          <h2>What do you need to do?</h2>
          <p>Add a new task or habit you want to track and complete daily.</p>
          <Formik>
            {({ values, submitForm }) => (
              <Form>
                <Input name='task' placeholder='Enter task' />
                <Select name='priority' placeholder='Priority'>
                  <Option value={3}>Low</Option>
                  <Option value={2}>Medium</Option>
                  <Option value={1}>High</Option>
                </Select>
              </Form>
            )}
          </Formik>
          <h2>Daily Tasks</h2>
          {data.map(todo => (
            <p className='todo-item' key={todo._id}>
              <span className='description'>{todo.description}</span>
              <span className='actions'>
                <button>Complete</button>
                <button>Delete</button>
              </span>
            </p>
          ))}
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  h2 {
    margin-bottom: 20px;
  }
  .add-todo {
    display: flex;
    margin-bottom: 50px;
  }
  .todo-list {
    display: flex;
    flex-direction: column;
    .todo-item {
      background: ${backgrounds.pink};
      color: #fff;
      margin: 10px 0;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      .actions {
        button {
          background: transparent;
          margin: 0 5px;
        }
      }
    }
  }
`

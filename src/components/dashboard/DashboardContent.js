import { useContext } from 'react'
import styled from 'styled-components/macro'
import { backgrounds } from '../../GlobalStyles'
import { TodoContext } from '../../contexts/TodoContext'
import { Formik } from 'formik'
import { Form, Input, Select } from 'formik-antd'
const { Option } = Select

export const DashboardContent = () => {
  const { data, status } = useContext(TodoContext)

  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Wrapper>
      {/* TODO: selecting list via sidebar should populate tasks for that list here (filter by listId with react-query) */}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && (
        <div className='todo-list'>
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

const Wrapper = styled.section`
  padding: 40px;
  .add-todo {
    display: flex;
    margin-bottom: 50px;
  }
  .todo-list {
    display: flex;
    flex-direction: column;
    form {
      display: flex;
    }
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

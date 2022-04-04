import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { TodoContext } from '../contexts/TodoContext'
import { Formik } from 'formik'
import { Form, Input, Select } from 'formik-antd'
import styled from 'styled-components/macro'
import { backgrounds } from '../GlobalStyles'
const { Option } = Select

export const Dashboard = () => {
  const { currentUser } = useContext(UserContext)
  const { data, status } = useContext(TodoContext)
  console.log(currentUser)

  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
  }

  return currentUser ? (
    <Wrapper>
      <aside className='dashboard-sidebar'>
        <p className='user'>{currentUser.name}</p>
        <div className='lists'>
          <p>My Lists</p>
          {currentUser.lists.length ? (
            currentUser.lists.map(list => (
              <div className='list' key={list._id}>
                {list.name}
              </div>
            ))
          ) : (
            <p className='empty'>+ Add lists here.</p>
          )}
        </div>
      </aside>
      <section className='dashboard-content'>
        {/* TODO: selecting list via sidebar should populate tasks for that list here (use filter with react-query) */}
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
      </section>
    </Wrapper>
  ) : (
    <Navigate to='/login' />
  )
}

const Wrapper = styled.div`
  display: flex;
  .dashboard-sidebar {
    width: 300px;
    padding: 40px;
    border-right: 1px solid #fff;
    .user {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1.2rem;
    }
    .lists {
      margin-top: 20px;
      .empty {
        color: #999;
        font-size: 0.8rem;
      }
    }
  }
  .dashboard-content {
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
  }
`

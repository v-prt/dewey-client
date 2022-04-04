import { useContext } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import styled from 'styled-components/macro'
import { Formik, Form } from 'formik'
import { Input } from 'formik-antd'
import * as Yup from 'yup'
import { TodoContext } from '../../contexts/TodoContext'
import { UnorderedListOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { API_URL } from '../../constants'

export const DashboardSidebar = ({ currentUser }) => {
  const { addList } = useContext(TodoContext)

  const { data: listsData } = useQuery('lists', async () => {
    const res = await axios.get(`${API_URL}/lists/${currentUser._id}`)
    return res.data.lists
  })

  const initialValues = {
    name: '',
  }

  const listSchema = Yup.object().shape({
    name: Yup.string().required('List name required'),
  })

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    const data = {
      userId: currentUser._id,
      name: values.name,
    }
    try {
      const result = await addList(data)
      if (result.error) {
        console.log(result.error)
        setSubmitting(false)
      } else {
        console.log(result)
        resetForm()
        setSubmitting(false)
      }
    } catch (err) {
      console.log(err)
      setSubmitting(false)
    }
  }

  return (
    <Wrapper>
      <p className='user'>{currentUser.name}</p>
      <div className='lists'>
        <p className='title'>
          <UnorderedListOutlined /> My Lists
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={listSchema}
          validateOnBlur={false}
          onSubmit={handleSubmit}>
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Input
                name='name'
                placeholder='New list'
                suffix={<PlusCircleOutlined />}
                onPressEnter={submitForm}
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
        <div className='list-items'>
          {listsData &&
            listsData.length > 0 &&
            listsData.map(list => (
              <div className='list-item' key={list._id}>
                {list.name}
              </div>
            ))}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  width: 300px;
  padding: 40px;
  border-right: 1px solid #fff;
  .user {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .lists {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .title {
      border-bottom: 1px solid #222;
    }
    form {
      margin-top: 10px;
    }
    .list-items {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      .list-item {
        background: #fff;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
      }
    }
  }
`

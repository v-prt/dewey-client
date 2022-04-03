import { Link } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form } from 'formik'
import { Input } from 'formik-antd'
import { FormItem } from './forms/FormItem'
import { Button } from 'antd'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import styled from 'styled-components/macro'
import { API_URL } from '../constants'
YupPassword(Yup) // extend yup

export const Register = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  }

  const accountSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short').max(30, 'Too long').required('Name required'),
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string().min(6, 'Too short').required('Password required'),
  })

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values)
    setSubmitting(true)
    try {
      axios
        .post(`${API_URL}/users`, values)
        .then(res => {
          console.log(res)
          setSubmitting(false)
        })
        .catch(err => {
          console.log(err)
          setSubmitting(false)
        })
    } catch (err) {
      console.log(err)
      setSubmitting(false)
    }
  }

  return (
    <Wrapper>
      <h1>Account Registration</h1>
      <p>
        Create an account to start tracking your tasks. Stay on top of your to-do lists and maintain
        streaks to form healthy new habits.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={accountSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <FormItem name='name'>
              <Input name='name' type='text' placeholder='Name' autoFocus />
            </FormItem>
            <FormItem name='email'>
              <Input name='email' type='text' placeholder='Email' />
            </FormItem>
            <FormItem name='password'>
              <Input.Password name='password' type='password' placeholder='Password' />
            </FormItem>
            <div className='actions'>
              <Link to='/login'>Already registered? Sign in.</Link>
              <Button htmlType='submit' type='primary' className='color' loading={isSubmitting}>
                SUBMIT
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  max-width: 500px;
  margin: auto;
  h1 {
    margin-bottom: 10px;
  }
  form {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      button {
      }
    }
  }
`

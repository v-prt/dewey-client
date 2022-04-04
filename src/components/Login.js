import { useContext } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Input } from 'formik-antd'
import { FormItem } from './forms/FormItem'
import { Alert, Button } from 'antd'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import styled from 'styled-components/macro'
import { UserContext } from '../contexts/UserContext'
YupPassword(Yup) // extend yup

export const Login = () => {
  const { currentUser, handleLogin } = useContext(UserContext)

  const initialValues = {
    email: '',
    password: '',
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string().required('Email required'),
    password: Yup.string().required('Password required'),
  })

  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    setStatus('')
    setSubmitting(true)
    try {
      const result = await handleLogin(values)
      if (result.error) {
        console.log(result.error)
        setStatus(result.error)
        setSubmitting(false)
      } else {
        localStorage.setItem('deweyToken', result._id)
        setSubmitting(false)
      }
    } catch (err) {
      console.log(err)
      setStatus('Oops, something went wrong.')
      setSubmitting(false)
    }
  }

  return currentUser ? (
    <Navigate to='/dashboard' />
  ) : (
    <Wrapper>
      <h1>Sign In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}>
        {({ status, isSubmitting }) => (
          <Form>
            {status && <Alert message={status} type='error' showIcon />}
            <FormItem name='email'>
              <Input name='email' type='text' placeholder='Email' />
            </FormItem>
            <FormItem name='password'>
              <Input.Password name='password' type='password' placeholder='Password' />
            </FormItem>
            <div className='actions'>
              <Link to='/register'>Not registered? Sign up.</Link>
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
  width: 90vw;
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
  @media only screen and (min-width: 500px) {
    width: 400px;
  }
`

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
      {status === 'success' && <div className='lists'>todo lists (home/work/personal/etc)</div>}
    </Wrapper>
  )
}

const Wrapper = styled.div``

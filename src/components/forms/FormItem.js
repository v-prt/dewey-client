import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styled from 'styled-components/macro'
import { colors } from '../../GlobalStyles'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

export const FormItem = ({ children, name, label, sublabel, subtext, info = '' }) => {
  return (
    <Wrapper>
      <Field>
        {({ form }) => {
          const hasError = form.errors[name] && form.touched[name]
          return (
            <div>
              <label className='item-label' style={{ color: !hasError || 'red' }}>
                {info && (
                  <Tooltip color={colors.pink} placement='topLeft' title={info}>
                    <span className='info'>
                      <QuestionCircleOutlined />
                    </span>
                  </Tooltip>
                )}
                {label && <span className='label'>{label} </span>}
                {sublabel && <span className='sublabel'>{sublabel} </span>}
              </label>
              {subtext && <p className='subtext'>{subtext}</p>}
              {children}
              {name && (
                <ErrorMessage
                  name={name}
                  component='div'
                  render={msg => (
                    <div
                      style={{
                        color: 'red',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.8rem',
                      }}>
                      <ExclamationCircleOutlined style={{ marginRight: '5px' }} />
                      <span>{msg}</span>
                    </div>
                  )}
                />
              )}
            </div>
          )
        }}
      </Field>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 10px 0;
  .item-label {
    display: block;
    .info {
      color: ${colors.pink};
    }
    .sublabel {
      font-size: 0.8rem;
      color: #828282;
      font-weight: normal;
    }
  }
  .subtext {
  }
  .info-text {
    color: #666;
    font-size: 0.8rem;
  }
  .ant-input,
  .ant-input-number,
  .ant-select .ant-select-selector {
    color: black;
    &.ant-input-disabled {
      color: gray;
      cursor: auto;
      resize: none;
    }
  }
  .ant-input-number {
    display: block;
    width: 100%;
    max-width: 200px;
  }
`

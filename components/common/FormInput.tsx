import React from 'react'
import { Input, Space } from 'antd'

import 'antd/dist/antd.css'

interface IFormInput {
  className?: any
  label?: string
  ariaLabel?: string
  id?: string
  type?: string
  name?: string
  value?: string
  placeholder?: string
  prefix?: string
  error?: any
  disabled?: boolean
  required?: boolean
  handleChange?: () => void
  handleBlur?: () => void
  ariaDescribeBy?: string
  testId?: string
  isPasswordInput?: boolean
}

const FormInput: React.FC<IFormInput> = ({
  label,
  className,
  ariaLabel,
  id,
  type,
  name,
  value,
  placeholder,
  prefix,
  error,
  disabled,
  required,
  handleChange,
  handleBlur,
  ariaDescribeBy,
  testId,
  isPasswordInput,
}) => {
  return (
    <>
      {isPasswordInput ? (
        <div>
          <Space direction="vertical">
            <Input.Password
              id={id}
              type={type}
              name={name}
              value={value}
              placeholder={placeholder}
              prefix={prefix}
              disabled={disabled}
              required={required}
              onChange={handleChange}
            />{' '}
          </Space>
        </div>
      ) : (
        <div>
          <Space direction="vertical">
            <Input
              id={id}
              type={type}
              name={name}
              value={value}
              placeholder={placeholder}
              prefix={prefix}
              disabled={disabled}
              required={required}
              onChange={handleChange}
            />{' '}
          </Space>
        </div>
      )}
    </>
  )
}

export default FormInput

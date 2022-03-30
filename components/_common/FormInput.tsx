import React from 'react'
import { Input } from 'antd'
import 'antd/dist/antd.css'
import { ModalFormLabel } from './styles'

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
          <ModalFormLabel text={'Password'} />
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
        </div>
      ) : (
        <div>
          <ModalFormLabel text={label} />
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
        </div>
      )}
    </>
  )
}

export default FormInput

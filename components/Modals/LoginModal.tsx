import React, { useState } from 'react'
import { Modal } from 'antd'
import 'antd/dist/antd.css'
import FormInput from '../common/FormInput'
// import {formInputStyles} from './styles'

const LoginModal = () => {
  const [ isModalVisible, setIsModalVisible ] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <Modal
      title="Welcome to QuikSeek"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <FormInput placeholder={'enter email'} 
    //   className={formInputStyles}
       />
      <FormInput
        isPasswordInput={true}
        // className={formInputStyles}
        placeholder={'enter password'}
      />
    </Modal>
  )
}

export default LoginModal

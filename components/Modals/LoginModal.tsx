import React, { useState, useContext } from 'react'
import { Modal } from 'antd'
import 'antd/dist/antd.css'
import FormInput from '../common/FormInput'
import AppContext from 'context/appContext'
import * as LoginModalActions from 'actions/modalActions'
// import {formInputStyles} from './styles'

const LoginModal = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { renderLoginModal } = LoginModalActions

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => dispatch(renderLoginModal)

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
      <FormInput
        placeholder={'enter email'}
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

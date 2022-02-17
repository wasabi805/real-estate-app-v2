import React, { useContext } from 'react'
import { Modal } from 'antd'
import 'antd/dist/antd.css'
import AppContext from 'context/appContext'
import * as LoginModalActions from 'actions/modalActions'

interface ILoginModalProps {
  children: JSX.Element[]
}

const LoginModal: React.FC<ILoginModalProps> = ({ children }) => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { dismissLoginModal } = LoginModalActions

  const onSubmit = () => {
    alert('submit the creds')
  }

  const onCancel = () => {
    dispatch(dismissLoginModal)
  }

  return (
    <Modal
      title="Welcome to QuikSeek"
      visible={state.isLoginModalVisibile}
      onOk={onSubmit}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  )
}

export default LoginModal

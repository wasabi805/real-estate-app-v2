import React, { useContext } from 'react'
import { Modal } from 'antd'
import 'antd/dist/antd.css'
import AppContext from 'context/appContext'
import * as LoginModalActions from 'actions/modalActions'
import FormInput from 'components/common/FormInput'

interface ILoginModalProps {}

const LoginModal: React.FC<ILoginModalProps> = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { dismissLoginModal, setLoginFormChange } = LoginModalActions

  const onSubmit = () => {
    alert('submit the creds')
  }

  const onCancel = () => {
    dispatch(dismissLoginModal)
  }

  const handleLoginFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target

    dispatch(setLoginFormChange({ [name]: value }))
  }

  return (
    <Modal
      title="Welcome to QuikSeek"
      visible={state.isLoginModalVisibile}
      onOk={onSubmit}
      onCancel={onCancel}
    >
      <FormInput
        name={'email'}
        value={state.user.email}
        placeholder={'enter email'}
        handleChange={handleLoginFormChange}
      />
      <FormInput
        name="password"
        value={state.user.passsword}
        isPasswordInput={true}
        placeholder={'enter password'}
        handleChange={handleLoginFormChange}
      />
    </Modal>
  )
}

export default LoginModal

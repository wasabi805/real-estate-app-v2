import React, { useContext } from 'react'
import { Modal, Tabs, Button } from 'antd'
import 'antd/dist/antd.css'
import AppContext from 'context/appContext'
import * as LoginModalActions from 'actions/modalActions'
import FormInput from 'components/common/FormInput'
import { LoginModaContentWrapper, LoginModalContainer } from './styles'

const { TabPane } = Tabs
interface ILoginModalProps {}

const LoginModal: React.FC<ILoginModalProps> = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { dismissLoginModal, setLoginFormChange } = LoginModalActions

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
      onOk={() => alert('hi there')}
      onCancel={onCancel}
    >
      <div>
        <Tabs defaultActiveKey="1" onChange={() => console.log('hi')}>
          <TabPane tab="Login" key="1">
            <LoginModaContentWrapper>
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
            </LoginModaContentWrapper>

            <LoginModaContentWrapper>
              <Button type="primary">Sign In</Button>
              <a>Forgot Password</a>
            </LoginModaContentWrapper>
          </TabPane>

          <TabPane tab="Register" key="2">
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

            <div>
              <Button type="primary">Primary Button</Button>
              <Button>Default Button</Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  )
}

export default LoginModal

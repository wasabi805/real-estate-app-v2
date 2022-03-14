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
  const { dismissLoginModal, setLoginFormChange, setIsLogin } =
    LoginModalActions

  const onCancel = () => {
    dispatch(dismissLoginModal)
  }

  const handleLoginFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target
    dispatch(setLoginFormChange({ [name]: value }))
  }

  const handleTabClick = (key: string) => {
    key === 'login' ? dispatch(setIsLogin(true)) : dispatch(setIsLogin(false))
  }

  const handleCreateNewUser = () => {

    // get reducer data and check if user exists in dynamo
    // 1.) on back end make a get all user and see if the user already exists
    //this check has to be able to be done from any page in the app
    fetchData()
  }

  const fetchData = async () => {
    const req = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const AppData = await req.json()
    console.log({ AppData })
    return { AppData: AppData.results }
  }

  return (
    <Modal
      title="Welcome to QuikSeek"
      visible={state.isLoginModalVisibile}
      onOk={() => alert('hi there')}
      onCancel={onCancel}
    >
      <div>
        {/* LOGIN EXISTING USER */}
        <Tabs defaultActiveKey="1" onTabClick={(key) => handleTabClick(key)}>
          <TabPane tab="Login" key="login">
            <LoginModaContentWrapper>
              <FormInput
                label={'email'}
                name={'email'}
                value={state.loginModal.email}
                placeholder={'enter email'}
                handleChange={handleLoginFormChange}
              />
              <FormInput
                name="password"
                label={'password'}
                value={state.loginModal.password}
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

          {/* REGISTER NEW USER */}

          <TabPane tab="Register" key="register">
            <FormInput
              label={'email'}
              name={'email'}
              value={state.loginModal.email}
              placeholder={'enter email'}
              handleChange={handleLoginFormChange}
            />
            <FormInput
              label="create password"
              name="password"
              value={state.loginModal.password}
              placeholder={'enter password'}
              handleChange={handleLoginFormChange}
            />

            <FormInput
              label={'confirm password'}
              name="confirm-password"
              value={state.loginModal.confirmPassword}
              placeholder={'confirm password'}
              handleChange={handleLoginFormChange}
            />

            <div>
              <Button onClick={handleCreateNewUser} type="primary">
                Register Now!
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  )
}

LoginModal.getInitialProps = async () => {
  const req = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await req.json()
  console.log(data)
  return { AppData: data.results }
}

export default LoginModal

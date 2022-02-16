import React, { useState, useContext } from 'react'
import { Layout, Menu, Row, Col, Modal } from 'antd'
import 'antd/dist/antd.css'
import FormInput from '../common/FormInput'
import { formInputStyles } from './styles'
import AppContext from 'context/appContext'
import * as LoginModalActions from 'actions/modalActions'

const { Header, Footer } = Layout

const PageHeader = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { renderLoginModal } = LoginModalActions

  const handleShowLoginModal = () => dispatch(renderLoginModal)

  const navigation = [{ id: 'Login' }, { id: 'nav 2' }, { id: 'nav 3' }]

  return (
    <Header>
      <Row>
        <Col span={18}></Col>

        <Col span={6}>
          <Menu
            theme="dark"
            mode="horizontal"
            //  defaultSelectedKeys={['2']}
          >
            <Menu.Item onClick={handleShowLoginModal}>Login</Menu.Item>

            <Menu.Item> nav a </Menu.Item>
            <Menu.Item> nav b </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  )
}

const PageFooter = () => {
  return <Footer>footer</Footer>
}

export const TESTCOMP1 = () => {
  return <h1>TESTCOMP1</h1>
}
export const TESTCOMP2 = () => {
  return <h1>TESTCOMP2</h1>
}

const PageLayout = ({ children }) => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { dismissLoginModal } = LoginModalActions

  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    dispatch(dismissLoginModal)
  }
  return (
    <Layout className={'Layout'}>
      <PageHeader />
      {children}

      {/* TODO move into own component */}
      <Modal
        title="Welcome to QuikSeek"
        visible={state.isLoginModalVisibile}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormInput placeholder={'enter email'} className={formInputStyles} />
        <FormInput
          isPasswordInput={true}
          className={formInputStyles}
          placeholder={'enter password'}
        />
      </Modal>

      <PageFooter />
    </Layout>
  )
}

export default PageLayout

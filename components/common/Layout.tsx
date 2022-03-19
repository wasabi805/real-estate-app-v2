import React, { useContext } from 'react'
import { Layout, Menu, Row, Col } from 'antd'
import 'antd/dist/antd.css'
import FormInput from '../common/FormInput'
import { formInputStyles } from './styles'
import AppContext from 'context/appContext'
import * as LoginModalActions from 'actions/modalActions'

import LoginModal from '@components/Modals/LoginModal'

const { Header, Footer } = Layout

const PageHeader = () => {
  const appContext = useContext(AppContext)
  const { dispatch } = appContext
  const { renderLoginModal } = LoginModalActions

  const handleShowLoginModal = () => dispatch(renderLoginModal())

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

interface IPageLayoutProps {
  children: JSX.Element[]
}

const PageLayout: React.FC<IPageLayoutProps> = ({ children }) => {
  return (
    <Layout className={'Layout'}>
      <PageHeader />
      {children}
      <LoginModal />
      <PageFooter />
    </Layout>
  )
}

export default PageLayout

import React, { useState } from 'react'
import { Layout, Menu, Row, Col, Modal } from 'antd'
import 'antd/dist/antd.css'
import FormInput from '../common/FormInput'
import {formInputStyles} from './styles'

const { Header, Footer } = Layout

const PageHeader = ({ showModal }) => {
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
            {Object.values(navigation).map((nav, idx) => {
              console.log(nav)
              const key = idx
              return (
                <Menu.Item
                  key={key}
                  onClick={showModal}
                >{`${nav.id}`}</Menu.Item>
              )
            })}
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
  const [isModalVisible, setIsModalVisible] = useState(false)
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
    <Layout className={'Layout'}>
      <PageHeader showModal={showModal} />
      {children}

      {/* TODO move into own component */}
      <Modal
        title="Welcome to QuikSeek"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
         
        <FormInput placeholder={'enter email'} className={formInputStyles} />
        <FormInput isPasswordInput={true} className={formInputStyles} placeholder={'enter password'} />
      </Modal>

      <PageFooter />
    </Layout>
  )
}

export default PageLayout

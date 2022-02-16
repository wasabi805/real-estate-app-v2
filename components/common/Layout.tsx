import React from 'react'
import { Layout, Menu, Row, Col } from 'antd'
import 'antd/dist/antd.css'

const { Header, Footer } = Layout

const PageHeader = () => {
  const navigation = [{ id: 'Login' }, { id: 'nav 2' }, { id: 'nav 3' }]

  return (
    <Header>
      <Row>
        <Col span={20}></Col>

        <Col span={4}>
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
                  onClick={() => alert('hi')}
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
  return (
    <Layout className={'Layout'}>
      <PageHeader />
      {children}
      <PageFooter />
    </Layout>
  )
}

export default PageLayout

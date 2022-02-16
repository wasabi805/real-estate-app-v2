import React from 'react'
import { Layout, Menu } from 'antd'
import 'antd/dist/antd.css'

const { Header, Footer } = Layout

const PageHeader = () => {
  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        //  defaultSelectedKeys={['2']}
      >
        {new Array(3).fill(null).map((_, index) => {
          const key = index + 1
          return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>
        })}
      </Menu>
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

import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { Table, Tag, Space } from 'antd'
import 'antd/dist/antd.css'

const ListingTable = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults } = state
  console.log(searchResults, 'searchResults')

  const columns = [
    {
      title: 'Adddress',
      dataIndex: 'address',
      key: 'address',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Beds',
      dataIndex: 'beds',
      key: 'beds',
    },
    {
      title: 'Baths',
      key: 'baths',
      dataIndex: 'baths',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]

  const people = [
    {
      key: '1',
      price: '$1,7000,000',
      beds: 32,
      address: 'New York No. 1 Lake Park',
      baths: 333,
    },
    {
      key: '2',
      name: 'Ted DiBiase',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Bret Heart',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },

    {
      key: '4',
      name: 'Rody Piper',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '5',
      name: 'Jim Hacksaw Duggan',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '6',
      name: 'Randy Macho Man-Bonesaw Savage',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },

    {
      key: '7',
      name: 'Brutus Beefcake',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },

    {
      key: '8',
      name: 'Andre the Giant',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },

    {
      key: '9',
      name: 'Junkyard Dog',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },

    {
      key: '10',
      name: 'Ultimate Warrior',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]
  return (
    <>
      <Table columns={columns} dataSource={people} />
    </>
  )
}

export default ListingTable

import React from 'react'
import { Table, Tag, Space } from 'antd'
import 'antd/dist/antd.css'

const ListingTable = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
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

  const data = [
    {
      key: '1',
      name: 'Ric Flair',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
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
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default ListingTable

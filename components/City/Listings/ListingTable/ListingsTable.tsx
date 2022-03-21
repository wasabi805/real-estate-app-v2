import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { Table, Tag, Space } from 'antd'
import 'antd/dist/antd.css'
import {ListingsTableContainer} from 'components/City/Listings/ListingTable/styles'

const ListingsTable = () => {
  const appContext = useContext(AppContext)
  const { state } = appContext
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
  ]

  const people = [
    {
      key: '1',
      price: '$1,7000,000',
      beds: 32,
      address: 'New York No. 1 Lake Park',
      baths: 333,
    },

  ]
  return (
   
      <Table className='START-HERE-TABLE' columns={columns} dataSource={people} />

  )
}

export default ListingsTable

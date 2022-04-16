import React, { useContext, useState } from 'react'
import AppContext from 'context/appContext'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import {
  ForSaleRentSoldContainer,
  SoldRadioWrapper,
} from 'components/City/FilterDropdownsRow/FilterComponents/ForSaleRentSold/styles'

const columns = [
  {
    title: 'Listing Category',
    dataIndex: 'listingFilterCategory',
  },
]

const data = [
  {
    key: 'listing-filter-forSale',
    listingFilterCategory: 'For sale',
  },
  {
    key: 'listing-filter-forRent',
    listingFilterCategory: 'For rent',
    // age: 42,
    // address: 'London No. 1 Lake Park',
  },
] // rowSelection object indicates the need for row selection

const data2 = [
  {
    key: 'listing-filter-sold',
    listingFilterCategory: 'Sold',
  },
]

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
// };

//  -----------------------------------------------------------------

const ForSaleRentSold = () => {
  const { state, dispatch } = useContext(AppContext)

  const handleOnChange = (e) => {
    const { value, checked } = e.target
    console.log('what is e?', { value, checked })
  }

  const [selectedKeys, setSelectedKeys] = React.useState([])

  const myRowSelection = {
    selectedRowKeys: selectedKeys,
    onSelect: (record, selected) => {
      console.log(record)
    },
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows:!!!! ',
        selectedRows
      )
      setSelectedKeys([
        {
          key: 'listing-filter-forSale',
          listingFilterCategory: 'For sale',
        },
      ])
    },
  }

  return (
    <ForSaleRentSoldContainer>
      <Table
        pagination={false}
        showHeader={false}
        rowSelection={{
          type: 'radio',
          ...myRowSelection,
        }}
        columns={columns}
        dataSource={data}
        onRow={(record, rowIndex) => ({
          onClick: () => {
            setSelectedKeys([record.key])
          },
        })}
        onChange={() => {
          console.log('change!!!')
        }}
      />

      <SoldRadioWrapper>
        <Table
          pagination={false}
          showHeader={false}
          rowSelection={{
            type: 'radio',
            ...myRowSelection,
          }}
          columns={columns}
          dataSource={data2}
          onRow={(record, rowIndex) => ({
            onClick: () => {
              setSelectedKeys([record.key])
            },
          })}
          onChange={() => {
            console.log('change!!!')
          }}
          expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>hello</p>,
            rowExpandable: (record) => record.level !== '3',
            onExpand: (expanded, record) =>
              console.log('onExpand: ', record, expanded),
          }}
        />
      </SoldRadioWrapper>
    </ForSaleRentSoldContainer>
  )
}

export default ForSaleRentSold

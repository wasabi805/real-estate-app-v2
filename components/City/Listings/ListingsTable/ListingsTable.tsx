import React, { useContext, useState, useEffect } from 'react'
import AppContext from 'context/appContext'
import * as ListingsTableActions from 'actions/listingsTableActions'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import { ListingsTableContainer } from 'components/City/styles'
import { columnNames } from './columnNames'

const { setClickedRow } = ListingsTableActions

const ListingsTable = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults } = state

  const { listings } = searchResults.data

  const homeListings = listings.map((home) => {
    const { property_id, price, beds, address, baths } = home
    return {
      key: property_id,
      address: address,
      price: price,
      beds: beds,
      baths: baths,
    }
  })

  const [selectedRowKeys, setSelectedRowKey] = useState([])

  const selectRow = (record) => {
    const currentSelectedHome = [...selectedRowKeys]
    if (currentSelectedHome.indexOf(record.key) >= 0) {
      let selectedPropertyRow = currentSelectedHome.splice(
        selectedRowKeys.indexOf(record.key),
        0
      )
      setSelectedRowKey(selectedPropertyRow)
    } else {
      setSelectedRowKey([record.key])
    }
  }
  useEffect(() => {
    console.log('what is state.listingTable', state.listingTable)
  }, [])

  useEffect(() => {
    console.log('the selected row key', selectedRowKeys)
    if (selectedRowKeys.length > 0) {
      dispatch(setClickedRow(selectedRowKeys))
    }
  }, [selectedRowKeys])

  const onSelectedRowKeysChange = (selectedRowKeys) => {
    setSelectedRowKey(selectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  }

  return (
    <ListingsTableContainer>
      <Table
        columns={columnNames}
        dataSource={homeListings}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => {
            selectRow(record)
          },
        })}
      />
    </ListingsTableContainer>
  )
}

export default ListingsTable

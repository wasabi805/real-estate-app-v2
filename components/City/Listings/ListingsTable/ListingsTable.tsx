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

  /* NOTE: This adds custom functionality for the highlighting added to a table row in Ant Design when a table row is clicked since Ant Design provides no such 
  functionality out of the box for a table row to become highlighted/foccused. 
  It also removes the default radio button required which is typical for this type of radio selection behavior. */
  const [selectedRowKey, setSelectedRowKey] = useState('')
  const selectRow = (record) => {
    const currentSelectedHome = selectedRowKey
    // do not replace if it's the same row clicked again
    if (currentSelectedHome.indexOf(record.key) === 0) {
      setSelectedRowKey(currentSelectedHome)
    } else {
      // replace the current with the new table row clicked
      setSelectedRowKey([record.key])
    }
  }

  useEffect(() => {
    if (selectedRowKey.length > 0) {
      dispatch(setClickedRow(selectedRowKey))
    }
  }, [selectedRowKey])

  const onSelectedRowKeysChange = (selectedRowKeys) => {
    setSelectedRowKey(selectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys: selectedRowKey,
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

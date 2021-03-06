import React, { useContext, useState, useEffect } from 'react'
import AppContext from 'context/appContext'
import * as ListingsActions from 'actions/ListingsActions'

import { Table } from 'antd'
import 'antd/dist/antd.css'
import { ListingsTableContainer } from 'components/City/styles'
import { columnNames } from './columnNames'

const { setClickedRow } = ListingsActions

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

  interface Irecord {
    key: string
  }
  /* NOTE: This adds custom functionality for the highlighting added to a table row in Ant Design 
  when a table row is clicked since Ant Design provides no such functionality out of the box 
  for a table row to become highlighted/foccused. 
  It also removes the default required radio button which is typical for this type of radio selection behavior. */
  const [selectedRowKey, setSelectedRowKey] = useState(
    state.listings.currentHome
  )
  const selectRow = (record: Irecord) => {
    const currentSelectedHome = selectedRowKey
    // do not replace if the same row clicked again.
    if (currentSelectedHome.indexOf(record.key) === 0) {
      setSelectedRowKey(currentSelectedHome)
    } else {
      // replace the current displayed home with the new home when a different table row is clicked.
      setSelectedRowKey([record.key])
    }
  }
  const onSelectedRowKeysChange = (selectedRowKeys: string[]) => {
    setSelectedRowKey(selectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys: selectedRowKey,
    onChange: onSelectedRowKeysChange,
  }

  /* Dispatches action to reducer when a row is is clicked and home is selected for display at the top of the table  */
  useEffect(() => {
    if (selectedRowKey !== ['']) {
      dispatch(setClickedRow(selectedRowKey))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowKey])

  // sets a deafult home to load in SelectedHome component
  // useEffect(() => {
  //   let initialHome
  //   if (state.searchResults.initialData.length > 0) {
  //     initialHome = state.searchResults.initialData[0].property_id
  //     dispatch(setClickedRow(initialHome))
  //   }
  // }, [])

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

export default React.memo(ListingsTable)

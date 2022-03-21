import React, { useContext , useState, useEffect} from 'react'
import AppContext from 'context/appContext'
import { Table, Radio} from 'antd'
import 'antd/dist/antd.css'
import {ListingsTableContainer} from 'components/City/styles'
import { columnNames } from './columnNames'

const ListingsTable = () => {
  const appContext = useContext(AppContext)
  const { state } = appContext
  const { searchResults } = state
  console.log(searchResults, 'searchResults')
  const {listings} = searchResults.data

  

  const homeListings = listings.map( home=>{
    const {property_id, price, beds, address, baths} =home
    return{
      key: property_id,
      address: address,
      price: price,
      beds: beds,
      baths: baths,
    }
  })

  const [selectedRowKeys, setSelectedRowKey] = useState([]);

  const selectRow = (record) => {
    const allProperties = [...selectedRowKeys];
    if (allProperties.indexOf( record.key ) >= 0) {
      let selectedPropertyRow = allProperties.splice(selectedRowKeys.indexOf(record.key), 0);
      setSelectedRowKey(selectedPropertyRow)
    } else {
      setSelectedRowKey([record.key]);
    }
  }

  useEffect(()=>{
    console.log('the selected row key' , selectedRowKeys)
  },[selectedRowKeys])
  
  const onSelectedRowKeysChange =(selectedRowKeys)=>{
    setSelectedRowKey(selectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };


  return (
    <ListingsTableContainer>
      <Table className='foo'
      columns={columnNames} 
      dataSource={homeListings}
    
      rowSelection={rowSelection}  
      onRow={(record) => ({
        onClick: () => {
          selectRow(record);
        },
      })}
      />
      
    </ListingsTableContainer>
  )
}

export default ListingsTable

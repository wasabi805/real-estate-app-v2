import React, { useContext , useState, useEffect} from 'react'
import AppContext from 'context/appContext'
import { Table, Radio} from 'antd'
import 'antd/dist/antd.css'
import { columnNames } from './Listings/ListingTable/columnNames'

const ListingTable = () => {
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
    console.log('what is record', record)
    const test = [...selectedRowKeys];
    if (test.indexOf(record.key) >= 0) {
      alert('this is true')
      let x = test.splice(selectedRowKeys.indexOf(record.key), 0);
      console.log('what is x?? ', x)
      setSelectedRowKey(x)
    } else {
      alert('this is false')
      console.log(record.key)
      setSelectedRowKey([...selectedRowKeys, record.key]);
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
    <>
      <Table 
      columns={columnNames} 
      dataSource={homeListings}
    
      rowSelection={rowSelection}  
      onRow={(record) => ({
        onClick: () => {
          selectRow(record);
        },
      })}
      />
      
    </>
  )
}

export default ListingTable

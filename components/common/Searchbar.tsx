import React from 'react'
import 'antd/dist/antd.css'
import { Input } from 'antd'

const { Search } = Input

const Searchbar = ({ name, value, placeHolder, onChange, onSearch }) => {
  return (
    <>
      <Search
        id="autocomplete"
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        enterButton
      />
    </>
  )
}

export default Searchbar

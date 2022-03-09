import React from 'react'
import 'antd/dist/antd.css'
import { Input } from 'antd'

const { Search } = Input

interface ISearchbarProps {
  name: string
  value: string
  placeHolder: string
  onChange: () => void
  onSearch: () => void
}

const Searchbar: React.FC<ISearchbarProps> = ({
  name,
  value,
  placeHolder,
  onChange,
  onSearch,
}) => {
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

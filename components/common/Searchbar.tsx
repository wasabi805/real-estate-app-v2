import React from 'react'
import 'antd/dist/antd.css'
import { Input } from 'antd'

const { Search } = Input

interface ISearchbarProps {
  id?: string
  name?: string
  value?: string
  placeHolder?: string
  onChange?: () => void
  onSearch?: () => void
}

const Searchbar: React.FC<ISearchbarProps> = ({
  id,
  name,
  value,
  placeHolder,
  onChange,
  onSearch,
}) => {
  return (
    <>
      <Search
        id={id}
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

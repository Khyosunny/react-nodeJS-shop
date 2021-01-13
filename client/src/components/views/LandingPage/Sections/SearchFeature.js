import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input

function SearchFeature({ refreshFunction }) {
  const [SearchTerm, setSearchTerm] = useState('')

  const searchHandler = e => {
    setSearchTerm(e.currentTarget.value)
    refreshFunction(e.currentTarget.value)
  }
  return (
    <React.Fragment>
      <Search
        placeholder="input search text"
        onChange={searchHandler}
        value={SearchTerm}
        style={{ width: 200 }}
      />
    </React.Fragment>
  )
}

export default SearchFeature

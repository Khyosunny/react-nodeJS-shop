import React, { useState } from 'react'
import { Collapse, Radio } from 'antd'

const { Panel } = Collapse

function RadioBox({ list, handleFilters }) {
  const [Value, setValue] = useState(0)

  const renderRadioBox = () =>
    list &&
    list.map(item => (
      <Radio key={item._id} value={item._id}>
        {item.name}
      </Radio>
    ))

  const handleChange = e => {
    setValue(e.target.value)
    handleFilters(e.target.value)
  }

  return (
    <React.Fragment>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </React.Fragment>
  )
}

export default RadioBox

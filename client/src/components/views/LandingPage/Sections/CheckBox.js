import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd'

const { Panel } = Collapse

function CheckBox({ list, handleFilters }) {
  const [Checked, setChecked] = useState([])

  const handleToggle = value => {
    //누른 것의 index를 구하고
    const currentIndex = Checked.indexOf(value)
    //전체 Checked된 State에서 현재 누른 CheckBox가 이미 있다면
    const newChecked = [...Checked]
    //State 넣어준다.
    if (currentIndex === -1) {
      newChecked.push(value)
      //빼주고
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
    handleFilters(newChecked)
  }

  const renderCheckBoxLists = () => {
    return (
      list &&
      list.map((item, index) => (
        <React.Fragment key={index}>
          <Checkbox
            onChange={() => handleToggle(item._id)}
            checked={Checked.indexOf(item._id) === -1 ? false : true}
          />
          <span>{item.name}</span>
        </React.Fragment>
      ))
    )
  }

  return (
    <React.Fragment>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Continent" key="1">
          {renderCheckBoxLists()}
        </Panel>
      </Collapse>
    </React.Fragment>
  )
}

export default CheckBox

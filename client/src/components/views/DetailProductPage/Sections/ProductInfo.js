import React from 'react'
import { Descriptions, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../../_actions/user_actions'

function ProductInfo({ detail }) {
  const dispatch = useDispatch()
  const clickHandler = () => {
    //필요한 정보를 카트필드에 넣어둔다
    dispatch(addToCart(detail._id))
    console.log('ddd')
  }

  return (
    <div>
      <Descriptions title="Product Info" bordered>
        <Descriptions.Item label="Price">{detail.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {detail.description}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductInfo
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
import { Empty } from 'antd'

function CartPage({ user }) {
  const dispatch = useDispatch()

  const [Total, setTotal] = useState(0)
  const [ShowTotal, setShowTotal] = useState(false)

  useEffect(() => {
    let cartItems = []

    //리덕스 User state 안에 cart 안에 상품이 들어있는지 확인
    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id)
        })
        dispatch(getCartItems(cartItems, user.userData.cart)).then(response => {
          calculateTotal(response.payload)
        })
      }
    }
  }, [user.userData])

  let calculateTotal = cartDetail => {
    let total = 0
    cartDetail.map(item => {
      total += parseInt(item.price, 10) * item.quantity
    })
    setTotal(total)
    setShowTotal(true)
  }

  let removeFromCart = productId => {
    dispatch(removeCartItem(productId)).then(response => {
      if (response.payload.productInfo.length <= 0) {
        setShowTotal(false)
      }
    })
  }

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock products={user.cartDetail} removeItem={removeFromCart} />
      </div>

      {ShowTotal ? (
        <div style={{ marginTop: '3rem' }}>
          <h2>Total Amount: ${Total}</h2>
        </div>
      ) : (
        <>
          <br />
          <Empty />
        </>
      )}
    </div>
  )
}

export default CartPage

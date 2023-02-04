import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext>
    {value => {
      const {cartList} = value
      let totalQuantity = 0
      let totalPrice = 0
      const eachQuantity = cartList.map(each => each.quantity)
      const eachPrice = cartList.map(each => each.price)

      for (let i = 0; i < eachQuantity.length; i += 1) {
        totalQuantity += parseInt(eachQuantity[i])
        totalPrice += parseInt(eachPrice[i] * eachQuantity[i])
      }

      return (
        <div className="cart-summary-container">
          <h1 className="summ-heading">
            Order Total: <span className="bill-span">Rs. {totalPrice} /- </span>
          </h1>
          <p className="quantity">{totalQuantity} items in cart</p>
          <button className="checkout-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext>
)

export default CartSummary

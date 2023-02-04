import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    if (cartList.length !== 0) {
      for (let i = 0; i < cartList.length; i += 1) {
        if (cartList[i].id === product.id) {
          cartList[i].quantity += product.quantity
          this.setState({cartList})
        } else {
          this.setState(prevState => ({
            cartList: [...prevState.cartList, product],
          }))
        }
      }
    }
    if (cartList.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newList = cartList.filter(item => item.id !== id)
    this.setState({cartList: newList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    for (let i = 0; i < cartList.length; i += 1) {
      if (cartList[i].id === id) {
        cartList[i].quantity += 1
        this.setState({cartList})
      }
    }
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    for (let i = 0; i < cartList.length; i += 1) {
      if (cartList[i].id === id) {
        if (cartList[i].quantity > 0) {
          cartList[i].quantity -= 1
          this.setState({cartList})
        } else {
          this.removeCartItem(id)
        }
      }
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

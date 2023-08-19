import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { addToCart, updateCartQuantity } from '../../utils/actions'; // Import your Redux action creators
import { idbPromise } from '../../utils/helpers';
import { pluralize } from '../../utils/helpers';

function ProductItem(item) {
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const cart = useSelector(state => state.cartReducer.cart); // Access cart state from Redux store

  const { image, name, _id, price, quantity } = item;

  const addToCartHandler = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch(updateCartQuantity(_id, parseInt(itemInCart.purchaseQuantity) + 1)); // Use the action creator to update cart quantity
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch(addToCart({ ...item, purchaseQuantity: 1 })); // Use the action creator to add to cart
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize('item', quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCartHandler}>Add to cart</button>
    </div>
  );
}

export default ProductItem;

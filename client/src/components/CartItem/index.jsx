import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../../utils/actions'; // Import your Redux action creators
import { idbPromise } from '../../utils/helpers';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (itemId) => {
    dispatch(removeFromCart(itemId)); // Use the action creator to remove item from cart
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch(removeFromCart(item._id)); // Use the action creator to remove item from cart
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch(updateCartQuantity(item._id, parseInt(value))); // Use the action creator to update cart quantity
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCartHandler(item._id)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

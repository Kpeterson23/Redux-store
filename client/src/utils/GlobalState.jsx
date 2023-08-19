export { StoreProvider, useStoreContext };
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;

import { useSelector, useDispatch } from 'react-redux'; // Import the necessary hooks
import { createStore, combineReducers } from 'redux'; // You can import these if needed

// Replace useStoreContext with useSelector and useDispatch
const useStoreContext = () => {
  return {
    state: useSelector(state => state),
    dispatch: useDispatch(),
  };
};

export { useStoreContext };

// Remove StoreProvider component

// In your index.js or App.js, use the Provider component from react-redux
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store

// ...
<Provider store={store}>
  {/* Your components */}
</Provider>

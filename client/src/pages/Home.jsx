import React from "react";
import { useSelector } from "react-redux"; // Import Redux hook
import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const Home = () => {
  const state = useSelector(state => state.productReducer); // Access state from Redux store

  return (
    <div className="container">
      <CategoryMenu />
      <ProductList products={state.products} /> {/* Pass products as prop */}
      <Cart />
    </div>
  );
};

export default Home;

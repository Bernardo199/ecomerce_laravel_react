import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./global_api/GlobalApi";
import Content from "./layouts/Content/Content";
import Header from "./layouts/Header/Header";

function App() {

    // define products from cart
    const [productsCart, setProductsCart] = useState([]);

    // get data cart
    const getProductsCart = async () => {
      await axios.get(`${API_URL}/cart`)
          .then(response => {
              const data = response.data.data;
              setProductsCart(data);
          })
          .catch(err => {
              console.log(err);
          })
  }

  useEffect(() => {
    getProductsCart();
  }, [])

  return (
    <div className="App" style={{ height: '200vh' }}>
     <Header productsCart={productsCart} getProductsCart={getProductsCart} />
     <Content getProductsCart={getProductsCart} />
    </div>
  );
}

export default App;

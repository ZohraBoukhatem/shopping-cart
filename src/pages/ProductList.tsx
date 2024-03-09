import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import "./ProductList.css";
import useLocalStorageState from "use-local-storage-state";
import Loader from "../components/Loader";

const API_URL = "https://dummyjson.com/products";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  image: string;
  quantity: number;
};

export interface Props {
  [productId: string]: Product;
}

const ProductList: FunctionComponent = () => {
  const [list, setList] = useState<Product[]>([]);
  const [cart, setCart] = useLocalStorageState<Props>("cart", {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setList(response.data.products);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.log("error fetching API data");
      });
  }, []);

  const addToCart = (product: Product): void => {
    product.quantity = 1;
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: product,
    }));
    console.log("added", product.id);
  };

  const removeFromCart = (product: Product): void => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[product.id];
      return updatedCart;
    });
  };

  const isInCart = (productId: number): boolean =>
    Object.keys(cart || {}).includes(productId.toString());

  return (
    <div className="productList-page">
      {loading ? (
        <div className="container">
          <Loader />
        </div>
      ) : (
        <div className="container">
          {list.map((product) => {
            return (
              <div key={product.id} className="product">
                <img src={product.thumbnail} alt="product image" />
                <h3>{product.title}</h3>
                <p>Price: {product.price} €</p>
                {isInCart(product.id) ? (
                  <button
                    onClick={() => {
                      removeFromCart(product);
                    }}
                  >
                    remove from cart
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addToCart(product);
                    }}
                  >
                    add to cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;

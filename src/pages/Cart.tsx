import { FunctionComponent, useMemo } from "react";
import useLocalStorageState from "use-local-storage-state";
import { Props } from "./ProductList";
import { useNavigate } from "react-router-dom";

const Cart: FunctionComponent = () => {
  const [cart, setCart] = useLocalStorageState<Props>("cart", {});

  const navigate = useNavigate();

  const count: number = Object.keys(cart || {}).length;

  const getProducts = () => Object.values(cart || {});

  const removeProduct = (productId: number): void => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const total = useMemo(() => {
    return getProducts().reduce((acc, curr) => acc + curr.price, 0);
  }, [cart]);

  return (
    <div className="cart-page">

<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>      
<h1>Your cart</h1>
      {count ? (
        <div>
          <div className="container">
            {getProducts().map((product) => {
              return (
                <div key={product.id} className="product">
                  <img src={product.thumbnail} alt="product image" />
                  <h3>{product.title}</h3>
                  <p>Price: {product.price} €</p>
                  <button
                    onClick={() => {
                      removeProduct(product.id);
                    }}
                  >
                    Remove from cart
                  </button>
                </div>
              );
            })}
          </div>
          <p>Total: {total} €</p>
        </div>
      ) : (
        <div className="container">
          <div className="product">
            <p>Currently there are no items in your cart</p>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Add some?
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

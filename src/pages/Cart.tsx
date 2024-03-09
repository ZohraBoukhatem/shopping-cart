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
                    remove from cart
                  </button>
                </div>
              );
            })}
          </div>
          <p>total: {total} €</p>
        </div>
      ) : (
        <div className="container">
          <div className="product">
            <p>Currently there are no items in cart</p>
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

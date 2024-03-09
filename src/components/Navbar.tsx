import { Link } from "react-router-dom";
import { FunctionComponent } from "react";
import "../App.css";
import useLocalStorageState from "use-local-storage-state";
import { Props } from "../pages/ProductList";

const Navbar: FunctionComponent = () => {
  const [cart] = useLocalStorageState<Props>("cart", {});
  const count: number = Object.keys(cart || {}).length;

  return (
    <nav>
      <header>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/cart">Cart: {count}</Link>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;

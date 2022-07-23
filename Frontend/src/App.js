import "./App.css"
import Home from "./pages/home/Home";
// import Profile from "./pages/Profile/Profile";
// import Auth from "./pages/Auth/Auth";
import { Navigate, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux";
import AddProduct from "./components/admin/addProduct/AddProduct";
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import Signup from "./components/auth/Signup";
import Product from "./components/Product-details/Product";

function App() {
  // const user = useSelector((state) => state.authReducer.authData)
  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/addProcuct"
          element={<AddProduct />}
        />
        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
          path="/orders"
          element={<Orders />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/view/:productId"
          element={<Product />}
        />
      </Routes>
    </div>
  );
}

export default App;

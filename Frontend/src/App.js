import "./App.css"
import Home from "./pages/home/Home";
// import Profile from "./pages/Profile/Profile";
// import Auth from "./pages/Auth/Auth";
import { Navigate, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux";
import AddProduct from "./components/admin/addProduct/AddProduct";
import Cart from "./components/cart/Cart";
import Orders_admin from "./components/admin/Order_Dashboard/Orders";
import Signup from "./components/auth/Signup";
import Product from "./components/Product-details/Product";
import Orders from "./components/orders/Orders_admin";
import User_Analytics from "./components/admin/User Analytics/User_Analytics";
import Messenger from "./components/messenger/Messenger";
import Footer from "./components/footer/Footer";

function App() {
  // const user = useSelector((state) => state.authReducer.authData)
  return (
    <div className="App manage-main">
      {/* <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div> */}
      <Routes>
        <Route
          exact path="/"
          element={<Home />}
        />
        <Route
          exact path="/addProcuct"
          element={<AddProduct />}
        />
        <Route
          exact path="/cart"
          element={<Cart />}
        />
        <Route
          exact path="/orders"
          element={<Orders />}
        />
        <Route
          exact path="/signup"
          element={<Signup />}
        />
        <Route
          exact path="/view/:productId"
          element={<Product />}
        />
        <Route
          exact path="/users_Orders"
          element={<Orders_admin />}
        />
        <Route
          exact path="/user_analytics"
          element={<User_Analytics />}
        />
        <Route
          exact path="/chats"
          element={<Messenger />}
        />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector} from "react-redux";
import NewProduct from "./pages/NewProduct";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrderPage";
import AdminDashboard from "./pages/AdminDashboard";
import EditProductPage from "./pages/EditProductPage";
import { io } from "socket.io-client";
import { addNotification } from "./features/userSlice";
// thse two imports for global theme
import { createContext, useEffect, useState } from "react";

// define context
export const ThemeContext = createContext();

function App() {
  
  // define theme-state and change theme fnc
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const contextValue = { theme, toggleTheme }; // props to send
  // -------------------------------------------------------------//

  // get the current user logged-in
  const user = useSelector((state) => state.user);
  // -------------------------------------------------------------//

  // Set up socket io
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("ws://localhost:4000");

    // order-shipped notification (for client)
    socket.off("notification").on("notification", (msgObj, user_id) => {
        if (user_id === user._id) {
            dispatch(addNotification(msgObj)); // send to userSlice
        }
    });

    // new-order notification (for admin)
    socket.off("new-order").on("new-order", (msgObj) => {
        if (user.isAdmin) {
          console.log(msgObj)
            dispatch(addNotification(msgObj));
        }
    });

}, []);




  return (
    <ThemeContext.Provider value={contextValue}>
      <div className="App" id={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <Navigation />

          {/* Define routes */}
          <Routes>
            <Route index element={<Home />} />

            {!user && ( // only show these pages when there is no user(conditional rendering)
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}

            {user && (
              <>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </>
            )}

            {user && user.isAdmin && (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/product/:id/edit" element={<EditProductPage />} />
              </>
            )}

            <Route path="/new-product" element={<NewProduct />} />

            <Route path="/product/:id" element={<ProductPage />} />

            <Route path="/category/:category" element={<CategoryPage />} />

            {/* if there is a user logged-in => only show home page even the url is /signup or /login */}
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

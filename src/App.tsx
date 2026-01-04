import { BrowserRouter, Route , Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Home/>}/> 
      <Route path = "/cart" element={<Cart/>}/> 
      <Route path = "/:productID" element={<ProductDetails/>}/> 
    </Routes>
    </BrowserRouter>
  )
}

export default App

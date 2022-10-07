import "./App.css";
import Header from "./components/layouts/header/header";
import Cart from "./components/form/cart/cart"
import AccountInfo from "./components/form/account-info/account-info"
import contact from "./components/form/contact/contact";
import Footers from "./components/layouts/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./components/form/index.js"

function App() {
  return (
    <>
      <Header />
      {/* <Footers></Footers> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;

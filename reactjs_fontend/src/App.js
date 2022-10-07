import "./App.css";

import Footers from "./components/layouts/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Login} from "./components/form/index.js"

function App() {
  return (
    <>
      {/* <Header></Header> */}
      {/* <Footers></Footers> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LayOut from "./pages/LayOut";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

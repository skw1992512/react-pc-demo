import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import LayOut from "@/pages/LayOut";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

import { AuthComponent } from "@/components/AuthComponent";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthComponent>
              <LayOut />
            </AuthComponent>
          }
        >
          <Route index element={<Home />}></Route>
          <Route path="article" element={<Article />}></Route>
          <Route path="publish" element={<Publish />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

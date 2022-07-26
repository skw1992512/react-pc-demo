import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";

import { history } from "@/utils/history";
import Login from "@/pages/Login";
import LayOut from "@/pages/LayOut";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

import { AuthComponent } from "@/components/AuthComponent";

export default function App() {
  return (
    <HistoryRouter history={history}>
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
    </HistoryRouter>
  );
}

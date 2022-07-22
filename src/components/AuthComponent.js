//判断token是否存在
import { Navigate } from "react-router-dom";

import { getToken } from "@/utils";

function AuthComponent({ children }) {
  const isToken = getToken();
  if (isToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export { AuthComponent };

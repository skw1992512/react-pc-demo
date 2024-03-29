import { makeAutoObservable } from "mobx";

import { http, setToken, getToken, removeToken } from "../utils";

class LoginStore {
  token = getToken() || "";
  constructor() {
    makeAutoObservable(this);
  }
  getToken = async ({ mobile, code }) => {
    //请求登录接口
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    //设置token
    this.token = res.data.data.token;
    // console.log(this.token);
    // 存入localStorage
    setToken(this.token);
  };
  loginOut = () => {
    this.token = "";
    removeToken();
  };
}

export default LoginStore;

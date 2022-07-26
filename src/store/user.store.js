import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class UserStore {
  userInfo = {};
  constructor() {
    makeAutoObservable(this);
  }
  getUserInfo = async () => {
    //调用接口数据
    const res = await http.get("/user/profile");
    this.userInfo = res.data.data;
    // console.log(this.userInfo);
  };
}

export default UserStore;

import { makeAutoObservable } from "mobx";

class ChannelStore {
  channelList = [];
  constructor() {
    makeAutoObservable(this);
  }
}

export default ChannelStore;

import { makeAutoObservable } from "mobx";

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.user = user;
  }

  get isAuthenticated() {
    return !!this.user;
  }
}

export default new UserStore();

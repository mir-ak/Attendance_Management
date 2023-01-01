class AuthContext {
  constructor() {
    this.authenticated = true;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new AuthContext();

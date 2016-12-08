const ROLES = {
  '1MG_ADMIN': '1MG_ADMIN',
  FINANCE: 'FINANCE',
  VENDOR: 'VENDOR'
};

class Auth {
  login(user) {
    localStorage.token = user.authentication_token;
    localStorage.roles = JSON.stringify(user.roles.recon);
    localStorage.username = user.username;
    localStorage.verified = user.verified;
    localStorage.suspended = user.suspended;
  }

  getRoles() {
    let roles = [];

    if (localStorage.roles) {
      roles = JSON.parse(localStorage.roles);
    }
    return roles;
  }

  getToken() {
    return localStorage.token;
  }

  isAdmin() {
    return this.getRoles().indexOf(ROLES['1MG_ADMIN']) >= 0;
  }

  isVendor() {
    return this.getRoles().indexOf(ROLES.VENDOR) >= 0;
  }

  isFinance() {
    return this.getRoles().indexOf(ROLES.FINANCE) >= 0;
  }


  logout(cb) {
    localStorage.clear();

    if (cb) cb();
    this.onChange(false);
  }

  loggedIn() {
    const status = (!!localStorage.token && localStorage.suspended === 'false');
    return status;
  }

  onChange() {
  }
}

export default new Auth();

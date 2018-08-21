class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     * @param {string} token
     */
    static authenticateUser(token, id) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
    }
  
    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     * @returns {boolean}
     */
    static isUserAuthenticated() {
      return localStorage.getItem('token') !== null;
    }
  
    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     */
    static deauthenticateUser() {
      let keysToRemove = ["token", "userId"];
      keysToRemove.forEach(k => localStorage.removeItem(k));
    }
  
    /**
     * Get a token value.
     * @returns {string}
     */
  
    static getToken() {
      let token = localStorage.getItem('token');
      return token;
    }

    static getId() {
      let id = localStorage.getItem("userId");
      return id;
    }
  
  }
  
  export default Auth;
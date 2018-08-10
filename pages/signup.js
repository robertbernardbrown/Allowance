import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class SignupPage extends PolymerElement {
  static get template() {
    return html`
      <style>
        main {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        main > form > * {
          display:flex;
          flex: 1 auto;
          justify-content: center;
          font-size: 2em;
        }
      </style>

      <main id="sign-up">
        <form>
          <label for="uname"><b>Username</b></label>
          <input id="uname" type="text" placeholder="Enter Username" name="uname" required>
      
          <label for="email"><b>Email</b></label>
          <input id="email" type="email" placeholder="Enter Email" name="email" required>  

          <label for="psw"><b>Password</b></label>
          <input id="pwd" type="password" placeholder="Enter Password" name="psw" required>
          
          <button on-click="signUp" id="submit-btn" type="submit">Sign-Up</button>
        </form>
      </main>
    `;
  }

  signUp () {
    let uname, email, pwd;
    uname = document.getElementById("uname");
    email = document.getElementById("email");
    pwd   = document.getElementById("pwd");
    console.log(uname, email, pwd)
  }
 
  constructor() {
    super();
  }
}

customElements.define('signup-page', SignupPage);
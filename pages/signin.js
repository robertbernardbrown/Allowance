import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class SigninPage extends PolymerElement {
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
        <input type="text" placeholder="Enter Username" name="uname" required>
    
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required>
        
        <button id="submit-btn" type="submit">Sign-In</button>

        </form>
    </main>
    `;
  }
 
  constructor() {
    super();
  }
}

customElements.define('signin-page', SigninPage);
import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import Auth from "./utils/Auth.js";

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
        }
        #hide-response {
            display: none
        }
        #display-response {
            display: block
        }
    </style>

    <main id="sign-up">
        <form>
            <paper-input label="email" value={{email}} required error-message="Field is required">
                <iron-icon icon="supervisor-account" slot="prefix"></iron-icon>
            </paper-input>

            <paper-input label="password" type="password" value={{password}} required error-message="Field is required">
                <iron-icon icon="lock" slot="prefix"></iron-icon>
            </paper-input>
        
            <paper-button on-click="signIn" id="submit-btn" type="submit" raised>Sign-In</paper-button>
        </form>

        <paper-toast id="toast" text="{{message}}"></paper-toast>
    </main>
    `;
  }

  static get properties() {
    return {
      email: {
        type: String
      },
      password: {
        type: String
      },
      signInStatus: {
        type: Boolean,
        value: false
      },
      token: String
    };
  }

  signIn(e) {
    e.preventDefault();

    const registerUser = (url = ``, data = {}) => {
      return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
    };

    registerUser("https://allowance-api.herokuapp.com/api/login", {
      userEmail: this.email,
      userPassword: this.password
    }).then(res => res.json()).then(data => {
      this.message = data.message;
      this.$.toast.open();
      Auth.authenticateUser(data.token);
      this.signInStatus = true;
    }).catch(err => console.log(err));
  }

  constructor() {
    super();
  }

}

customElements.define('signin-page', SigninPage);
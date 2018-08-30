import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import "../node_modules/@polymer/paper-input/paper-input.js";
import "../node_modules/@polymer/iron-icon/iron-icon.js";
import "../node_modules/@polymer/iron-icons/iron-icons.js";
import "../node_modules/@polymer/paper-button/paper-button.js";
import "../node_modules/@polymer/paper-toast/paper-toast.js";

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
          <paper-input label="username" value={{username}} required error-message="Field is required">
            <iron-icon icon="supervisor-account" slot="prefix"></iron-icon>
          </paper-input>

          <paper-input label="email" value={{email}} required error-message="Field is required">
            <iron-icon icon="mail" slot="prefix"></iron-icon>
          </paper-input>

          <paper-input label="password" type="password" value={{password}} required error-message="Field is required">
            <iron-icon icon="lock" slot="prefix"></iron-icon>
          </paper-input>

          <paper-button on-click="signUp" id="submit-btn" type="submit" raised>Sign-Up</paper-button>
        </form>

        <a href="/sign-in">Sign-in</a>

        <paper-toast id="toast" text="{{message}}"></paper-toast>
      </main>
    `;
  }

  static get properties() {
    return {
      username: {
        type: String
      },
      email: {
        type: String
      },
      password: {
        type: String
      },
      message: {
        type: String
      },
      messageClass: {
        type: String,
        value: "hide-response"
      },
      successfulRegister: {
        type: Boolean,
        value: false
      }
    };
  }

  signUp(e) {
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

    registerUser("https://allowance-api.herokuapp.com/api/register", {
      userName: this.username,
      userEmail: this.email,
      userPassword: this.password
    }).then(res => res.json()).then(data => {
      this.message = data.message;
      this.$.toast.open();
      window.location = "/sign-in";
    }).catch(err => console.log(err));
  }

  constructor() {
    super();
  }

}

customElements.define('signup-page', SignupPage);
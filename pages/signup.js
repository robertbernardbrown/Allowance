import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "../node_modules/@polymer/paper-input/paper-input";
import "../node_modules/@polymer/iron-icon/iron-icon";
import "../node_modules/@polymer/iron-icons/iron-icons";
import "../node_modules/@polymer/paper-button/paper-button";

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

          <paper-input label="password" value={{password}} required error-message="Field is required">
            <iron-icon icon="lock" slot="prefix"></iron-icon>
          </paper-input>

          <paper-button on-click="signUp" id="submit-btn" type="submit" raised>Sign-Up</paper-button>
        </form>

        <div id="{{messageClass}}">
          <h2 aria-live="assertive">{{message}}</h2>
        </div>
      </main>
    `;
  }

  static get properties() {
    return {
      username: {type: String},
      email: {type: String},
      password: {type: String},
      message: {type: String},
      messageClass: {
        type: String,
        value: "hide-response"
      },
      successfulRegister: {
        type: Boolean,
        value: false
      }
    }
  }

  signUp (e) {
    e.preventDefault();
    const registerUser = (url = ``, data = {}) => {
        return fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data),
        })
    }
    registerUser("https://allowance-api.herokuapp.com/api/register", {userName:this.username, userEmail:this.email, userPassword:this.password})
    .then(res => res.json())
    .then(data => {
      this.message = data.message;
      this.messageClass = "display-response"
    })
    .catch(err => console.log(err))
  }
 
  constructor() {
    super();
  }
}

customElements.define('signup-page', SignupPage);
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
            // redirect: "follow", // manual, *follow, error
            // referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data),
        })
    }
    console.log(this.username, this.email, this.password)
    registerUser("https://allowance-api.herokuapp.com/api/register", {userName:this.username, userEmail:this.email, userPassword:this.password})
    .then(res => {console.log(res)})
    .catch(err => {console.log(err)})
  }
 
  constructor() {
    super();
  }
}

customElements.define('signup-page', SignupPage);
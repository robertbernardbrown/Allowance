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

            <paper-input label="password" value={{password}} required error-message="Field is required">
                <iron-icon icon="lock" slot="prefix"></iron-icon>
            </paper-input>
        
            <paper-button on-click="signIn" id="submit-btn" type="submit" raised>Sign-In</paper-button>
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
      password: {type: String},
      signInStatus: {
          type: Boolean,
          value: false
      },
      messageClass: {
        type: String,
        value: "hide-response"
      },
    }
  }

  signIn (e) {
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
    registerUser("https://allowance-api.herokuapp.com/api/login", {userName:this.username, userPassword:this.password})
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

customElements.define('signin-page', SigninPage);
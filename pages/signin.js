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
    </style>

    <main id="sign-up">
        <form>
            <paper-input label="username">
                <iron-icon icon="supervisor-account" slot="prefix"></iron-icon>
            </paper-input>

            <paper-input label="password">
                <iron-icon icon="lock" slot="prefix"></iron-icon>
            </paper-input>
        
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
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class SigninPage extends PolymerElement {
  static get template() {
    return html`
      <style>
       
      </style>

      <main id="sign-in">
        <h1>SIGNIN</h1>
      </main>
    `;
  }
 
  constructor() {
    super();
  }
}

customElements.define('signin-page', SigninPage);
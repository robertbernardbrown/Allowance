import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class SignupPage extends PolymerElement {
  static get template() {
    return html`
      <style>
       
      </style>

      <main id="sign-up">
        <h1>SIGNUP</h1>
      </main>
    `;
  }
 
  constructor() {
    super();
  }
}

customElements.define('signup-page', SignupPage);
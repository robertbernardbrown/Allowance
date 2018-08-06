import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";

class SignupPage extends PolymerElement {
  static get template() {
    return html`
      <style>
       
      </style>

      <main id="signup">
        <h1>SIGNUP</h1>
      </main>
    `;
  }

  constructor() {
    super();
  }

}

customElements.define('signup-page', SignupPage);
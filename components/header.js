import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class HeaderBanner extends PolymerElement {
  static get template() {
    return html`
      <style>
        header {
          display: flex;
          background: grey;
          justify-content: center;
          align-content: center;
        }
        h1 {
          color: white;
          margin-left: 2%;
          font-size: 5em;
        }
      </style>

      <header id="header">
        <h1>Allowance</h1>
      </header>
    `;
  }
 
  constructor() {
    super();
  }
}

customElements.define('header-banner', HeaderBanner);

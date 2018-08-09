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
          width: 100%;
        }
        h1 {
          color: white;
          margin-left: 2%;
          font-size: 5em;
        }
        header > a {
          text-decoration: none
        }
      </style>

      <header id="header">
        <a href="/"><h1>Allowance</h1></a>
      </header>
    `;
  }
 
  constructor() {
    super();
  }
}

customElements.define('header-banner', HeaderBanner);

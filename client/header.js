import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class HeaderBanner extends PolymerElement {
  static get template() {
    return html`
      <style>
        header {
          display: flex;
          border-bottom: 2px solid black;
          justify-content: center;
          align-items: center;
          margin: 0;
          padding: 0;
          width: 100%;
        }
        h1 {
          color: black;
          font-size: 5em;
        }
        header > a {
          text-decoration: none;
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

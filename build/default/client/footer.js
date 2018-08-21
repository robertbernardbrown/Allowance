import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";

class FooterBanner extends PolymerElement {
  static get template() {
    return html`
      <style>
        footer {
          display: flex;
          justify-content: center;
          border-top: 2px solid black;
          align-content: center;
          width: 100%;
          flex-shrink: 0;
          margin-top: 25px;
        }
        h1 {
          color: black;
          margin-left: 2%;
          font-size: 2em;
        }
      </style>

      <footer id="footer">
        <h1>Robert Brown @ 2017</h1>
      </footer>
    `;
  }

  constructor() {
    super();
  }

}

customElements.define('footer-banner', FooterBanner);
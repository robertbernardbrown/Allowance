import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";

class FooterBanner extends PolymerElement {
  static get template() {
    return html`
      <style>
        footer {
          display: flex;
          background: grey;
          justify-content: center;
          align-content: center;
          position: absolute;
          width: 100%;
          left: 50%;
          margin-left: -50%;
          bottom: 0;
        }
        h1 {
          color: white;
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
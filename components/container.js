import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class Container extends PolymerElement {
  static get template() {
    return html`
      <style>
        div {
            min-height:100%;
            position:relative;
        }
      </style>

      <div>
      </div>
    `;
  }
 
  constructor() {
    super();
  }
}

customElements.define('container', Container);
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "../components/header";
import "../components/footer";

class WelcomePage extends PolymerElement {
  static get template() {
    return html`
        <style>
        
        </style>

        <header-banner></header-banner>
        <footer-banner></footer-banner>
    `;
  }
 
  constructor() {
    super();
  }
}

customElements.define('welcome-page', WelcomePage);
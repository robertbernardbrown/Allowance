import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "../components/header";
import "../components/footer";

class WelcomePage extends PolymerElement {
  static get template() {
    return html`
        <style>
            #button-group {
                display: flex;
                justify-content: center;
            }
        </style>

        <header-banner></header-banner>
            <main>
                <h2>Welcome to Allowance!</h1>
                    <p>Allowance is an app to help you keep track of your funds in the simplest way possible</p>
                    <p>Post a budget and then track your transactions.</p>
                    <p>That's it - no fancy bank connections, just a good ol' fashioned budget tracker</p>
                    <div id="button-group">
                        <button>Sign-Up</button>
                        <button>Sign-In</button>
                    </div>
            </main>
        <footer-banner></footer-banner>
    `;
  }
 
  constructor() {
    super();
  }
}

customElements.define('welcome-page', WelcomePage);
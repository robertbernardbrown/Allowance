import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";

class WelcomePage extends PolymerElement {
  static get template() {
    return html`
        <style>
            main {
                display: flex;
                align-items: center;
                flex-direction: column;
            }
            main > * {
                display:flex;
                flex: 1 auto;
                justify-content: center;
                color: white;
                font-size: 1em;
                color: black;
            }
            h2 {
                font-size: 2em
            }
            input {
                font-size: 50px;
            }
            .welcome-btns {
                margin: 5px;
                font-size: 2em
            }
        </style>

            <main>
                <h2>Welcome to Allowance!</h1>
                    <p>Allowance is an app to help you keep track of your funds in the simplest way possible</p>
                    <p>Post a budget and then track your transactions.</p>
                    <p>That's it - no fancy bank connections, just a good ol' fashioned budget tracker</p>
                    <div id="button-group">
                            <a class="welcome-btns" href="/sign-up">Sign-up</a>
                            <a class="welcome-btns" href="/sign-in">Sign-in</a>
                    </div>
            </main>
    `;
  }

  constructor() {
    super();
  }

}

customElements.define('welcome-page', WelcomePage);
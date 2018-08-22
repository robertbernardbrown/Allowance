import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import Auth from "./utils/Auth.js";
import "./signin.js";
import "./dashboard.js";

class LoginCheck extends PolymerElement {
  static get template() {
    return html`
            <style>
            </style>

            <dom-if if="[[signInStatus]]" restamp="true">
                <template>
                    <dashboard-page></dashboard-page>
                </template>
            </dom-if>
            <dom-if if="[[!signInStatus]]">
                <template>
                    <signin-page name="sign-in" signInStatus="[[_signInStatus]]" route="{{subroute}}"></signin-page>
                </template>
            </dom-if>
        `;
  }

  static get properties() {
    return {
      signInStatus: {
        type: Boolean,
        value: false
      }
    };
  }

  authCheck() {
    if (Auth.isUserAuthenticated()) {
      this.signInStatus = true;
    }
  }

  constructor() {
    super();
    this.authCheck();
  }

}

customElements.define('login-check', LoginCheck);
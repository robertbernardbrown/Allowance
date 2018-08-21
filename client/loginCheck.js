import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "./signin";

class LoginCheck extends PolymerElement {
    static get template() {
        return html`
            <style>
            </style>

            <dom-if if="{{signInStatus}}" restamp="true">
                <template>
                    <content></content>
                </template>
            </dom-if>
            <dom-if if="{{!signInStatus}}">
                <template>
                    <signin-page name="sign-in" sign-in-status="{{_signInStatus}}" route="{{subroute}}"></signin-page>
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
        }
    }

    constructor() {
        super();
        console.log(this.signInStatus);
    }
}

customElements.define('login-check', LoginCheck);
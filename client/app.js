import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "@polymer/app-route/app-location";
import "@polymer/iron-pages";
import "@polymer/app-route/app-route";
import "./header.js"
import "./footer.js";
import "./signup";
import "./welcome";
import "./signin";
import "./dashboard";
import "./loginCheck";

class App extends PolymerElement {
    static get template() {
        return html`
            <style>
            html, body {
                height: 100%
            }
            body {
                display: flex;
                flex-direction: column;
            }
            </style>
            <app-location route="{{route}}"></app-location>

            <app-route
            route="{{route}}"
            pattern="/:view"
            data="{{routeData}}"
            tail="{{subroute}}"></app-route>

            <header-banner></header-banner>
            <iron-pages selected="[[routeData.view]]" attr-for-selected="name" default-selected="">
                <welcome-page name="" route="{{subroute}}"></welcome-page>
                <signup-page name="sign-up" route="{{subroute}}"></signup-page>
                <signin-page name="sign-in" sign-in-status="{{_signInStatus}}" route="{{subroute}}"></signin-page>
                <div name="dashboard">
                    <login-check>
                        <dashboard-page route="{{subroute}}"></dashboard-page>
                    </login-check>
                </div>
            </iron-pages>
            <footer-banner></footer-banner>
        `;
    }

    static get properties () {
        return {
            signInStatus: {
                type: Boolean,
                value: false,
                notify: true,
                observer: "_signInUpdated"
            }
        }
    }

    _signInUpdated () {
        console.log("[main-app] updated")
    }

    constructor() {
        super();
    }
}

customElements.define('main-app', App);
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
            * {
                box-sizing: border-box;
            }
            *:before,
            *:after {
                box-sizing: border-box;
            }
            html,
            body {
                height: 100%;
                position: relative;
            }
           .main-container {
                min-height: 100vh; /* will cover the 100% of viewport */
                overflow: hidden;
                display: block;
                position: relative;
                padding-bottom: 80px; /* height of your footer */
            }
            </style>
            <app-location route="{{route}}"></app-location>

            <app-route
            route="{{route}}"
            pattern="/:view"
            data="{{routeData}}"
            tail="{{subroute}}"></app-route>

            <div class="main-container">
                <header-banner></header-banner>
                <iron-pages selected="[[routeData.view]]" attr-for-selected="name" default-selected="">
                    <welcome-page name="" route="{{subroute}}"></welcome-page>
                    <signup-page name="sign-up" route="{{subroute}}"></signup-page>
                    <signin-page name="sign-in" sign-in-status="{{_signInStatus}}" route="{{subroute}}"></signin-page>
                    <div name="dashboard">
                        <login-check sign-in-status="{{_signInStatus}}">
                            <dashboard-page route="{{subroute}}"></dashboard-page>
                        </login-check>
                    </div>
                </iron-pages>
                <footer-banner></footer-banner>
            </div>
        `;
    }

    static get properties () {
        return {
            signInStatus: {
                type: Boolean,
                value: false,
                notify: true
            }
        }
    }

    constructor() {
        super();
    }
}

customElements.define('main-app', App);
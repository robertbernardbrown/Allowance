import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import "../node_modules/@polymer/app-route/app-location.js";
import "../node_modules/@polymer/iron-pages/iron-pages.js";
import "../node_modules/@polymer/app-route/app-route.js";
import "./header.js";
import "./footer.js";
import "./signup.js";
import "./welcome.js";
import "./signin.js";
import "./dashboard.js";

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
                <signin-page name="sign-in" route="{{subroute}}"></signin-page>
                <dashboard-page name="dashboard" route="{{subroute}}"></dashboard-page>
            </iron-pages>
            <footer-banner></footer-banner>
        `;
  }

  constructor() {
    super();
  }

}

customElements.define('main-app', App);
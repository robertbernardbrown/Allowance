import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import "../node_modules/@polymer/app-route/app-location.js";
import "../node_modules/@polymer/iron-pages/iron-pages.js";
import "../node_modules/@polymer/app-route/app-route.js";
import "../components/header.js";
import "../components/footer.js";
import "../components/signup.js";
import "./welcome.js";

class App extends PolymerElement {
  static get template() {
    return html`
            <style>
            </style>

            <app-location route="{{route}}"></app-location>

            <app-route
            route="{{route}}"
            pattern="/:view"
            data="{{routeData}}"
            tail="{{subroute}}"></app-route>
            
            <iron-pages selected="[[routeData.view]]" attr-for-selected="name">
                <welcome-page name="welcome" route="{{subroute}}"></welcome-page>
                <signup-page name="signup" route="{{subroute}}">{{route}}</signup-page>
            </iron-pages>
        `;
  }

  constructor() {
    super();
  }

}

customElements.define('main-app', App);
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "../node_modules/@polymer/app-route/app-location";
import "../node_modules/@polymer/iron-pages/iron-pages";
import "../node_modules/@polymer/app-route/app-route";
// import "../components/header"
// import "../components/footer";
// import "../components/signup";
import "./welcome";

class App extends PolymerElement {
    static get template() {
        return html`
            <style>
            * {
                background: yellow
            }
            h1 {
                color: red
            }
            </style>

            <app-location route="{{route}}"></app-location>

            <app-route
            route="{{route}}"
            pattern="/:view"
            data="{{routeData}}"
            tail="{{subroute}}"></app-route>

            <h1>{{route.path}}</h1>
            <h1>{{routeData.view}}</h1>

            <iron-pages selected="[[routeData.view]]" attr-for-selected="name" selected-attribute="visible" default-selected="shit">
                <welcome-page name="welcome" route="{{subroute}}"></welcome-page>
                <signup-page name="signup" route="{{subroute}}"></signup-page>
            </iron-pages>
        `;
    }
 
  constructor() {
    super();
  }
}

customElements.define('main-app', App);
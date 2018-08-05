import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import '../icon-toggle.js';

console.log("heyy")

class DemoElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          font-family: sans-serif;
          --icon-toggle-color: lightgrey;
          --icon-toggle-outline-color: black;
          --icon-toggle-pressed-color: red;
        }
      </style>
  
      <h3>Statically-cool icon-toggles</h3>
      <icon-toggle toggle-icon="favorite"></icon-toggle>
      <icon-toggle toggle-icon="star" pressed></icon-toggle>
    
      <h3>Data-bound icon-toggle</h3>
      <!-- use a computed binding to generate the message -->
      <div><span>[[_change(isFav)]]</span></div>
      <!-- curly brackets ({{}}} allow two-way binding --> 
      <icon-toggle toggle-icon="favorite" pressed="{{isFav}}"></icon-toggle>
    `;
  }
  _message(fav) {
    if (fav) {
      return 'You really like me!';
    } 
    else {
      return 'Do you like me?';
    }
  }

  _change(neato) {
    if (neato) {
      return `POOKY`
    } else {
      return `You ain't pooky`
    }
  }
}
customElements.define('demo-element', DemoElement);

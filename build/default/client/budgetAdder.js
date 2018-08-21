import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import "../node_modules/@polymer/polymer/lib/elements/dom-repeat.js";
import "../node_modules/@polymer/paper-input/paper-input.js";
import "../node_modules/@polymer/iron-icon/iron-icon.js";
import "../node_modules/@polymer/iron-icons/iron-icons.js";
import "../node_modules/@polymer/paper-button/paper-button.js";
import "../node_modules/@polymer/paper-toast/paper-toast.js";

class BudgetAdder extends PolymerElement {
  static get template() {
    return html`
            <style>
            </style>
            
        `;
  }

  constructor() {
    super();
  }

}

customElements.define('budget-adder', BudgetAdder);
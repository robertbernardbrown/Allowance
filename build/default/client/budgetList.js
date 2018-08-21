import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import "../node_modules/@polymer/polymer/lib/elements/dom-repeat.js";

class BudgetList extends PolymerElement {
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

customElements.define('budget-list', BudgetList);
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat';
import "../node_modules/@polymer/paper-input/paper-input";
import "../node_modules/@polymer/iron-icon/iron-icon";
import "../node_modules/@polymer/iron-icons/iron-icons";
import "../node_modules/@polymer/paper-button/paper-button";
import "../node_modules/@polymer/paper-toast/paper-toast";

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
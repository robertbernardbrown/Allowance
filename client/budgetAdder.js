import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat';
import "@polymer/paper-input/paper-input";
import "@polymer/iron-icon";
import "@polymer/iron-icons/iron-icons";
import "@polymer/paper-button";
import "@polymer/paper-toast";

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
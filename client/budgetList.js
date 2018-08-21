import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat';

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
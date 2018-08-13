import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat';

class Dashboard extends PolymerElement {
    static get template() {
        return html`
            <style>
            
            </style>

            <main>
                <h1>Hip</h1>
                <dom-repeat items="{{budgets}}" as="budgets">
                    <template>
                        <div><span>{{budgets.test}}</span></div>
                    </template>
                </dom-repeat>
            </main>
        `;
    }

    static get properties() {
        return {
            budgets: {
                type: Array,
                value: () => [{test:"pooky"}]
            }
        }
    }
 
    constructor() {
        super();
    }
}

customElements.define('dashboard-page', Dashboard);
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat';

class Dashboard extends PolymerElement {
    static get template() {
        return html`
            <style>
            
            </style>

            <main>
                <dom-repeat items="{{budgets}}" as="budgetData">
                    <template>
                        <div>Budget: {{budgetData.budget}}</div>
                        <div>Month: {{budgetData.budgetDate}}</div>
                    </template>
                </dom-repeat>
            </main>
        `;
    }

    static get properties() {
        return {
            budgets: {
                type: Array,
                value: () => []
            }
        }
    }

    populateBudgets () {
        fetch("https://allowance-api.herokuapp.com/api/budgets/1")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.result.map((cur, i) => {
                console.log(cur)
                this.push("budgets", cur)
            })
        })
        .catch(err => console.log(err))
    }
 
    constructor() {
        super();
        this.populateBudgets();
    }
}

customElements.define('dashboard-page', Dashboard);
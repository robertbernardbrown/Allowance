import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat';

class BudgetList extends PolymerElement {
    static get template() {
        return html`
            <style>
            .listDisplay {
                margin: 20px;
                background: teal;
                display: flex;
                flex-direction: column;
            }
            .listRow {
                display: flex;
                flex-basis: 2;
            }
            </style>
            <div class="listDisplay">
                <dom-repeat items="{{budgets}}" as="budgetData">
                    <template>
                        <div class="listRow">
                            <div>Month: {{budgetData.budgetDate}}</div>
                            <div>Budget: {{budgetData.budget}}</div>
                        </div>
                    </template>
                </dom-repeat>
            </div>
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

    populateBudgetsProp () {
        this.set('budgets', []);
        fetch("https://allowance-api.herokuapp.com/api/budgets/1")
        .then(res => res.json())
        .then(data => {
            data.result.map((cur, i) => {
                this.push("budgets", cur)
            })
        })
        .catch(err => console.log(err))
    }

    constructor() {
        super();
        this.populateBudgetsProp();
    }
}

customElements.define('budget-list', BudgetList);
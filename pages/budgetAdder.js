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
            #addBudgetForm {
                background: pink;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
            #budgetInput {
                padding-left: 15px;
                padding-right: 15px
            }
            </style>
            <form id="addBudgetForm">
                <paper-input id="budgetInput" label="budget" value={{budget}}>
                    <iron-icon icon="add" slot="prefix"></iron-icon>
                </paper-input>

                <select id="monthSelect">
                    <dom-repeat items="[[months]]">
                        <template is="dom-repeat" items="[[months]]" as="months">
                            <option value="[[months]]">[[months]]</option>
                        </template>
                    </dom-repeat>
                </select>

                <select id="yearSelect">
                    <dom-repeat items="[[years]]">
                        <template is="dom-repeat" items="[[years]]" as="years">
                            <option value="[[years]]">[[years]]</option>
                        </template>
                    </dom-repeat>
                </select>

                <paper-button on-click="addBudget" id="budget-btn" type="submit" raised>Add Budget</paper-button>
            </form>

            <paper-toast id="toast" text="{{message}}"></paper-toast>
        `;
    }

    static get properties() {
        return {
            budget: String,
            message: String,
            months: {
                type: Array,
                value: () => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            },
            years: {
                type: Array,
                value: () => {
                    const yearArray = [];
                    const date = new Date();
                    for (let i=0;i<5;i++){
                        let year = date.getFullYear() + i;
                        yearArray.push(year);
                    }
                    return yearArray;
                }
            }

        }
    }

    parseMonth(){
        for (let i = 0; i < this.months.length; i++){
            if (this.$.monthSelect.value === this.months[i]){
                return i;
            }
        }
    }

    addBudget (e) {
            e.preventDefault();
            let date = new Date();
            date.setFullYear(this.$.yearSelect.value, this.parseMonth(), 1);
            console.log(date);
            const addBudget = (url = ``, data = {}) => {
                return fetch(url, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify(data),
                })
            }
            addBudget("https://allowance-api.herokuapp.com/api/budgets/1", {budget:this.budget, budgetDate:date})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.message = data.message;
                this.$.toast.open();
                this.populateBudgetsProp();
            })
            .catch(err => console.log(err))
    }

    constructor() {
        super();
    }
}

customElements.define('budget-adder', BudgetAdder);
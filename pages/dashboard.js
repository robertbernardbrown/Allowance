import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat';
import "../node_modules/@polymer/paper-input/paper-input";
import "../node_modules/@polymer/iron-icon/iron-icon";
import "../node_modules/@polymer/iron-icons/iron-icons";
import "../node_modules/@polymer/paper-button/paper-button";

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
                <h2>Add a budget:<h2/>
                <form>
                    <paper-input label="budget" value={{budget}}>
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
            </main>
        `;
    }

    static get properties() {
        return {
            budgets: {
                type: Array,
                value: () => []
            },
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

    populateBudgetsProp () {
        fetch("https://allowance-api.herokuapp.com/api/budgets/1")
        .then(res => res.json())
        .then(data => {
            data.result.map((cur, i) => {
                this.push("budgets", cur)
            })
        })
        .catch(err => console.log(err))
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
            })
            .catch(err => console.log(err))
    }

    constructor() {
        super();
        this.populateBudgetsProp();
    }
}

customElements.define('dashboard-page', Dashboard);
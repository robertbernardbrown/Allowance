import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat';
import "@polymer/paper-input/paper-input";
import "@polymer/iron-icon";
import "@polymer/iron-icons/iron-icons";
import "@polymer/paper-button";
import "@polymer/paper-toast";
import "@polymer/paper-spinner/paper-spinner";
import "./budgetList";
import "./budgetAdder";

class Dashboard extends PolymerElement {
    static get template() {
        return html`
            <style>
            main {
                display: flex;
                align-items: center;
                flex-direction: column;
                background: grey;
            }
            .listDisplay {
                margin: 20px;
                border: 2px solid black;
                display: flex;
                flex-direction: column;
                padding: 2%;
                border-radius: 25px;
                background: white;
            }
            .listRow {
                display: flex;
                flex-basis: 2;
            }
            #addBudgetForm {
                display: flex;
                border: 2px solid black;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                border-radius: 25px;
                padding: 2%;
                margin: 20px;
                background: white;
            }
            #budgetInput {
                width: 100%
            }
            #budget-btn {
                background: green;
                color: white;
                width: 100%;
                margin-top: 10px;
            }
            .month-row{
                padding-left: 5px;
                padding-right: 5px
            }
            .budget-row{
                padding-left: 5px;
                padding-right: 5px
            }
            #monthSelect, #yearSelect {
                width: 100%
            }
            #budgetFormLabel {
                margin: 0
            }
            #interactionPane {
                display: flex;
                flex-direction: row;
            }
            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: #FFF;
            }
            .hidden {
                display: none
            }
            </style>

            <main>
            <div class="listDisplay">
                <dom-repeat items="{{budgets}}" as="budgetData">
                    <template>
                        <div class="listRow">
                            <div class="month-row">Month: {{budgetData.budgetDate}}</div>
                            <div class="budget-row">Budget: \${{budgetData.budget}}</div>
                        </div>
                    </template>
                </dom-repeat>
            </div>
            <div id="interactionPane">
                <form id="addBudgetForm">
                    <h2 id="budgetFormLabel">Add a budget:</h2>
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

                <form id="addBudgetForm">
                    <h2 id="budgetFormLabel">Add a budget:</h2>
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
            </div>

            <div class="overlay [[loadingStyle]]">
                <paper-spinner active="[[isLoading]]"></paper-spinner>
            </div>

            <paper-toast id="toast" text="{{message}}"></paper-toast>
            </main>
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
            },
            budgets: {
                type: Array,
                value: () => []
            },
            isLoading: {
                type: Boolean,
                value: true,
                notify: true
            },
            loadingStyle: {
                type: String,
                value: ""
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
        // set date using value of form inputs
        let date = new Date();
        date.setFullYear(this.$.yearSelect.value, this.parseMonth(), 1);
        // create addBudget function to simplify POST request to fetch
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
        // use addBudget function to send POST request with budget payload and use data to send toast to user and rerender budget list
        addBudget("https://allowance-api.herokuapp.com/api/budgets/1", {budget:this.budget, budgetDate:date})
        .then(res => res.json())
        .then(data => {
            this.message = data.message;
            this.$.toast.open();
            this.populateBudgetsProp();
        })
        .catch(err => console.log(err))
    }

    populateBudgetsProp () {
        this.set('budgets', []);
        fetch("https://allowance-api.herokuapp.com/api/budgets/1")
        .then(res => res.json())
        .then(data => {
            this.set("isLoading", false);
            this.set("loadingStyle", "hidden");
            data.result.map((cur, i) => {
                this.push("budgets", cur);
            })
        })
        .catch(err => console.log(err))
    }

    constructor() {
        super();
        this.populateBudgetsProp();
    }
}

customElements.define('dashboard-page', Dashboard);
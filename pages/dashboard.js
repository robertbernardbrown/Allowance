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
            .dropdown-content {
                display: none;
                position: absolute;
                background-color: #f9f9f9;
                min-width: 160px;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                z-index: 1;
            }
            
            .dropdown-content a {
                float: none;
                color: black;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
                text-align: left;
            }
            
            .dropdown-content a:hover {
                background-color: #ddd;
            }
            
            .dropdown:hover .dropdown-content {
                display: block;
            }
            .dropdown {
                float: left;
                overflow: hidden;
            }
            
            .dropdown .dropbtn {
                font-size: 16px;    
                border: none;
                outline: none;
                color: white;
                padding: 14px 16px;
                background-color: inherit;
                font-family: inherit;
                margin: 0;
            }
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

                    <div class="dropdown">
                        <button class="dropbtn">Set Month 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                            <dom-repeat items="{{months}}" as="months">
                                <template>
                                    <a>{{months}}</a>
                                </template>
                            </dom-repeat>
                        </div>
                    </div> 

                    <div class="dropdown">
                        <button class="dropbtn">Set Year 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div> 

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
            budgetDate: String,
            message: String,
            months: {
                type: Array,
                value: () => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
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

    addBudget () {
            e.preventDefault();
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
            addBudget("https://allowance-api.herokuapp.com/api/budgets/1", {budget:this.budget, budgetDate:this.budgetDate})
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
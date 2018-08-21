import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import Auth from "./utils/Auth.js";
import "../node_modules/@polymer/polymer/lib/elements/dom-repeat.js";
import "../node_modules/@polymer/paper-input/paper-input.js";
import "../node_modules/@polymer/iron-icon/iron-icon.js";
import "../node_modules/@polymer/iron-icons/iron-icons.js";
import "../node_modules/@polymer/paper-button/paper-button.js";
import "../node_modules/@polymer/paper-toast/paper-toast.js";
import "../node_modules/@polymer/paper-spinner/paper-spinner.js";
import "./budgetList.js";
import "./budgetAdder.js";

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
            .interactionForm {
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
            #budget-btn, #transaction-btn {
                background: green;
                color: white;
                width: 100%;
                margin-top: 10px;
            }
            #logout-Btn {
                background: red;
                color: white;
                width: 100%;
                margin-top: 10px;
            }
            .month-row, .budget-row {
                padding-left: 5px;
                padding-right: 5px
            }
            .monthSelect, .yearSelect {
                width: 100%
            }
            #budgetFormLabel, #transactionFormLabel {
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
                <form id="addBudgetForm" class="interactionForm">
                    <h2 id="budgetFormLabel">Add a budget:</h2>
                    <paper-input id="budgetInput" label="budget" value={{budget}}>
                        <iron-icon icon="add" slot="prefix"></iron-icon>
                    </paper-input>

                    <select class="monthSelect" id="monthSelect">
                        <dom-repeat items="[[months]]">
                            <template is="dom-repeat" items="[[months]]" as="months">
                                <option value="[[months]]">[[months]]</option>
                            </template>
                        </dom-repeat>
                    </select>

                    <select class="yearSelect" id="yearSelect">
                        <dom-repeat items="[[years]]">
                            <template is="dom-repeat" items="[[years]]" as="years">
                                <option value="[[years]]">[[years]]</option>
                            </template>
                        </dom-repeat>
                    </select>

                    <paper-button on-click="addBudget" id="budget-btn" type="submit" raised>Add Budget</paper-button>
                </form>

                <form id="addTransactionForm" class="interactionForm">
                    <h2 id="transactionFormLabel">Add a transaction:</h2>
                    <paper-input id="transactionInput" label="transaction" value={{transaction}}>
                        <iron-icon icon="add" slot="prefix"></iron-icon>
                    </paper-input>

                    <select class="monthSelect">
                        <dom-repeat items="[[months]]">
                            <template is="dom-repeat" items="[[months]]" as="months">
                                <option value="[[months]]">[[months]]</option>
                            </template>
                        </dom-repeat>
                    </select>

                    <select class="yearSelect">
                        <dom-repeat items="[[years]]">
                            <template is="dom-repeat" items="[[years]]" as="years">
                                <option value="[[years]]">[[years]]</option>
                            </template>
                        </dom-repeat>
                    </select>

                    <paper-button on-click="addTransaction" id="transaction-btn" type="submit" raised>Add Transaction</paper-button>
                </form>
            </div>

            <button on-click="logOut" id="logout-Btn">Log-Out</button>

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

          for (let i = 0; i < 5; i++) {
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
    };
  }

  parseMonth() {
    for (let i = 0; i < this.months.length; i++) {
      if (this.$.monthSelect.value === this.months[i]) {
        return i;
      }
    }
  }

  addBudget(e) {
    e.preventDefault(); // set date using value of form inputs

    let date = new Date();
    date.setFullYear(this.$.yearSelect.value, this.parseMonth(), 1); // create addBudget function to simplify POST request to fetch

    const addBudget = (url = ``, data = {}) => {
      return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "bearer " + Auth.getToken()
        },
        body: JSON.stringify(data)
      });
    }; // use addBudget function to send POST request with budget payload and use data to send toast to user and rerender budget list


    addBudget(`https://allowance-api.herokuapp.com/api/budgets/${Auth.getId()}`, {
      budget: this.budget,
      budgetDate: date
    }).then(res => res.json()).then(data => {
      this.message = data.message;
      this.$.toast.open();
      this.populateBudgetsProp();
    }).catch(err => console.log(err));
  }

  populateBudgetsProp() {
    this.set('budgets', []);
    fetch(`https://allowance-api.herokuapp.com/api/budgets/${Auth.getId()}`, {
      headers: {
        "Authorization": "bearer " + Auth.getToken()
      }
    }).then(res => res.json()).then(data => {
      this.set("isLoading", false);
      this.set("loadingStyle", "hidden");
      data.result.map((cur, i) => {
        this.push("budgets", cur);
      });
    }).catch(err => console.log(err));
  }

  logOut() {
    Auth.deauthenticateUser();
    window.location = "/";
  }

  constructor() {
    super();
    this.populateBudgetsProp();
  }

}

customElements.define('dashboard-page', Dashboard);
import { currency } from "./utils.js";

export function renderTransactions(transactions){

  const tableBody =
    document.getElementById("tableBody");

  tableBody.innerHTML = "";

  transactions.forEach(transaction=>{

    const row = document.createElement("tr");

    row.innerHTML = `

      <td>${transaction.desc}</td>

      <td>${transaction.category}</td>

      <td>${transaction.type}</td>

      <td>${transaction.date}</td>

      <td>
        ${transaction.type === "income" ? "+" : "-"}
        ${currency(transaction.amount)}
      </td>

      <td>
        <button
          class="delete-btn"
          data-id="${transaction.id}"
        >
          ✕
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

export function updateStats(transactions){

  const income = transactions
    .filter(t=>t.type==="income")
    .reduce((acc,t)=>acc+t.amount,0);

  const expense = transactions
    .filter(t=>t.type==="expense")
    .reduce((acc,t)=>acc+t.amount,0);

  document.getElementById("incomeValue")
    .textContent = currency(income);

  document.getElementById("expenseValue")
    .textContent = currency(expense);

  document.getElementById("balanceValue")
    .textContent = currency(income-expense);
}

import { Transaction } from "./transaction.js";

import { Storage } from "./storage.js";

import {
  renderTransactions,
  updateStats
}
from "./ui.js";

const state = {

  transactions: Storage.load()
};

function refreshUI(){

  renderTransactions(state.transactions);

  updateStats(state.transactions);

  Storage.save(state.transactions);
}

function addTransaction(){

  const desc =
    document.getElementById("desc").value;

  const amount =
    document.getElementById("amount").value;

  const category =
    document.getElementById("category").value;

  const type =
    document.getElementById("type").value;

  const date =
    document.getElementById("date").value;

  if(!desc || !amount || !date){

    alert("Fill all fields");

    return;
  }

  const transaction = new Transaction(
    desc,
    amount,
    category,
    type,
    date
  );

  state.transactions.push(transaction);

  refreshUI();

  closeModal();
}

function deleteTransaction(id){

  state.transactions =
    state.transactions.filter(
      t=>t.id !== id
    );

  refreshUI();
}

function openModal(){

  document
    .getElementById("modal")
    .classList.add("active");
}

function closeModal(){

  document
    .getElementById("modal")
    .classList.remove("active");
}

document
  .getElementById("openModalBtn")
  .addEventListener("click",openModal);

document
  .getElementById("saveBtn")
  .addEventListener("click",addTransaction);

document
  .getElementById("tableBody")
  .addEventListener("click",(e)=>{

    if(
      e.target.classList.contains(
        "delete-btn"
      )
    ){

      deleteTransaction(
        e.target.dataset.id
      );
    }
  });

document
  .getElementById("searchInput")
  .addEventListener("input",(e)=>{

    const value =
      e.target.value.toLowerCase();

    const filtered =
      state.transactions.filter(t=>

        t.desc.toLowerCase()
          .includes(value)
      );

    renderTransactions(filtered);
  });

document
  .getElementById("themeBtn")
  .addEventListener("click",()=>{

    document.body.classList.toggle(
      "light"
    );
  });

if(state.transactions.length === 0){

  state.transactions = [

    new Transaction(
      "Salary",
      85000,
      "Other",
      "income",
      "2026-05-01"
    ),

    new Transaction(
      "Groceries",
      2500,
      "Food",
      "expense",
      "2026-05-02"
    )
  ];
}

refreshUI();

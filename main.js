

const incomeSelected = document.getElementById('tab-1');
const expensesSelected = document.getElementById('tab-2');
const balanceSelected = document.getElementById('tab-3');
const container = document.getElementById('inner-container');
const addButton = document.getElementById('add-button');
const textInput = document.getElementById('text-input');
const containerHeader = document.getElementById('container-header');
const bannerIncome = document.getElementById('banner-income');
const bannerExpenses = document.getElementById('banner-expenses')
const bannerBalance = document.getElementById('banner-balance')
const list = document.getElementById('list')
const listTwo = document.getElementById('list2')
addButton.hidden = true;
textInput.hidden = true;
textInput.value = ''
if (!localStorage.getItem('incomes')){
incomeLoad()
} else {
balanceLoad()
}
addButton.addEventListener('click', function (){
  container.style.opacity = 0;
  setTimeout(function() {
    container.style.opacity = 1;
    containerHeader.innerText += `-Name` 
  textInput.hidden = false;
  addButton.hidden = true;
  list.innerHTML = ''
  listTwo.innerHTML = '';
  textInput.focus();
}, 800);
});
incomeSelected.addEventListener('click',incomeLoad);

function incomeLoad (){
  incomeSelected.classList.remove('button');
  incomeSelected.classList.add('button-selected');
  expensesSelected.classList.remove('button-selected');
  expensesSelected.classList.add('button');
  balanceSelected.classList.remove('button-selected');
  balanceSelected.classList.add('button');
  container.style.opacity = 0;
  addButton.hidden = false;
  list.innerHTML = '';
  listTwo.innerHTML = '';
  textInput.removeEventListener('keydown', saveExpense)
fillIncome()
  setTimeout(function() {
    container.style.opacity = 1;
    containerHeader.innerText = `Income`
  }, 500); // Wait 500ms before updating the content and fading back in
  textInput.addEventListener('keydown', saveIncomeName)
  updateValues(); 
}

expensesSelected.addEventListener('click', function (){
  textInput.value = ''
  expensesSelected.classList.remove('button');
  list.innerHTML = '';
  listTwo.innerHTML = '';
  expensesSelected.classList.add('button-selected');
  incomeSelected.classList.remove('button-selected');
  incomeSelected.classList.add('button');
  balanceSelected.classList.remove('button-selected');
  balanceSelected.classList.add('button');
  container.style.opacity = 0;
  addButton.hidden = false;
  textInput.removeEventListener('keydown', saveIncome)
  textInput.removeEventListener('keydown', saveIncomeName)
  fillExpenses();
  setTimeout(function() {
    container.style.opacity = 1;
    containerHeader.innerText = `Expenses`
  }, 500);
  textInput.addEventListener('keydown', saveExpensesName)
  updateValues();
});
balanceSelected.addEventListener('click', balanceLoad);
function balanceLoad (){
  list.style.left = '10px';
  balanceSelected.classList.remove('button');
  balanceSelected.classList.add('button-selected');
  incomeSelected.classList.remove('button-selected');
  incomeSelected.classList.add('button');
  expensesSelected.classList.remove('button-selected');
  expensesSelected.classList.add('button');
  container.style.opacity = 0;
  addButton.hidden = true;
  list.innerHTML = '';
  listTwo.innerHTML = '';
  setTimeout(function() {
    container.style.opacity = 1;
    containerHeader.innerText = `Balance`
  fillBalance()
  }, 500);
}
function updateValues() {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let income = JSON.parse(localStorage.getItem('incomes')) || [];
  const totalExpenses = expenses.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
  const totalIncome = income.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
  
  bannerExpenses.innerText = `Expenses: ${totalExpenses}`;
  const balance = totalIncome - totalExpenses;
  bannerIncome.innerText = `Income: ${totalIncome}`;
  bannerBalance.innerText = `Balance: ${balance}`;

  
}


textInput.addEventListener('keydown', saveIncomeName)
updateValues();

function saveIncome(event){
    if (event.key === 'Enter' || event.key === 'Go'){
      let income = textInput.value;
      let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
      incomes.push(income);
  localStorage.setItem('incomes', JSON.stringify(incomes));
  textInput.hidden = true;
  updateValues();
  textInput.removeEventListener('keydown', saveIncome)
  balanceLoad();
}
}
function saveExpense(event) {
  if (event.key === 'Enter') {
    const expense = textInput.value;
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    
    localStorage.setItem('expenses', JSON.stringify(expenses));
    textInput.hidden = true;
    updateValues();
    textInput.removeEventListener('keydown', saveExpense);
    balanceLoad();
  }
}
function fillExpenses(){
  list.innerHTML = ``;
  listTwo.innerHTML = ''
  list.style.left = '0';
  let expenses = JSON.parse(localStorage.getItem('expenses'))
  let expenseNames = JSON.parse(localStorage.getItem('expense-names'))

  if (!expenses){
    list.innerHTML = ' <h3 class="appended-text">Enter Expense To Begin</h3>';
  } else {
  for (let i = 0; i < expenseNames.length; i++) {
      list.innerHTML += `<h3 class="appended-text">${expenseNames[i]}</h3>`;
    } 
    for (let i = 0; i < expenses.length; i++) {
      listTwo.innerHTML += `<h3 class="appended-text">${expenses[i]}</h3>`;
    }
  }
  }

function saveIncomeName (event){
  if (event.key === 'Enter'){
    let incomeName = textInput.value;
    let incomeNames = JSON.parse(localStorage.getItem('income-names')) || [];
    incomeNames.push(incomeName)
    localStorage.setItem('income-names', JSON.stringify(incomeNames));
    updateValues();
    textInput.removeEventListener('keydown', saveIncomeName)
    textInput.hidden = true;
    setTimeout(function() {
      container.style.opacity = 1;
      containerHeader.innerText = `Income Amount`
      textInput.value = ''
      textInput.hidden = false;
  textInput.focus();
    }, 500)
  textInput.addEventListener('keydown', saveIncome)
}
}
function fillIncome (){
  list.innerHTML = ``;
  listTwo.innerHTML = ''
  list.style.left = '';
  let incomeName = JSON.parse(localStorage.getItem('income-names'))
  let incomeAmount = JSON.parse(localStorage.getItem('incomes'))
  list.style.left = '10px';

  if (!incomeAmount){
    list.innerHTML = ' <h3 class="appended-text">Enter Income To Begin</h3>';
  } else {
  for (let i = 0; i < incomeName.length; i++) {
      list.innerHTML += `<h3 class="appended-text">${incomeName[i]}</h3>`;
    } 
    for (let i = 0; i < incomeAmount.length; i++) {
      listTwo.innerHTML += `<h3 class="appended-text">${incomeAmount[i]}</h3>`;
    }
  }

}
function fillBalance(){
  list.hidden = false;
  list.innerHTML = `<h3 class="appended-text">${bannerBalance.innerText}</h3>`
  list.innerHTML += `<h3 class="appended-text">Total ${bannerIncome.innerText}</h3>`  
  list.innerHTML += `<h3 class="appended-text">Total ${bannerExpenses.innerText}</h3>`  
  
}
function saveExpensesName(event){
  if (event.key === 'Enter') {
    const expenseName = textInput.value;
    let expenseNames = JSON.parse(localStorage.getItem('expense-names')) || [];
    expenseNames.push(expenseName);
    
    localStorage.setItem('expense-names', JSON.stringify(expenseNames));
    textInput.hidden = true;
    updateValues();
    textInput.removeEventListener('keydown', saveExpensesName);
    containerHeader.innerText = 'Expense Amount'
    setTimeout(function() {
      container.style.opacity = 1;
      containerHeader.innerText = `Expense Amount`
      textInput.value = ''
      textInput.hidden = false;
  textInput.focus();
    }, 500)
  textInput.addEventListener('keydown', saveExpense)
  }
}
function clearExpenseLocalStorage() {
  localStorage.removeItem('expense-names')
  localStorage.removeItem('expenses')
  localStorage.removeItem('income-names')
  localStorage.removeItem('incomes')


}

const reset = document.getElementById('reset')
reset.addEventListener('click', clearExpenseLocalStorage)
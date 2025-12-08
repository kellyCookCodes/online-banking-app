console.log("index.js loaded")

const accountNum = '572489446789'

// SHOW/HIDE ACCOUNT NUM
const eyeBtn = document.getElementById('see-account-num')
const accountNoText = document.getElementById('account-no-text')
let accountNoVisible = false

eyeBtn.addEventListener('click', () => {
  eyeBtn.classList.toggle('fa-eye')
  eyeBtn.classList.toggle('fa-eye-slash')
  accountNoVisible = !accountNoVisible

  if (accountNoVisible) {
    accountNoText.innerText = accountNum
  } else {
    accountNoText.innerText = `*********${accountNum.slice(-4)}`
  }
})

let balance = 120000
const transactionList = document.getElementById('transaction-list')

// DEPOSIT FUNCTION
function deposit() {
  const amountToDepositNode = document.getElementById('amount-to-deposit')
  const amountToDeposit = Number(amountToDepositNode.value)

  // VALIDATION
  if (amountToDeposit <= 0 || isNaN(amountToDeposit)) {
    alert("Please enter a valid deposit amount.")
    return
  }

  amountToDepositNode.value = ''
  balance += amountToDeposit
  document.getElementById('account-balance').innerText = `$${balance.toFixed(2)}`

  // TRANSACTION ENTRY
  const listGroupItem = document.createElement('a')
  listGroupItem.classList.add('list-group-item', 'list-group-item-action')

  const topPart = document.createElement('div')
  topPart.classList.add('d-flex', 'w-100', 'justify-content-between')

  const h5 = document.createElement('h5')
  h5.classList.add('mb-1')
  h5.innerText = 'Deposit'

  const amount = document.createElement('div')
  amount.classList.add('fs-5', 'text-success')
  amount.innerText = `+$${amountToDeposit.toFixed(2)}`

  topPart.append(h5, amount)

  const middlePart = document.createElement('p')
  middlePart.classList.add('mb-1')
  middlePart.innerText = 'Transfer in (Credit)'

  const lastPart = document.createElement('div')
  lastPart.classList.add('d-flex', 'w-100', 'justify-content-between')

  const small1 = document.createElement('small')
  const now = new Date()
  small1.innerText = now.toLocaleString()

  const small2 = document.createElement('small')
  small2.innerText = `Updated Balance: $${balance.toFixed(2)}`

  lastPart.append(small1, small2)
  listGroupItem.append(topPart, middlePart, lastPart)

  transactionList.prepend(listGroupItem)

  document.getElementById('deposit-successful').innerHTML = `
    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
      Deposit Successful!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
}

// SEND MONEY FUNCTION
function sendMoney() {
  const amountToTransfer = Number(document.getElementById('amount-to-transfer').value)
  const transferType = document.getElementById('transfer-type').value
  const beneficiaryName = document.getElementById('beneficiary-name').value
  const sendMoneyForm = document.getElementById('send-money-form')

  // VALIDATION
  if (amountToTransfer <= 0 || isNaN(amountToTransfer)) {
    alert("Please enter a valid transfer amount.")
    return
  }
  if (amountToTransfer > balance) {
    alert("Insufficient funds.")
    return
  }

  sendMoneyForm.reset()
  balance -= amountToTransfer
  document.getElementById('account-balance').innerText = `$${balance.toFixed(2)}`

  const listGroupItem = document.createElement('a')
  listGroupItem.classList.add('list-group-item', 'list-group-item-action')

  const topPart = document.createElement('div')
  topPart.classList.add('d-flex', 'w-100', 'justify-content-between')

  const h5 = document.createElement('h5')
  h5.classList.add('mb-1')
  h5.innerText = `${transferType} Transfer: ${beneficiaryName}`

  const amount = document.createElement('div')
  amount.classList.add('fs-5', 'text-danger')
  amount.innerText = `-$${amountToTransfer.toFixed(2)}`

  topPart.append(h5, amount)

  const middlePart = document.createElement('p')
  middlePart.classList.add('mb-1')
  middlePart.innerText = 'Transfer Out (Debit)'

  const lastPart = document.createElement('div')
  lastPart.classList.add('d-flex', 'w-100', 'justify-content-between')

  const small1 = document.createElement('small')
  const now = new Date()
  small1.innerText = now.toLocaleString()

  const small2 = document.createElement('small')
  small2.innerText = `Updated Balance: $${balance.toFixed(2)}`

  lastPart.append(small1, small2)
  listGroupItem.append(topPart, middlePart, lastPart)

  transactionList.prepend(listGroupItem)

  document.getElementById('transfer-successful').innerHTML = `
    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
      Transfer Successful!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
}

// === LOGIN STATE TOGGLE LOGIC ===
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

function updateAuthLink() {
  console.log("Auth link element:", document.getElementById("auth-link"));
  console.log("Login state:", isLoggedIn);

  const authLink = document.getElementById("auth-link");
  if (!authLink) return;

  if (isLoggedIn) {
    authLink.textContent = "Logout";
    authLink.href = "#"; // CLEARS THE FLAG
    authLink.onclick = function (e) {
      e.preventDefault();
      isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
      updateAuthLink();
      alert("You have been logged out.");
      window.location.href = "login.html";
    };
  } else {
    authLink.textContent = "Login";
    authLink.href = "login.html";
    authLink.onclick = null;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM ready");
  updateAuthLink();
});
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

// NODES
const transactionList = document.getElementById('transaction-list')

function addTransferInToList() {
  const listGroupItem = document.createElement('a')
  listGroupItem.classList.add('list-group-item', 'list-group-item-action')

  const topPart = document.createElement('div')
  topPart.classList.add('d-flex', 'w-100', 'justify-content-between')

  const h5 = document.createElement('h5')
  h5.classList.add('mb-1')
  h5.innerText = 'Direct Deposit'
  const amount = document.createElement('div')
  amount.classList.add('fs-5', 'text-success')
  amount.innerText = '$12,000.00'

  topPart.append(h5, amount)

  const middlePart = document.createElement('p')
  middlePart.classList.add('mb-1')
  middlePart.innerText = 'Deposit (Credit)'

  const lastPart = document.createElement('div')
  lastPart.classList.add('d-flex', 'w-100', 'justify-content-between')

  const small1 = document.createElement('small')
  small1.innerText = '22/10/2025 10:48:08'
  const small2 = document.createElement('small')
  small2.innerText = 'Balance: $23,579.07'
  lastPart.append(small1, small2)

  listGroupItem.append(topPart, middlePart, lastPart)
  transactionList.append(listGroupItem)
}

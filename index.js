const accountNum = '572489446789'

const eyeBtn = document.getElementById('see-account-num')
const accountNoText = document.getElementById('account-no-text')
let accountNoVisible = false
eyeBtn.addEventListener('click', () => {
  eyeBtn.classList.toggle('fa-eye')
  eyeBtn.classList.toggle('fa-eye-slash')
  accountNoVisible = !accountNoVisible

  if(accountNoVisible) {
    accountNoText.innerText = accountNum
  }else{ 
    accountNoText.innerText = `*********${accountNum.slice(-4)}`
  }
})

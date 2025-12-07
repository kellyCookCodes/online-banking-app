// 1. LOAD LOGIN STATE FROM LOCALSTORAGE
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

// 2. FUNCTION TO UPDATE NAV LINK
function updateAuthLink() {
  const authLink = document.getElementById("auth-link")
  if (!authLink) return

  if (isLoggedIn) {
    authLink.textContent = "Logout"
    authLink.href = "#"
    authLink.onclick = function (e) {
      e.preventDefault()
      isLoggedIn = false
      localStorage.setItem("isLoggedIn", "false")
      updateAuthLink()
      alert("You have been logged out.")
    }
  } else {
    authLink.textContent = "Login"
    authLink.href = "login.html"
    authLink.onclick = null
  }
}

// 3. SPECIAL CASE: HIDE LOGIN LINK ON LOGIN PAGE IF NOT LOGGED IN
const authLink = document.getElementById("auth-link")
if (authLink && document.title.includes("Login")) {
  if (isLoggedIn) {
    // Show Logout if already logged in
    authLink.textContent = "Logout"
    authLink.href = "#"
    authLink.onclick = function (e) {
      e.preventDefault()
      isLoggedIn = false
      localStorage.setItem("isLoggedIn", "false")
      updateAuthLink()
      alert("You have been logged out.")
    }
  } else {
    // Hide completely if not logged in
    authLink.style.display = "none"
  }
}

// 4. RUN ON PAGE LOAD
updateAuthLink()

// 5. LOGIN FORM HANDLER (ONLY ON LOGIN.HTML)
const loginForm = document.getElementById("login-form")
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault()

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()

    if (!email.includes("@")) {
      alert("Please enter a valid email address.")
      return
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.")
      return
    }

    // Simulate successful login
    isLoggedIn = true
    localStorage.setItem("isLoggedIn", "true")
    updateAuthLink()

    window.location.href = "index.html"
  })
}
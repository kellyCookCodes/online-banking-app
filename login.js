// 1. LOAD LOGIN STATE FROM LOCALSTORAGE
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

// 2. FUNCTION TO UPDATE NAV LOGIN LINK TOGGLE LOGOUT
function updateAuthLink() {
  console.log("Auth link element:", document.getElementById("auth-link"))
  console.log("Login state:", isLoggedIn)

  const authLink = document.getElementById("auth-link")
  if (!authLink) return

  if (isLoggedIn) {
    authLink.textContent = "Logout"
    authLink.href = "#"
    authLink.onclick = function (e) {
      e.preventDefault() // event.preventDefault() overrides default actions and implement custom logic instead
      isLoggedIn = false
      localStorage.removeItem("isLoggedIn")
      updateAuthLink()
      alert("You have been logged out.")
      window.location.href = "login.html" // REDIRECT
    }
  } else {
    authLink.textContent = "Login"
    authLink.href = "login.html"
    authLink.onclick = null
  }
}

// 3. SPECIAL CASE: On login.html, flip to Logout if already logged in
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM ready")

  const authLink = document.getElementById("auth-link")
  if (authLink && window.location.pathname.includes("login.html")) {
    if (isLoggedIn) {
      // Show Logout instead of hiding
      updateAuthLink()
    } else {
      // Hide completely if not logged in
      authLink.style.display = "none"
    }
  }

  // 4. RUN ON PAGE LOAD
  updateAuthLink()
})


// 5. LOGIN FORM HANDLER (ONLY ON LOGIN.HTML)
const loginForm = document.getElementById("login-form")
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault()
    // event.preventDefault() overrides default actions and implement custom logic instead

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

    // SIMULATE SUCCESSFUL LOGIN
    isLoggedIn = true
    localStorage.setItem("isLoggedIn", "true")

    // REDIRECT TO INDEX.HTML
    window.location.href = "index.html"
  })
}
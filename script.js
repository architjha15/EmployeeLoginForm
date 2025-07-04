const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  
  const empId = document.getElementById("empId").value;
  const password = document.getElementById("password").value;
  if (empId && password) {

    const result = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        empId,
        password,
      }),
    });
    const data = result.json();
    console.log(data);

    loginMessage.textContent = "✅ User has successfully logged in!";
    loginMessage.style.color = "lightgreen";
    setTimeout(() => {
      location.reload();
    }, 2000);
  } else {
    loginMessage.textContent = "❌ Please fill in all fields.";
    loginMessage.style.color = "lightcoral";
  }  
});

function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}
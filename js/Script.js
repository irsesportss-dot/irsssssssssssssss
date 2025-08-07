// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("main input");
  const footer = document.querySelector("footer");

  // Input focus animation
  input?.addEventListener("focus", () => {
    input.style.boxShadow = "0 0 10px 2px #e23744";
  });

  input?.addEventListener("blur", () => {
    input.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.2)";
  });

  // Typewriter effect
  const textElement = document.querySelector("main p");
  const fullText = textElement?.textContent || "";
  if (textElement) textElement.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < fullText.length) {
      textElement.textContent += fullText.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  typeWriter();

  // Footer year update
  const year = new Date().getFullYear();
  document.getElementById("year").textContent = year;

  // Modals
  const contactModal = document.getElementById("contactModal");
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");

  document.getElementById("contactLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    contactModal.style.display = "block";
  });
  document.getElementById("closeContact")?.addEventListener("click", () => {
    contactModal.style.display = "none";
  });

  document.getElementById("loginBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.style.display = "block";
  });
  document.getElementById("closeLogin")?.addEventListener("click", () => {
    loginModal.style.display = "none";
  });

  document.getElementById("signupBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    signupModal.style.display = "block";
  });
  document.getElementById("closeSignup")?.addEventListener("click", () => {
    signupModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === contactModal) contactModal.style.display = "none";
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === signupModal) signupModal.style.display = "none";
  });

  // ✅ SEARCH REDIRECT FUNCTIONALITY ADDED HERE
  input?.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const query = input.value.trim().toLowerCase();
      if (query === "free fire max") {
        window.location.href = "toornament.html";
      } else {
        alert("No matching tournament found.");
      }
    }
  });

  // Firebase config (Replace with your actual config)
  const firebaseConfig = {
    apiKey: "AIzaSyDf10o4VkbIQN-nWFbQr0trN6GIimQUafs",
    authDomain: "irs-esportss.firebaseapp.com",
    projectId: "irs-esportss",
    appId: "1:932075293372:web:a25d6f41f5a85ee367deb9"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  // Signup
  const signupForm = document.querySelector("#signupModal .auth-form");
  signupForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("Signup successful!");
        signupForm.reset();
        signupModal.style.display = "none";
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  // Login
  const loginForm = document.querySelector("#loginModal .auth-form");
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("Login successful!");
        loginForm.reset();
        loginModal.style.display = "none";
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  // 🔥 Auth State Observer
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const userDisplay = document.createElement("li");
  userDisplay.style.color = "#fff";
  userDisplay.style.fontWeight = "bold";

  auth.onAuthStateChanged((user) => {
    const navList = document.querySelector("header nav ul");

    if (user) {
      const email = user.email;
      const username = email.split("@")[0];

      loginBtn?.classList.add("hidden");
      signupBtn?.classList.add("hidden");

      userDisplay.textContent = `Welcome, ${username}`;
      if (!navList.contains(userDisplay)) {
        navList.appendChild(userDisplay);
      }
    } else {
      loginBtn?.classList.remove("hidden");
      signupBtn?.classList.remove("hidden");

      if (navList.contains(userDisplay)) {
        navList.removeChild(userDisplay);
      }
    }
  });
});

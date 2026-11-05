import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const authPanel = document.querySelector("#auth-panel");
const appPanel = document.querySelector("#app-panel");
const authMessage = document.querySelector("#auth-message");
const connectionStatus = document.querySelector("#connection-status");
const setupNotice = document.querySelector("#setup-notice");
const loginForm = document.querySelector("#login-form");
const logoutButton = document.querySelector("#logout-button");

function showMessage(message) { authMessage.textContent = message; }

const configured = firebaseConfig.apiKey !== "PREENCHER" &&
                   firebaseConfig.projectId !== "PREENCHER";

if (!configured) {
  setupNotice.classList.remove("hidden");
  connectionStatus.textContent = "Aguardando configuração";
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showMessage("Antes do login, precisamos conectar o projeto ao Firebase. Consulte o LEIA-ME.md.");
  });
} else {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  connectionStatus.textContent = "Serviço de autenticação configurado";

  onAuthStateChanged(auth, (user) => {
    const signedIn = Boolean(user);
    authPanel.classList.toggle("hidden", signedIn);
    appPanel.classList.toggle("hidden", !signedIn);
    if (user) connectionStatus.textContent = `Conectado: ${user.email}`;
    else connectionStatus.textContent = "Não autenticado";
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    showMessage("");
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;
    const submit = loginForm.querySelector("button[type=submit]");
    submit.disabled = true;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const messages = {
        "auth/invalid-credential": "E-mail ou senha incorretos.",
        "auth/too-many-requests": "Muitas tentativas. Aguarde e tente novamente.",
        "auth/network-request-failed": "Falha de conexão. Verifique sua internet."
      };
      showMessage(messages[error.code] || "Não foi possível entrar. Confira os dados e tente novamente.");
    } finally {
      submit.disabled = false;
    }
  });

  logoutButton.addEventListener("click", async () => {
    await signOut(auth);
  });
}

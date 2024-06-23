const toggleLoadingIcon = () => {
  document.getElementById("btnEntrar").style.display =
    document.getElementById("btnEntrar").style.display != "none"
      ? "none"
      : "block";
  document.getElementById("loadingIcon").style.display =
    document.getElementById("loadingIcon").style.display == "block"
      ? "none"
      : "block";
};

function displayMessageToUser(msg) {
  document.getElementById("txtMessage").innerHTML = msg;
}

function validarCampos() {
  try {
    const email = document.getElementById("txtEmail").value;
    const pw = document.getElementById("txtPassword").value;
    if (!(email.length || pw.length)) {
      displayMessageToUser("Preencha com sua informação de login");
    } else if (!email.length) {
      displayMessageToUser("Campo de email não pode ficar vazio.");
    } else if (!pw.length) {
      displayMessageToUser("Campo de senha não pode ficar vazio.");
    } else {
      displayMessageToUser("");
    }
    return { email, pw };
  } catch (error) {
    console.log(error);
  }
}
export function autenticarUsuario() {
  setTimeout(() => {
    toggleLoadingIcon();
  }, 100);

  const { email, pw } = validarCampos();

  if (!(email && pw)) {
    setTimeout(() => {
      toggleLoadingIcon();
    }, 100);
    return false;
  }

  // Obtém os usuários cadastrados do localStorage
  const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Busca o usuário pelo email
  const usuario = usuariosCadastrados.find(u => u.email === email);

  if (usuario && usuario.password === pw) { // Verifica email e senha
    // Autenticação bem-sucedida
    window.location.href = "home.html";
  } else {
    // Autenticação falhou
    displayMessageToUser("Email ou senha incorretos.");
  }

  setTimeout(() => {
    toggleLoadingIcon();
  }, 100);
}
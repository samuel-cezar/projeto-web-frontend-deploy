// newUser.js (modificado)

function displayMessageToUser(msg) {
  document.getElementById("txtMessage").innerHTML = msg;
}

const toggleLoadingIcon = () => {
  document.getElementById("btnCadastrar").style.display =
      document.getElementById("btnCadastrar").style.display != "none"
          ? "none"
          : "block";
  document.getElementById("loadingIcon").style.display =
      document.getElementById("loadingIcon").style.display == "block"
          ? "none"
          : "block";
};

export function createUser() {
  setTimeout(() => {
      toggleLoadingIcon();
  }, 100);

  try {
      if (!getName()) {
          const errorMessage = "Usuário sem nome.";
          displayMessageToUser(errorMessage);
          throw new Error(errorMessage);
      }
      if (!getBirthDate()) {
          const errorMessage = "Data de nascimento não pode ser vazia.";
          displayMessageToUser(errorMessage);
          throw new Error(errorMessage);
      }

      if (!getEmail()) {
          const errorMessage = "Email não pode ser vazio.";
          displayMessageToUser(errorMessage);
          throw new Error(errorMessage);
      }

      if (!getPassword()) {
          const errorMessage = "Senha não pode ser vazia.";
          displayMessageToUser(errorMessage);
          throw new Error(errorMessage);
      }
      document.getElementById("txtMessage").innerHTML = "";
      cadastrarUsuarioLocalmente(); // Chama a nova função de cadastro local
  } catch (error) {
      console.error(error);
      displayMessageToUser(error.message); // Melhor feedback ao usuário
      return; // Evita a execução de código adicional após o erro
  }
}

const getEmail = () => {
  return document.getElementById("txtEmail").value;
};

const getPassword = () => {
  return document.getElementById("txtPassword").value;
};

const getName = () => {
  return document.getElementById("txtNome").value;
};

const getGender = () => {
  const rbMasculino = document.getElementById("rbMasculino");
  if (rbMasculino.checked) {
      return rbMasculino.value;
  }

  const rbFeminino = document.getElementById("rbFeminino");
  if (rbFeminino.checked) {
      return rbFeminino.value;
  }

  return "";
};

const getBirthDate = () => {
  return document.getElementById("calDataNasc").value;
};
const cadastrarUsuarioLocalmente = () => {
  const email = getEmail();
  const password = getPassword();

  // Verifica se o usuário já existe no armazenamento local
  const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioExistente = usuariosCadastrados.find(u => u.email === email);

  if (usuarioExistente) {
      displayMessageToUser("Esse email já está em uso.");
      return; // Interrompe o cadastro
  }

  // Cria um novo objeto de usuário
  const novoUsuario = {
      email: email,
      password: password,
      nome: getName(),
      genero: getGender(),
      dataNascimento: getBirthDate(),
      data: new Date()
  };

  // Adiciona o novo usuário ao array de usuários cadastrados
  usuariosCadastrados.push(novoUsuario);

  // Salva a lista atualizada no armazenamento local
  localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));

  setTimeout(() => {
      toggleLoadingIcon();
  }, 100);

  console.log("Usuário cadastrado com sucesso!");
  window.location.href = "entrar.html";
};
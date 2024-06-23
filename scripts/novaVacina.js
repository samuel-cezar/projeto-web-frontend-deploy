const message = document.getElementById("txtMessage");

const getDataVacinacao = () => {
  return document.getElementById("calDataVax").value;
};

const getNomeVacina = () => {
  return document.getElementById("txtVacina").value;
};

const getTipoDose = () => {
  const doseRadios = document.getElementsByName("tipo");
  for (let i = 0; i < doseRadios.length; i++) {
    if (doseRadios[i].checked) {
      return doseRadios[i].value;
    }
  }
};

const getProximaDataVacinacao = () => {
  return document.getElementById("calProxVax").value;
};

const cadastrarVacinaLocalmente = () => {
  // Em um sistema real, o ID do usuário viria do sistema de autenticação.
  // Aqui, estamos usando um ID fixo apenas para fins de exemplo.
  //const idUsuario = "Mx54JGtsMDXKM7UsCpWCxEvRHyR2";   !!precisa ser ajustado!!

  const novaVacina = {
    nomeVac: getNomeVacina(),
    proVac: getProximaDataVacinacao(),
    dataVac: getDataVacinacao(),
    tipoDose: getTipoDose(),
  };

  // Obtém o array de vacinas do usuário do localStorage, ou inicializa um array vazio
  let vacinasUsuario = JSON.parse(localStorage.getItem(`vacinas_${idUsuario}`)) || [];

  // Adiciona a nova vacina ao array
  vacinasUsuario.push(novaVacina);

  // Salva o array atualizado no localStorage
  localStorage.setItem(`vacinas_${idUsuario}`, JSON.stringify(vacinasUsuario));

  console.log("Vacina cadastrada com sucesso!");
};

document.getElementById("btnCadastrarVacina").addEventListener("click", () => {
  cadastrarVacinaLocalmente();
});
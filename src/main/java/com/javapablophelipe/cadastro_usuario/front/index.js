const form = document.getElementById("Padaria");
const listaClientes = document.getElementById("lista-clientes");
const btnSubmit = document.getElementById("btnSubmit");

let idCliente = 1;
let linhaEditando = null; // guarda a linha em edição

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const usuario = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("CPF").value,
    email: document.getElementById("Email").value,
    telefone: document.getElementById("Telefone").value,
    dataDeNascimento: document.getElementById("DataDeNascimento").value
  };


  if (linhaEditando) {
    // Atualiza a linha existente
    linhaEditando.cells[1].innerText = nome;
    linhaEditando.cells[2].innerText = cpf;
    linhaEditando.cells[3].innerText = email;
    linhaEditando.cells[4].innerText = telefone;
    linhaEditando.cells[5].innerText = nascimento;

    linhaEditando = null;
    btnSubmit.innerText = "Enviar"; // volta para Enviar
    btnSubmit.classList.remove("btn-success");
    btnSubmit.classList.add("btn-primary");
  } else {
    // Cria nova linha
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
      <td>${idCliente}</td>
      <td>${nome}</td>
      <td>${cpf}</td>
      <td>${email}</td>
      <td>${telefone}</td>
      <td>${nascimento}</td>
      <td>
        <button class="btn btn-success btn-sm" onclick="editarCliente(this)">Edite</button>
        <button class="btn btn-danger btn-sm" onclick="removerCliente(this)">X</button>
      </td>
    `;

    listaClientes.appendChild(novaLinha);
    idCliente++;
  }

  form.reset();
});

function removerCliente(botao) {
  botao.closest("tr").remove();
}

function editarCliente(botao) {
  linhaEditando = botao.closest("tr"); // guarda a linha que será editada
  const colunas = linhaEditando.querySelectorAll("td");

  document.getElementById("nome").value = colunas[1].innerText;
  document.getElementById("CPF").value = colunas[2].innerText;
  document.getElementById("Email").value = colunas[3].innerText;
  document.getElementById("Telefone").value = colunas[4].innerText;
  document.getElementById("DataDeNascimento").value = colunas[5].innerText;

  // muda o botão para salvar
  btnSubmit.innerText = "Salvar";
  btnSubmit.classList.remove("btn-primary");
  btnSubmit.classList.add("btn-success");
}
async function cadastrarUsuario() {
  const usuario = {
    nome: "João",
    cpf: "123.456.789-00",
    email: "joao@email.com",
    telefone: "(11) 99999-9999",
    dataDeNascimento: "1990-01-01"
  };

  const response = await fetch("http://localhost:8081/usuario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });

  if (response.ok) {
    alert("Usuário cadastrado com sucesso!");
  } else {
    alert("Erro ao cadastrar.");
  }
}
async function buscarUsuarioPorCpf(cpf) {
  const response = await fetch(`http://localhost:8081/usuario?cpf=${cpf}`);

  if (response.ok) {
    const usuario = await response.json();
    console.log("Usuário encontrado:", usuario);
    return usuario;
  } else {
    alert("Usuário não encontrado.");
    return null;
  }
}
async function atualizarUsuario(cpf) {
  const usuarioAtualizado = {
    nome: "João Atualizado",
    email: "novo@email.com",
    telefone: "(11) 90000-0000",
    dataDeNascimento: "1991-05-05"
    // CPF pode ou não ser alterado dependendo da lógica no back-end
  };

  const response = await fetch(`http://localhost:8081/usuario?cpf=${cpf}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuarioAtualizado)
  });

  if (response.ok) {
    alert("Usuário atualizado!");
  } else {
    alert("Erro ao atualizar.");
  }
}
async function deletarUsuario(cpf) {
  const response = await fetch(`http://localhost:8080/usuario?cpf=${cpf}`, {
    method: "DELETE"
  });

  if (response.ok) {
    alert("Usuário deletado com sucesso.");
  } else {
    alert("Erro ao deletar.");
  }
}
function adicionarCarrinho(nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push({ nome, preco });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert(nome + " foi adicionado ao carrinho!");
}

// Exemplo de "Ver mais produtos"
function verMaisProdutos() {
  alert("Aqui você poderia carregar mais produtos do banco de dados ou mostrar outros itens!");
}


let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

document.getElementById("Padaria").addEventListener("submit", function(e){
  e.preventDefault();

  let cliente = {
    id: clientes.length + 1,
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("CPF").value,
    email: document.getElementById("Email").value,
    telefone: document.getElementById("Telefone").value,
    nascimento: document.getElementById("DataDeNascimento").value
  };

  clientes.push(cliente);
  localStorage.setItem("clientes", JSON.stringify(clientes));

  listarClientes();
  this.reset();
});

function listarClientes(){
  let lista = document.getElementById("lista-clientes");
  lista.innerHTML = "";
  clientes.forEach(c => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.nome}</td>
      <td>${c.cpf}</td>
      <td>${c.email}</td>
      <td>${c.telefone}</td>
      <td>${c.nascimento}</td>
      <td><button class="btn btn-danger btn-sm" onclick="removerCliente(${c.id})">Excluir</button></td>
    `;
    lista.appendChild(tr);
  });
}

function removerCliente(id){
  clientes = clientes.filter(c => c.id !== id);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  listarClientes();
}

listarClientes();

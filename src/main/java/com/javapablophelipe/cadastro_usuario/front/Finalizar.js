// ==========================
// Carregar Resumo da Compra
// ==========================
async function carregarResumo() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    document.getElementById("resumoCompra").innerHTML =
      '<li class="list-group-item">Carrinho vazio</li>';
    document.getElementById("totalCompra").textContent = "0,00";
    return;
  }

  try {
    // Buscar lista de produtos no backend
    const response = await fetch("http://localhost:8081/padarias");
    const produtos = await response.json();

    const resumo = document.getElementById("resumoCompra");
    resumo.innerHTML = "";
    let total = 0;

    // Montar lista de produtos do carrinho
    carrinho.forEach(id => {
      const produto = produtos.find(p => p.id === id);
      if (produto) {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        item.innerText = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
        resumo.appendChild(item);
        total += produto.preco;
      }
    });

    // Exibir total
    document.getElementById("totalCompra").textContent = total.toFixed(2);

  } catch (error) {
    console.error("Erro ao carregar resumo:", error);
    alert("Erro ao carregar os produtos. Verifique o backend (porta 8081).");
  }
}

// ==========================
// Finalizar Compra
// ==========================
async function finalizarCompra() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const usuarioId = document.getElementById("usuarioId").value;

  if (!usuarioId || carrinho.length === 0) {
    alert("Preencha o ID do usuário e adicione produtos.");
    return;
  }

  const compraDTO = {
    usuarioId: parseInt(usuarioId),
    produtosIds: carrinho
  };

  try {
    const response = await fetch("http://localhost:8081/compras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(compraDTO)
    });

    if (response.ok) {
      alert("Compra finalizada com sucesso!");
      localStorage.removeItem("carrinho");
      carregarResumo(); // recarregar vazio
    } else {
      const erro = await response.text();
      alert("Erro ao finalizar compra: " + erro);
    }
  } catch (error) {
    console.error("Erro ao enviar compra:", error);
    alert("Falha ao comunicar com o servidor.");
  }
}

// ==========================
// Limpar Carrinho
// ==========================
function limparCarrinho() {
  localStorage.removeItem("carrinho");
  carregarResumo();
}

// ==========================
// Executar ao abrir a página
// ==========================
window.onload = carregarResumo;

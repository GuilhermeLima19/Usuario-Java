async function carregarProdutos() {
    try {
      const response = await fetch("http://localhost:8081/padarias"); // seu endpoint de produtos
      const produtos = await response.json();
  
      const lista = document.getElementById("lista-produtos");
      lista.innerHTML = "";
  
      produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-3");
  
        card.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${produto.nome}</h5>
              <p class="card-text">Preço: R$ ${produto.preco.toFixed(2)}</p>
              <button class="btn btn-primary" onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
            </div>
          </div>
        `;
  
        lista.appendChild(card);
      });
    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    }
  }
  
  function adicionarAoCarrinho(idProduto) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(idProduto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
  }
  
  window.onload = carregarProdutos;
  function adicionarCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push({ nome, preco });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(nome + " foi adicionado ao carrinho!");
  }

  function adicionarCarrinho(idProduto) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(idProduto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
  }
  
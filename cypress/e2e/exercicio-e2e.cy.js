/// <reference types="cypress" />

import produtosPage from "../support/page-objects/produtos.page";
import pedidoPage from "../support/page-objects/pedido.page"

context("Exercicio - Testes End-to-end - Fluxo de pedido", () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
    cy.visit("/minha-conta");
    cy.fixture("perfil").then((dados) => {
      cy.login(dados.usuario, dados.senha);
    });
  });

  it("Deve fazer um pedido na loja Ebac Shop de ponta a ponta", () => {
    //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações

    // Buscar e adicionar 4 produtos ao carrinho
    cy.fixture("produtos").then((dados) => {
      dados.forEach((produto) => {
        produtosPage.buscarProduto(produto.nomeProduto);
        produtosPage.addProdutoCarrinho(
          produto.tamanho,
          produto.cor,
          produto.quantidade
        );
        cy.get(".woocommerce-message").should("contain", produto.quantidade);
      });
    });

    // Ir para o carrinho
    cy.visit("/carrinho");

    // Ir para a página de checkout
    cy.get(".checkout-button").click();
    cy.get("#terms").click();

    // Finaliza o pedido
    cy.get("#place_order").click();

    cy.wait(10000)

    // Verifica se a URL contém a parte fixa da página de confirmação
    cy.url().should('include', '/checkout/order-received/');


    // Validar que o pedido foi realizado com sucesso
    cy.get(".woocommerce-notice").should(
      "contain",
      "Obrigado. Seu pedido foi recebido."
    );

    // Verificar os detalhes do pedido
    pedidoPage.validarDetalhesPedido();
  });
});

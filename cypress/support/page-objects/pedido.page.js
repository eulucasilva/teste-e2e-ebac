class PedidoPage {
    // Verifica os detalhes do pedido
    validarDetalhesPedido() {
      cy.fixture('produtos').then((produtosEsperados) => {
        cy.get('tbody tr.woocommerce-table__line-item').each(($row, index) => {
          const produtoEsperado = produtosEsperados[index];
          
          cy.wrap($row).within(() => {
            // Valida o nome do produto
            cy.get('.product-name a').invoke('text').then((texto) => {
              const nomeProduto = texto.trim().split(' - ')[0]; // Remove tamanho e cor do nome
              expect(nomeProduto).to.equal(produtoEsperado.nomeProduto);
            });
  
            // Valida a quantidade do produto
            cy.get('.product-quantity').invoke('text').then((quantidadeTexto) => {
              // Remove caracteres não numéricos e espaços
              const quantidade = parseInt(quantidadeTexto.replace(/×|\s+/g, ''), 10);
              expect(quantidade).to.equal(produtoEsperado.quantidade);
            });
          });
        });
      });
    }
  }
  
  export default new PedidoPage();
  
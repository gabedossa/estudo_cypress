// Custom commands for agenda de contatos tests

Cypress.Commands.add('adicionarContato', (nome, sobrenome, email, telefone) => {
  cy.get('[data-testid="btn-novo-contato"], button').contains(/novo contato|adicionar|add/i).click()
  cy.get('input[placeholder*="Nome"], input[name*="nome"], input[id*="nome"]').first().type(nome)
  cy.get('input[placeholder*="Sobrenome"], input[name*="sobrenome"], input[id*="sobrenome"]').first().type(sobrenome)
  cy.get('input[placeholder*="E-mail"], input[name*="email"], input[id*="email"]').first().type(email)
  cy.get('input[placeholder*="Telefone"], input[name*="telefone"], input[id*="telefone"]').first().type(telefone)
  cy.get('button[type="submit"], button').contains(/salvar|cadastrar|confirmar/i).click()
})

describe('Agenda de Contatos', () => {
  const contato = {
    nome: 'Maria',
    sobrenome: 'Silva',
    email: 'maria.silva@email.com',
    telefone: '11999998888',
  }

  const contatoEditado = {
    nome: 'Maria',
    sobrenome: 'Oliveira',
    email: 'maria.oliveira@email.com',
    telefone: '11988887777',
  }

  beforeEach(() => {
    cy.visit('/')
  })

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function abrirFormularioNovo() {
    cy.contains(/novo contato|adicionar|add/i).click()
  }

  function preencherFormulario({ nome, sobrenome, email, telefone }) {
    cy.get('input[placeholder*="Nome"], input[name*="nome"], input[id*="nome"]').first().clear().type(nome)
    cy.get('input[placeholder*="Sobrenome"], input[name*="sobrenome"], input[id*="sobrenome"]').first().clear().type(sobrenome)
    cy.get('input[placeholder*="E-mail"], input[name*="email"], input[id*="email"]').first().clear().type(email)
    cy.get('input[placeholder*="Telefone"], input[name*="telefone"], input[id*="telefone"]').first().clear().type(telefone)
  }

  function salvarFormulario() {
    cy.contains(/salvar|cadastrar|confirmar|ok/i).click()
  }

  // ─── Inclusão ─────────────────────────────────────────────────────────────

  describe('Inclusão de contato', () => {
    it('deve exibir o botão para adicionar novo contato', () => {
      cy.contains(/novo contato|adicionar|add/i).should('be.visible')
    })

    it('deve abrir o formulário ao clicar em Novo Contato', () => {
      abrirFormularioNovo()
      cy.get('input').should('have.length.at.least', 1)
    })

    it('deve adicionar um novo contato com sucesso', () => {
      abrirFormularioNovo()
      preencherFormulario(contato)
      salvarFormulario()

      cy.contains(contato.nome, { timeout: 6000 }).should('be.visible')
    })
  })

  // ─── Alteração ────────────────────────────────────────────────────────────

  describe('Alteração de contato', () => {
    beforeEach(() => {
      // Garante que o contato existe antes de editar
      abrirFormularioNovo()
      preencherFormulario(contato)
      salvarFormulario()
      cy.contains(contato.nome, { timeout: 6000 }).should('be.visible')
    })

    it('deve abrir o formulário de edição ao clicar em Editar', () => {
      cy.contains(contato.nome)
        .parents('li, tr, [class*="card"], [class*="item"], [class*="contato"]')
        .first()
        .within(() => {
          cy.contains(/editar|edit/i).click()
        })

      cy.get('input').should('have.length.at.least', 1)
    })

    it('deve alterar os dados do contato com sucesso', () => {
      cy.contains(contato.nome)
        .parents('li, tr, [class*="card"], [class*="item"], [class*="contato"]')
        .first()
        .within(() => {
          cy.contains(/editar|edit/i).click()
        })

      preencherFormulario(contatoEditado)
      salvarFormulario()

      cy.contains(contatoEditado.sobrenome, { timeout: 6000 }).should('be.visible')
    })
  })

  // ─── Remoção ──────────────────────────────────────────────────────────────

  describe('Remoção de contato', () => {
    beforeEach(() => {
      // Garante que o contato existe antes de remover
      abrirFormularioNovo()
      preencherFormulario(contato)
      salvarFormulario()
      cy.contains(contato.nome, { timeout: 6000 }).should('be.visible')
    })

    it('deve remover o contato com sucesso', () => {
      cy.contains(contato.nome)
        .parents('li, tr, [class*="card"], [class*="item"], [class*="contato"]')
        .first()
        .within(() => {
          cy.contains(/excluir|remover|deletar|delete|remove/i).click()
        })

      // Confirma modal de exclusão se existir
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Confirmar"), button:contains("Sim"), button:contains("OK")').length > 0) {
          cy.contains(/confirmar|sim|ok/i).click()
        }
      })

      cy.contains(contato.nome, { timeout: 6000 }).should('not.exist')
    })
  })
})

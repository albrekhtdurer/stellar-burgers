describe('тестируем работу с ингредиентами и конструктором', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/orders/all', { fixture: 'orders.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });

    window.localStorage.setItem('refreshToken', JSON.stringify('test-myToken'));
    cy.setCookie('accessToken', 'test-myAccessToken');
  });

  it('добавление начинки в конструктор', () => {
    cy.visit('http://localhost:4000');
    const name = 'Биокотлета из марсианской Магнолии';
    const id = '2';
    const button = cy.get(`[data-cy=add_${id}]`).find('button');
    button.click();
    const constructorElement = cy.get(`[data-cy=element_${id}]`);
    constructorElement.contains(name);
  });
  it('добавление булок в конструктор', () => {
    cy.visit('http://localhost:4000');
    const name = 'Краторная булка N-200i';
    const id = '1';
    const button = cy.get(`[data-cy=add_${id}]`).find('button');
    button.click();
    const topBun = cy.get(`[data-cy=bun_top_${id}]`);
    const bottomBun = cy.get(`[data-cy=bun_bottom_${id}]`);
    topBun.contains(name);
    bottomBun.contains(name);
  });
  it('работа с модальным окном ингредиента - открытие и закрытие по кнопке', () => {
    cy.visit('http://localhost:4000');
    const id = '2';
    const linkToModal = cy.get(`[data-cy=open_modal_${id}]`);
    linkToModal.click();
    const modal = cy.get('[data-cy=modal]');
    modal.should('be.visible');
    const closeButton = cy.get('[data-cy=modal_close]');
    closeButton.click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('работа с модальным окном ингредиента - открытие и закрытие по клику на оверлей', () => {
    cy.visit('http://localhost:4000');
    const id = '2';
    const linkToModal = cy.get(`[data-cy=open_modal_${id}]`);
    linkToModal.click();
    const modal = cy.get('[data-cy=modal]');
    modal.should('be.visible');
    const body = cy.get('body');
    body.click(0, 0);
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

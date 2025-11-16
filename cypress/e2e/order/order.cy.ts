describe('тестируем оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/orders/all', { fixture: 'orders.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

    window.localStorage.setItem('refreshToken', JSON.stringify('test-myToken'));
    cy.setCookie('accessToken', 'test-myAccessToken');
  });

  it('оформление заказа', () => {
    cy.visit('/');
    const bun = { name: 'Краторная булка N-200i', id: '1' };
    const ingredients = [
      { name: 'Биокотлета из марсианской Магнолии', id: '2' },
      { name: 'Говяжий метеорит (отбивная)', id: '7' },
      { name: 'Соус Spicy-X', id: '4' }
    ];
    const orderNumber = '94265';

    cy.get(`[data-cy=add_${bun.id}]`).find('button').click();
    ingredients.forEach((ingredient) => {
      cy.get(`[data-cy=add_${ingredient.id}]`).find('button').click();
    });

    const orderButton = cy.get('[data-cy=order_button]').find('button');
    orderButton.click();

    const modal = cy.get('[data-cy=modal]');
    modal.should('be.visible');
    modal.contains(orderNumber);
    const closeButton = cy.get('[data-cy=modal_close]');
    closeButton.click();
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get(`[data-cy=bun_top_${bun.id}]`).should('not.exist');
    cy.get(`[data-cy=bun_bottom_${bun.id}]`).should('not.exist');
    ingredients.forEach((ingredient) => {
      cy.get(`[data-cy=ingredient_${ingredient.id}]`).should('not.exist');
    });
  });
});

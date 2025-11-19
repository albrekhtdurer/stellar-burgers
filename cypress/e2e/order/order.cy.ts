import {
  addButtonSelector,
  bottomBunSelector,
  ingredientSelector,
  modalCloseButtonSelector,
  modalSelector,
  topBunSelector
} from '../constants';

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

    cy.get(addButtonSelector(bun.id)).find('button').click();
    ingredients.forEach((ingredient) => {
      cy.get(addButtonSelector(ingredient.id)).find('button').click();
    });

    const orderButton = cy.get('[data-cy=order_button]').find('button');
    orderButton.click();

    cy.get(modalSelector).as('modal').should('be.visible');
    cy.get('@modal').contains(orderNumber);
    const closeButton = cy.get(modalCloseButtonSelector);
    closeButton.click();
    cy.get('@modal').should('not.exist');
    cy.get(topBunSelector(bun.id)).should('not.exist');
    cy.get(bottomBunSelector(bun.id)).should('not.exist');
    ingredients.forEach((ingredient) => {
      cy.get(ingredientSelector(ingredient.id)).should('not.exist');
    });
  });
});

import {
  modalSelector,
  addButtonSelector,
  modalCloseButtonSelector,
  linkToModalSelector,
  ingredientSelector,
  topBunSelector,
  bottomBunSelector
} from '../constants';

describe('тестируем работу с ингредиентами и конструктором', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/orders/all', { fixture: 'orders.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });

    window.localStorage.setItem('refreshToken', JSON.stringify('test-myToken'));
    cy.setCookie('accessToken', 'test-myAccessToken');
    cy.visit('/');
  });

  it('добавление начинки в конструктор', () => {
    const name = 'Биокотлета из марсианской Магнолии';
    const id = '2';
    cy.get(addButtonSelector(id)).find('button').as('addButton');
    cy.get('@addButton').click();
    cy.get(ingredientSelector(id)).contains(name);
  });
  it('добавление булок в конструктор', () => {
    const name = 'Краторная булка N-200i';
    const id = '1';
    cy.get(addButtonSelector(id)).find('button').as('addButton');
    cy.get('@addButton').click();
    cy.get(topBunSelector(id)).contains(name);
    cy.get(bottomBunSelector(id));
  });
  it('работа с модальным окном ингредиента - открытие и закрытие по кнопке', () => {
    const id = '2';
    cy.get(linkToModalSelector(id)).as('linkToModal');
    cy.get('@linkToModal').click();
    cy.get(modalSelector).as('modal');
    cy.get('@modal').should('be.visible');
    cy.get(modalCloseButtonSelector).as('closeButton');
    cy.get('@closeButton').click();
    cy.get('@modal').should('not.exist');
  });
  it('работа с модальным окном ингредиента - открытие и закрытие по клику на оверлей', () => {
    const id = '2';
    cy.get(linkToModalSelector(id)).as('linkToModal');
    cy.get('@linkToModal').click();
    cy.get(modalSelector).as('modal');
    cy.get('@modal').should('be.visible');
    cy.get('body').click(0, 0);
    cy.get('@modal').should('not.exist');
  });
});

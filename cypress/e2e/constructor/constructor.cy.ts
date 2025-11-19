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
    const button = cy.get(addButtonSelector(id)).find('button');
    button.click();
    const constructorElement = cy.get(ingredientSelector(id));
    constructorElement.contains(name);
  });
  it('добавление булок в конструктор', () => {
    const name = 'Краторная булка N-200i';
    const id = '1';
    const button = cy.get(addButtonSelector(id)).find('button');
    button.click();
    const topBun = cy.get(topBunSelector(id));
    const bottomBun = cy.get(bottomBunSelector(id));
    topBun.contains(name);
    bottomBun.contains(name);
  });
  it('работа с модальным окном ингредиента - открытие и закрытие по кнопке', () => {
    const id = '2';
    const linkToModal = cy.get(linkToModalSelector(id));
    linkToModal.click();
    const modal = cy.get(modalSelector);
    modal.should('be.visible');
    const closeButton = cy.get(modalCloseButtonSelector);
    closeButton.click();
    cy.get(modalSelector).should('not.exist');
  });
  it('работа с модальным окном ингредиента - открытие и закрытие по клику на оверлей', () => {
    const id = '2';
    const linkToModal = cy.get(linkToModalSelector(id));
    linkToModal.click();
    const modal = cy.get(modalSelector);
    modal.should('be.visible');
    const body = cy.get('body');
    body.click(0, 0);
    cy.get(modalSelector).should('not.exist');
  });
});

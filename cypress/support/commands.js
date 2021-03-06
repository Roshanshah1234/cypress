
Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/parts')
    cy.get('#username')
        .type('ssamal@tekion.com')
    cy.get('#password').type('Tekion123')
    cy.contains('Login').click()

})

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add("restoreLocalStorage", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

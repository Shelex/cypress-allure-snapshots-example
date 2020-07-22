describe('Integration of allure and snapshot plugins', () => {
    it('should attach screenshots from snapshot plugin', () => {
        cy.visit('/moretypes/15');
        cy.get('.bar.module-bar > span').should('have.text', '15/27');
        cy.document().toMatchImageSnapshot();
    });
});

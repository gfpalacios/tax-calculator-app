describe('Tax Calculator App', () => {
  it('should load the home page', () => {
    cy.visit('/');
    cy.contains('Tax Calculator').should('be.visible');
  });

  it('should perform a basic tax calculation', () => {
    cy.visit('/');
    
    cy.get('input[type="number"]').type('50000');
    
    cy.get('.MuiOutlinedInput-root').contains('2022').parent().click().then(() => {
        cy.get('li').contains('2022').click();
    });
    
    cy.get('button[type="submit"]').click();
    
    cy.contains('Results for 2022').should('be.visible');
    cy.contains('Total Tax Owed').should('be.visible');
    cy.contains('Effective Tax Rate').should('be.visible');
    
    cy.get('table').should('be.visible');
    cy.get('th').contains('Tax Band (Range)').should('be.visible');
  });

  it('should calculate tax for a different year (2019)', () => {
    cy.visit('/');
    cy.get('input[type="number"]').type('80000');
    
    cy.get('.MuiOutlinedInput-root').contains('2022').parent().click().then(() => {
        cy.get('li').contains('2019').click();
    });
    
    cy.get('button[type="submit"]').click();
    cy.contains('Results for 2019').should('be.visible');
  });

  it('should show error for invalid salary', () => {
    cy.visit('/');
    cy.get('input[type="number"]').type('-1000');
    cy.get('button[type="submit"]').click();
    cy.contains('Please enter a valid salary').should('be.visible');
  });
});

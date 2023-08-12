/// <reference types="cypress" />

describe('Our first suite', () => {
   
    it('First test: Find different locators for Email', () => {

        cy.visit('/') //Ya tengo la URL en .config
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        /*
        <div _ngcontent-ldj-c18="" class="col-sm-9">
        <input _ngcontent-ldj-c18="" data-cy="imputEmail1" fullwidth="" id="inputEmail1" nbinput="" placeholder="Email" type="email" ng-reflect-full-width="" class="input-full-width size-medium shape-rectangle">
        <div data-lastpass-icon-root="true" style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;"></div></div>
        */

        // by TAG NAME:
        cy.get('input')

        // by #ID:
        cy.get('#inputEmail1')

        // by .CLASS NAME: puedo usar un solo Class value
        cy.get('.input-full-width')

        // by [ATTRIBUTE NAME]:
        cy.get('[placeholder]')

        // by [ATTRIBUTE NAME=VALUE]:
        cy.get('[placeholder="Email"]')

        // by [CLASS=VALUE]: debo usar todos los Class values que haya
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by TAG NAME and [ATTRIBUTE=VALUE]:
        cy.get('input[placeholder="Email"]')

        // by [TWO] different [ATTRIBUTES]:
        cy.get('[placeholder="Email"][type="email"]')

        // by TAG NAME, [ATTR=VALUE], #ID and .CLASS NAME:
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // by [MY OWN ATTRIBUTE] (recomended by Cypress)
        cy.get('[data-cy="imputEmail1"]')

    })  

    /*
    .get: busca elem en el DOM 
    .find: busca elem en el PARENT elem
    .contain: busca elem by TEXT, y by LOCATORS
    */

    it.only('Second test: Find Sign In button with MY LOCATOR', () => {

        cy.visit('/') //Ya tengo la URL en .config
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

       // Buscar en la lupa: type="submit" para crear MY LOCATOR
       cy.get('[gianLocator="signInButton"]')
       cy.contains("Sign in")

       //Dentro del Locator, buscar el texto:
       cy.contains('[status="warning"]', "Sign in")

       //Busco el boton, para eso busco el mail y la caja que contiene a ambos
       cy.get('#inputEmail3')
        .parents('form').find('button')
        .should('contain', 'Sign in')
        .parents('form').find('[class="custom-checkbox"]') // o: ('[nb-checkbox]')
        .click()

        //Find nb-card, which contains Horiz, y dentro, buscar el Attr type
        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
    })

})
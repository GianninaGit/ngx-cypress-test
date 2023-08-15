import { navigateTo } from "../support/page_objects/navigationPage"

describe('Test with Page Objects', () => {

    beforeEach('open application', () => {
        cy.visit('/')
    })

    it('Verify navigations accross the pages', () => {
        //Reutilizar: ir a support, creo new folder y navigationPage.js - Llamar al objeto
        navigateTo.formLayoutPage()
        navigateTo.datePickerPage()
    })
})
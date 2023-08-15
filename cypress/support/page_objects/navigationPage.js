import exp from "constants"

export class NavigationPage {

    formLayoutPage() {
        //cy.contains('Forms').click()
        cy.contains('a', 'Form').then(menu => {
            cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
                if(attr.includes('left')){ //Form menu estaría cerrado
                    cy.wrap(menu).click() 
                } else {
                    cy.contains('Form Layouts').click()
                }
            })
        })
    }

    datePickerPage() {
        //cy.contains('Forms').click()
        cy.contains('a', 'Form').then(menu => {
            cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
                if(attr.includes('left')){ //Form menu estaría cerrado
                    cy.wrap(menu).click() 
                } else {
                    cy.contains('Datepicker').click()
                }
            })
        })   
    }
}

// Creo nueva instancia/objeto de esta clase
export const navigateTo = new NavigationPage()
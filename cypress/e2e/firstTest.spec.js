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
    .find: busca CHILD elem en el PARENT elem
    .contain: busca elem by TEXT, y by LOCATORS
    */

    it('Second test: Find Sign In button with MY LOCATOR', () => {

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

    /**Cypress:
        Busco el locator nb-card con el texto y lo guardo en en la funcion "firstForm"
         sería: function FunctionName(firstForm) -es un parametro-.
         luego le aplico find y busco el texto, guardándolo en una const
        Al usar .then, firstForm deja de ser un elem de cypress, y pasa a ser
              un elem Jquery object. 
        JQuery no admite fc como .click() or .type() or .should() or find()
        JQuery sí admite: .find() .text() .to.equal() 
              y guardar el parametro en una constante para reutilizarla
        Para convertir la JQuery en Cypres elemnt, uso cy.wrap()*/

    it('Then and Wrap methods', () => {

        cy.visit('/') //Ya tengo la URL en .config
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        /*
        Cypress repetitivo:
            cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]')
                .should('contain', 'Email')
            cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]')
                .should('contain', 'Password')

            cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]')
                .should('contain', 'Email address')
            cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]')
                .should('contain', 'Password')

        Selenium:
        const firstForm = cy.contains('nb-card', 'Using the Grid')
        firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
        fistForm.find('[for="inputPassword2"]').should('contain', 'Password')
        */

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            expect(emailLabelFirst).to.equal('Email')

            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(passwordLabelFirst).to.equal('Password')
        

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelSecond).to.equal(passwordLabelFirst)

                cy.wrap(secondForm).find('[for="exampleInputEmail1"]')
                .should('contain', 'Email address')
                

            })
        })
    })

    it('Invoke command', () => {

        /* REPASAR VIDEO 25 (invoke) y 31 (assertions)
        <div class="form-group row">
            <label class="col-sm-2 label">Radios</label>
        </div>
        Get the value of the class for <label> web element using "invoke()" command:
        cy.get('label').invoke('attr', 'class')

        Get the <div>, save the context using "then()" and then click on "label":
        cy.get('div').then(element =>{
            cy.wrap(element).find('label').click()
        })

        What syntax for the assertion of the text "Radios" is correct?:
        cy.get('label').should('contain', 'Radios')

        What syntax for the assertion of the class value "label" is correct?:
        cy.get('label').invoke('attr', 'class').then(class => {
            expect(class).to.contain('label')
        })
        */

        cy.visit('/') //Ya tengo la URL en .config
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Get text from web page:
        // 1:
        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
            .should('have.class', 'label')
            .and('have.text', 'Email address')
        // 2:
        cy.get('[for="exampleInputEmail1"]').then( parametroDeFuncion => {
            expect(parametroDeFuncion.text()).to.equal('Email address')
            //guardo el resultado de la fc en el parametro (Jquery element) y 
            // le aplico JQ method: text() para obtener el texto
            // y luego hago assertion
            expect(parametroDeFuncion).to.have.class('label')
            expect(parametroDeFuncion).to.have.text('Email address')
        })
        // 3: Invoke command: texto
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })
        // 4: Invoke command: checkbox, uso elem padre
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //.should('contain', 'checked')
            .then(parametro => {
                expect(parametro).to.equal('custom-checkbox checked')
            })
    })
    // 5: Invoke command: usar propiedades de los elem:
    it('Assert property of text', () => {
        cy.visit('/') //Ya tengo la URL en .config
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
                cy.wrap(input).click()
                cy.get('nb-calendar-day-picker').contains('14').click()
                cy.wrap(input).invoke('prop', 'value')
                    .should('contain', 'Aug 14, 2023')
            })
    })

    it('Radio button', () => {
        cy.visit('/') //Ya tengo la URL en .config
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( threeRadioButtons => {
            cy.wrap(threeRadioButtons)
                .first() // = .eq(0)
                .check({force: true})
                .should('be.checked')
            cy.wrap(threeRadioButtons)
                .eq(1)
                .check({force: true})
            cy.wrap(threeRadioButtons)
                .first()
                .should('not.be.checked')
            cy.wrap(threeRadioButtons)
                .eq(2)
                .should('be.disabled')
        })
    })

    it('Checkbox', () => {
        cy.visit('/') //Ya tengo la URL en .config
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // .check() marca todo, si quiero desmarcar: .click()
        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})

    })  
    
    it('Datepicker', () => {
        /*
        Date() object: obtiene la fecha actual
        Obtengo días y meses futuros, y los uso como condiciones para clicker las flechitas y modificar el mes
        Se extrajo la función del test, para reutilizarla
        */
        function selectDayFromCurrent(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }

        cy.visit('/') //Ya tengo la URL en .config
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(100)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })

    })

    it('Lists and dropdowns', () => {
        cy.visit('/')

        // 1 DROPDOWN:
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark') //esto desaparece luego de clickerarlo!
        // Background color change: Style (hex #222b45) cambiarlo a RGB 34, 43, 69
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        // 2 LISTS:
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            // .each() puede usar hasta 3 parametros: 1: iterador para cada loop, 2: índice
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim() //.trim() elimina el espacio que hay al inicio de cada palabra
                
                const colors = {
                    "Light" : "rgb(255, 255, 255)", 
                    "Dark" : "rgb(34, 43, 69)",
                    "Cosmic" : "rgb(50, 50, 89)",
                    "Corporate" : "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                
                if(index < 3) {
                    cy.wrap(dropdown).click()
                }
            })
        })
    })

    it('Tables', () => {
        cy.visit('/') //Ya tengo la URL en .config
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1: Buscar tabla por nombre y hacer cambios:
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        // 2: Añadir un campo nuevo
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableColums => {
            cy.wrap(tableColums).eq(2).should('contain', 'Artem')
            cy.wrap(tableColums).eq(3).should('contain', 'Bondar')
        })

        // 3: 
        const age = [20, 30, 40, 200]
        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
    })

    it('Tooltip', () => {
        cy.visit('/') //Ya tengo la URL en .config
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('Dialog box', () => {
        cy.visit('/') //Ya tengo la URL en .config
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1: Solución a cuando el msj de Cancel-Ok no aparece (no: xq depende de evento window:confirm)
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        // 2: stub estará vacío, y sirve
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

          // 3: Clickear en cancel button
          cy.get('tbody tr').first().find('.nb-trash').click()
          cy.on('window:confirm', () => false)


    })
})
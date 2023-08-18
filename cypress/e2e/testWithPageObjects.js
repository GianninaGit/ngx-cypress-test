import { on } from "events"
import { onDatepickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Objects', () => {

    beforeEach('open application', () => {
        cy.visit('/')
    })

    it('Verify navigations accross the pages', () => {
        //Reutilizar: ir a support, creo new folder y navigationPage.js - Llamar al objeto
        navigateTo.formLayoutPage()
        navigateTo.datePickerPage()
        navigateTo.toasterPage()
        navigateTo.smartTablesPage()
        navigateTo.tooltipPage()
    })

    it.only('Should submit Inline and Basic Form, and select tomorrow date in the calendar', () => {
        /*navigateTo.formLayoutPage()
        //para importar automáticamente el objeto/instancia, primero, escribirlo
        onFormLayoutsPage.submitInlineFormWithNameAndLastname('Artem', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
        navigateTo.datePickerPage()
        onDatepickerPage.selectCommonDatepickerDateFromToday(1)
        onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)*/
        navigateTo.smartTablesPage()
        onSmartTablePage.addNewRecordWithFirstAndLastname('Marie', 'Avril')
        onSmartTablePage.updateAgeByFirstName('Marie', 9)
        onSmartTablePage.deleteRowByIndex(2)

    })
})
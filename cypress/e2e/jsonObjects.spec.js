/// <reference types="cypress" />

describe('JSON Objects', () => {

    it.only('JSON Objects', () => {
        cy.openHomePage()
        
        const simpleObject = { "key": "value", "key2": "value2" }
        const simpleArrayOfValues = ["one", "two", "three"]
        const arrayOfObjects = [{"key": "value", "key2": "value2"}]
        const typesOfData = {"string": "Marie", "Int": 10}
        const mix = {
            "FirstName" : "Artem", 
            "Age": 35, 
            "Students": [
                {
                    "firstName": "Marie", 
                    "lastName": "Avril"
                }
            ]
        }

        console.log(simpleObject.key2)
        console.log(simpleObject["key2"])
        console.log(simpleArrayOfValues[1])
        console.log(arrayOfObjects[0].key)
        console.log(mix.Students[0].firstName)

        const constante = mix.Students[0].firstName

    })
})
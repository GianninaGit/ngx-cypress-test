// TEST STRUCTURE:

// usar describe() o context() es lo mismo

describe('Our first suite', () => {

    describe('Our suite section', () => {

        beforeEach('code for every test', () => {
            // repetitive code 
        })

        it('some test name', () => {
            //beforeEach will be executed here
            // here test
        })

        it('some test name', () => {
            //beforeEach will be executed here 
            // here test
        })
         
    })
   
    it('first test', () => {
        // here test
    })

    it('second test', () => {
        // here test
    })

    it('thrid test', () => {
        // here test
    })

})

describe('Our second suite', () => {
   
    it('first test', () => {
        // here test
    })

    it('second test', () => {
        // here test
    })

    it('thrid test', () => {
        // here test
    })
    
})
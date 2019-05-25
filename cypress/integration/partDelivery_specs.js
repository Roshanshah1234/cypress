/// <reference types="Cypress" />


describe('parts Delivery', () => {
    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.fixture('sales').as('datas')
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it('Adding part delivery', () => {
        //cy.login()
        cy.get('#headerMenuBtn').click()
        cy.contains('PD').click()
        cy.wait(20000)
        cy.contains('Add New').click()

    })
    it('adding sales order', () => {
        cy.get('#SALES_ORDER').type('1558691317741', { force: true }).wait(2000).get('#react-select-2-option-0').click()
    })

    it('checking customer name', () => {
        cy.get('@datas').then((data) => {
            cy.get('#CUSTOMER')
                .should('have.value', data.customer)
        })

    })
    it('checking sales type', () => {
        cy.get('@datas').then((data) => {
            cy.get('#SALES_TYPE')
                .should('have.value', "Retail")

            cy.get('#DRIVER').type('12')
        })
    })
    it('editing address field', () => {
        cy.get('@datas').then((address) => {
            cy.get('.icon_size__md__1hqw3').click()
            cy.get('#line1').clear().type(address.line1).should('have.value', address.line1)
            cy.get('#line2').clear().type(address.line2).should('have.value', address.line2)
            cy.get('#postalCode').clear().type(address.postalCode).should('have.value', address.postalCode)
            cy.get('#city').clear().type(address.city).should('have.value', address.city)
            cy.get('#state').clear().type(address.state).should('have.value', address.state)
            cy.get('#country').clear().type(address.country).should('have.value', address.country)
            cy.get('.ant-modal-footer > div > .buttonWrapper_primaryButton__3MMKW').click()
        })
    })

    it('checking part table values', () => {
        cy.get('@datas').then((data) => {
            cy.get('#app > div > div.tek-container.full-height > div > div:nth-child(2) > div > div > div.section_container__3lCsn.config_maxWidth__JzUYY.config_subFormSection__2OkZQ > div > div > div > div > div.rt-tbody > div:nth-child(1) > div > div:nth-child(1) > div')
            //.should('have.text', data.part)
            cy.get('#app > div > div.tek-container.full-height > div > div:nth-child(2) > div > div > div.section_container__3lCsn.config_maxWidth__JzUYY.config_subFormSection__2OkZQ > div > div > div > div > div.rt-tbody > div > div > div:nth-child(3) > div')
                .should('have.text', data.saleQty)
            // cy.get('#app > div > div.tek-container.full-height > div > div:nth-child(2) > div > div > div.section_container__3lCsn.config_maxWidth__JzUYY.config_subFormSection__2OkZQ > div > div > div > div > div.rt-tbody > div:nth-child(1) > div > div:nth-child(5) > div')
            //     .should('have.text', data.sellingPrice)
            ///cy.get('.buttonWrapper_primaryButton__3MMKW').click()

        })
    })

    it('checking parts delivery DashBoard', () => {
        cy.get('@datas').then((data) => {

        })
    })

    // it('navigating back and checking all the saved values', () => {
    //     cy.contains('Roshan shah').click()
    //     cy.get('@datas').then((data)=>{
    //         cy.get('#CUSTOMER')
    //         .should('have.value', data.customer)
    //     cy.get('#SALES_TYPE')
    //         .should('have.value', data.saleType)
    //     cy.get('.icon_size__md__1hqw3').click()
    //     cy.get('#line1').should('have.value', data.line1)
    //     cy.get('#line2').should('have.value', data.line2)
    //     cy.get('#postalCode').should('have.value', data.postalCode)
    //     cy.get('#city').clear().should('have.value', data.city)
    //     cy.get('#state').should('have.value', data.state)
    //     cy.get('#country').should('have.value', data.country)
    //     cy.get('.ant-modal-footer > div > .buttonWrapper_primaryButton__3MMKW').click()
    //     })
    // })

})
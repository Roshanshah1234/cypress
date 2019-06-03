///<reference types = "cypress" />
import { partNumber, customerName } from './partNumber'
describe('Sales order testing', () => {
    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.fixture('salesOrder').as('datas')
        cy.fixture('partsInventort').as('inventory')
        //cy.login()

        // cy.contains('Parts Sales').click()
    });
    afterEach(() => {
        cy.saveLocalStorage();
    })
    it('Creating Sales order', () => {
        // cy.login()
        cy.get('#headerMenuBtn').click()
        cy.contains('Parts Sales').click()
        cy.contains('Create').click()
        cy.url().should('include', '/create-sales-order')

        //Customer
        cy.get('@datas').then((data) => {
            cy.get('#customer #customer').type(customerName, { force: true }).wait(3000)
                .get('.ant-select-dropdown-menu-item').click()
            cy.get('#priceCode > div > div > div.ant-select-selection-selected-value').should('have.text', data.priceCode)
            // cy.get('#paymentType > div > div > div.ant-select-selection__placeholder').should('have.text', data.saleType)
            cy.get('#paymentType').click().get('.ant-select-dropdown-menu > :nth-child(1)').click()
            cy.get('#phone').should('have.value', data.phone)
            cy.get('#email').should('have.value', data.email)
        })

    })
    it('verifying Shipping Address', () => {
        cy.get('#shippingAddressedit').click()
        cy.get('@datas').then((data) => {
            cy.get('#line1').should('have.value', data.line1)
            //cy.get('#line2').should('have.value', )
            cy.get('#postalCode').should('have.value', data.postalCode)
            cy.get('#city').should('have.value', data.city)
            cy.get('#state').should('have.value', data.state)
            cy.get('#country').should('have.value', data.country)
            cy.contains('Save').click()
        })

    })
    it('verifying Billing Address', () => {
        cy.get('#billingAddressedit').click()
        cy.get('@datas').then((data) => {
            cy.get('#line1').should('have.value', data.line1)
            //cy.get('#line2').should('have.value', )
            cy.get('#postalCode').should('have.value', data.postalCode)
            cy.get('#city').should('have.value', data.city)
            cy.get('#state').should('have.value', data.state)
            cy.get('#country').should('have.value', data.country)
            cy.contains('Save').click()
        })

    })
    it('prefered Contact Type', () => {
        cy.get('@datas').then((data) => {
            cy.get('#preferredContactType').click()
                .get('.ant-select-dropdown-menu-item-active').click()
        })
    })
    it('po number', () => {
        cy.get('@datas').then((data) => {
            cy.get('#poNumber').type(data.poNumber)
        })
    })

    it('delivery Method', () => {
        cy.get('#deliveryMethod').click()
            // for shipping
            .get('.ant-select-dropdown-menu-item-active')
            .click()
            .get('#trackingId').should('be.visible')
        cy.get('#deliveryMethod').click()
            //driver Delivery
            .get('.ant-select-dropdown-menu > :nth-child(2)')
            .click()
            .get('#driverName').should('be.visible')
        //customer Pickup
        cy.get('#deliveryMethod').click()
            .get('.ant-select-dropdown-menu > :nth-child(3)')
            .click()
    })

    it('creating Part list', () => {
        cy.get('#part #part').type(partNumber, { force: true })
            .wait(2000)
            .get('.ant-select-dropdown-menu > :nth-child(1)').click()
        cy.wait(2000)
        cy.get('#saleQuantity').type('5')
        cy.get('@inventory').then((inventory) => {
            // cy.get('#app > div > div.tek-container.full-height > div > div > div:nth-child(2) > div > div > div.section_container__3lCsn.config_formSection__23Frf > div:nth-child(2) > div.undefined.full-width > div > div > div.rt-tbody > div:nth-child(1) > div > div:nth-child(4) > div')
            //     .should('have.text', '-')
            // cy.get('#app > div > div.tek-container.full-height > div > div > div:nth-child(2) > div > div > div.section_container__3lCsn.config_formSection__23Frf > div:nth-child(2) > div.undefined.full-width > div > div > div.rt-tbody > div:nth-child(1) > div > div:nth-child(6) > div')
            //     .should('have.text', inventory.listPrice)
        })
        cy.get('.buttonWrapper_primaryButton__3MMKW').click()
    })

    it('verifying the data', () => {
        cy.wait(3000)
        cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
            .click()
        //price Code
        cy.get('@datas').then((data) => {
            // cy.get('#priceCode > div > div > div.ant-select-selection-selected-value')
            //     .should('have.text', data.priceCode)
            cy.get('#phone').should('have.value', data.phone)
            cy.get('#email').should('have.value', data.email)
            //preferred contact type
            cy.get('#preferredContactType > div > div > div.ant-select-selection-selected-value')
                .should('have.text', 'Phone')
            cy.get('#poNumber').should('have.value', data.poNumber)
        })

    })


})

import { customerName } from './partNumber'
describe('visiting customer management', () => {
    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.fixture('customer').as('datas')
    })
    afterEach(() => {
        cy.saveLocalStorage();
    });
    it('visits customer management', () => {
        cy.login()
        cy.get('.icon-hamburger-menu1').click()
        cy.get('#customer').click()
        //clicking on dropdown
        cy.get('#addCustomer')
            .click()
            .trigger('mouseover')
            .get('.ant-dropdown-menu > :nth-child(2)')
            .click()
    })

    it('customer deatils', () => {
        cy.get('@datas').then((data) => {
            cy.get('#firstName')
                .type(customerName, { force: true })
                .wait(2000)
                .get('#react-select-2-option-0')
                .click()
            cy.get('#lastName').type(data.customerLastName).should('have.value', data.customerLastName)
            cy.get('#alternateFirstName').type(customerName)
            cy.get('#alternateLastName').type(data.alternateLastName)

            //Adding Contact
            cy.get('#addContact').click({ force: true })
            cy.get('#email').type(data.email)
            cy.get('#phoneType').click()
                .trigger('mouseover')
                .get('.ant-select-dropdown-menu-item-active').click()
            cy.get('#phoneNumber').type(data.phone)
            cy.get('#contact-modal').contains('Save').click()

            //adding address
            cy.get('#addAddress').click({ force: true })
            cy.get('#line1').type(data.line1)
            cy.get('#postalCode').type(data.postalCode).should('have.value', '8094')
            cy.get('#city').type(data.city)
            cy.get('#addressForm #state').type(data.state)
            cy.get('#addressForm #country').type(data.country, { force: true })
            cy.get('#residentType').click()
            cy.contains('Rent').click()
            cy.get('#monthlyRentOrMortgageAmount').type(data.monthlyRental)
            cy.get('#sameForBilling').click()
            cy.get('#address-modal').contains('Save').click({ force: true })

            //adding employer
            cy.contains('Add Employer').click({ force: true })
            cy.get('#name').type(data.name).should('have.value', data.name)
            cy.get('#phone').type(data.phone).should('have.value', data.phone)
            cy.get('#title').type(data.title).should('have.value', data.title)
            cy.get('#annualIncome').type(data.annualIncome)
            cy.get('#line1').type(data.line1)
            cy.get('#line2').type(data.line2)
            cy.get('#postalCode').type(data.postalCode)
            cy.get('#city').type(data.city)
            cy.get('#employerForm #state').type(data.state)
            cy.get('#employerForm #country').type(data.country)
            cy.get('#startDate').click().get('[title="May 16, 2019"] > .ant-calendar-date').click()
            cy.get('#endDate').click()
                .get('.ant-calendar-next-month-btn').click()
                .get('[title="June 16, 2019"] > .ant-calendar-date').click()
            cy.get('#employer-modal').contains('Save').click()

            //adding refrences
            cy.get('#addReferences').click({ force: true })
            cy.get('#name').type(data.name).should('have.value', data.name)
            cy.get('#line1').type(data.line1)
            cy.get('#postalCode').type(data.postalCode).should('have.value', data.postalCode)
            cy.get('#phone').type(data.phone).should('have.value', data.phone)
            cy.get('#line2').type(data.line2)
            cy.get('#city').type(data.city)
            cy.get('#refrenceForm #state').type(data.state)
            cy.get('#refrenceForm #country').type(data.country)
            cy.get('#email').type(data.email).clear().type(data.email)
            cy.get('#relationship').type(data.relationship)
            cy.get('#refrence-modal').contains('Save').click()

            cy.get('#loyaltyNumber').type(data.loyalityNumber, { force: true })
            cy.get('#arScheduleGroup').type(data.arScheduleGroup, { force: true })
            cy.get('#customerGroup').type(data.customerGroup, { force: true })
            cy.get('#creditLimit').type(data.creditLimit, { force: true }).should('have.value', data.creditLimit)
            cy.get('#customerGLAccount').type(data.GLAccount, { force: true }).should('have.value', data.GLAccount)
            //Default Sale Type
            cy.get('#defaultSaleType').click({ force: true })
                .get('.ant-select-dropdown-menu > :nth-child(2)').click({ force: true })
            cy.get('#forbiddenPaymentMethods').click({ force: true })
                .get('.ant-select-dropdown-menu > :nth-child(2)').click({ force: true })

            cy.get('#defaultServicePricing').type(data.defaultServicePricing, { force: true })
            //Special pricing
            cy.get('#defaultPartPricing')
                .click({ force: true })
                .get('.ant-select-dropdown-menu > :nth-child(2)').click({ force: true })
            //Liscense No
            cy.get('#licenseNumber').type(data.licenseNumber, { force: true })
            //License Expiry date
            cy.get('#dlExpiryDate')
                .click()
                .get('[title="May 22, 2019"] > .ant-calendar-date')
                .click({ force: true })
            cy.get('#state').type(data.state)
            cy.get('#country').type(data.country)
            //License class
            cy.get('#licenseClass').click().trigger('mousedown').get('.ant-select-dropdown-menu-item-active').click()
            //Date of birth
            cy.get('#dateOfBirth')
                .click()
                .get('.ant-calendar-prev-year-btn').click()
                .get('.ant-calendar-prev-year-btn').click()
                .get('[title="May 17, 2017"] > .ant-calendar-date').click()
            //Social Security Number
            cy.get('#socialSecurityNumber').type(data.ssn, { force: true })
            cy.get('.buttonWrapper_primaryButton__3MMKW').click()

        })
    })

    it('checking basic details', () => {
        cy.wait(4000)
        cy.contains(customerName, { force: true }).click()
        cy.get('@datas').then((data) => {
            cy.get('#firstName').should('have.value', customerName)
            cy.get('#lastName').should('have.value', data.customerLastName)
            cy.get('#alternateFirstName').should('have.value', customerName)
            cy.get('#alternateLastName').type('have.value', data.alternateLastName)
        })
    })
    it('checking contact details', () => {
        cy.get('@datas').then((data) => {
            cy.get('#contactedit').click({ force: true })
            cy.get('#email').should('have.value', data.email)
            cy.get('#phoneType > div > div > div.ant-select-selection-selected-value').click()
                .should('have.text', 'Mobile')
            cy.get('#phoneNumber').should('have.value', data.phone)
            cy.get('#contact-modal').contains('Save').click()
        })
    })
    it('checking address details', () => {
        cy.get('@datas').then((data) => {
            cy.get('#BillingAddressedit').click({ force: true })
            cy.get('#line1').should('have.value', data.line1)
            cy.get('#postalCode').should('have.value', '8094')
            cy.get('#city').should('have.value', data.city)
            cy.get('#addressForm #state').should('have.value', data.state)
            cy.get('#addressForm #country').should('have.value', data.country, { force: true })
            cy.get('#address-modal').contains('Save').click({ force: true })
        })
    })
    it('checking employer details', () => {
        cy.get('@datas').then((data) => {
            cy.get('#employersedit').click({ force: true })
            cy.get('#name').should('have.value', data.name)
            cy.get('#phone').should('have.value', data.phone)
            cy.get('#title').should('have.value', data.title)
            cy.get('#annualIncome').should('have.value', data.annualIncome)
            cy.get('#line1').should('have.value', data.line1)
            cy.get('#line2').should('have.value', data.line2)
            cy.get('#postalCode').should('have.value', data.postalCode)
            cy.get('#city').should('have.value', data.city)
            cy.get('#employerForm #state').should('have.value', data.state)
            cy.get('#employerForm #country').should('have.value', data.country)
            cy.get('#employer-modal').contains('Save').click()
        })
    })
    it('checking refrences details', () => {
        cy.get('@datas').then((data) => {
            cy.get('#referencesedit').click({ force: true })
            cy.get('#name').should('have.value', data.name)
            cy.get('#line1').should('have.value', data.line1)
            cy.get('#postalCode').should('have.value', data.postalCode)
            //cy.get('#phone').should('have.value', data.phone)
            cy.get('#phone').type(data.phone)
            cy.get('#line2').should('have.value', data.line2)
            cy.get('#city').should('have.value', data.city)
            cy.get('#refrenceForm #state').should('have.value', data.state)
            cy.get('#refrenceForm #country').should('have.value', data.country)
            cy.get('#email').should('have.value', data.email)
            cy.get('#relationship').should('have.value', data.relationship)
            cy.get('#refrence-modal').contains('Save').click()
        })
    })
    it('Rest details details', () => {
        cy.get('@datas').then((data) => {
            cy.get('#loyaltyNumber').should('have.value', data.loyalityNumber, { force: true })
            cy.get('#arScheduleGroup').should('have.value', data.arScheduleGroup)
            cy.get('#customerGroup').should('have.value', data.customerGroup)
            cy.get('#creditLimit').should('have.value', data.creditLimit)
            cy.get('#customerGLAccount').should('have.value', data.GLAccount)
            //default sale type
            cy.get('#defaultSaleType > div > div > div.ant-select-selection-selected-value').should('have.text', 'Wholesale')
            cy.get('#defaultPartPricing > div > div > div.ant-select-selection-selected-value').should('have.text', '12 - 12')

            cy.get('#defaultServicePricing').should('have.value', data.defaultServicePricing)
            //Liscense No
            cy.get('#licenseNumber').should('have.value', data.licenseNumber, { force: true })
            //License Expiry date
            cy.get('#dlExpiryDate > div > input').should('have.value', '2019-05-22')
            cy.get('#dateOfBirth > div > input').should('have.value', '2017-05-17')
            cy.get('#state').should('have.value', data.state)
            cy.get('#country').should('have.value', data.country)
            //License class
            cy.get('#licenseClass > div > div > div.ant-select-selection-selected-value').should('have.text', 'A')

            //Social Security Number
            cy.get('#socialSecurityNumber').should('have.value', data.ssn, { force: true })
        })
    })

})


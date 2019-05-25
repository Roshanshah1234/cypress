/// <reference types="Cypress" />
import { partNumber } from './partNumber'
describe('Testing Parts and inventort', () => {
    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.fixture('partsInventort').as('inventory')
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it('creating part', () => {
        //cy.login()
        cy.get('#headerMenuBtn').click()
        cy.contains('PI').click()
        cy.contains('Create Part/Kit').click()
            .trigger('mouseover')
            .get('.ant-dropdown-menu > :nth-child(1)').click()
        cy.url().should('include', '/inventory/new')

        //Basic Deatils
        cy.get('@inventory').then((inventory) => {
            cy.get('#partsNumber #partsNumber').type(partNumber, { force: true }).wait(4000)
                .get('.ant-select-dropdown > :nth-child(1) > .ant-btn').click()
            cy.get('#partsDescription').type(inventory.description).should('have.value', inventory.description)
            //cy.get('#supersession #supersession #supersession #supersession').type('22753242')
            //cy.contains('22753242').click()
            //cy.get('.content_contentHighlight__13O39').should('have.text', '22753242 - element')
            cy.get('#Manufacturer #Manufacturer').type('Rover', { force: true }).get('.ant-select-dropdown-menu-item-active').click()
            cy.get('#Vendor').type(inventory.vendor).should('have.value', inventory.vendor)
            cy.get('#Group').type(inventory.group).should('have.value', inventory.group)

            //Stocking Details
            cy.get('#sourceCode').click()
            cy.contains('100').click()
            cy.get('#primaryBin #primaryBin').type('21', { force: true })
            cy.contains('212').click({ force: true })

            //pricing Details
            cy.get('#cost').type(inventory.cost).should('have.value', inventory.cost)
            cy.get('#listPrice').type(inventory.listPrice).should('have.value', inventory.listPrice)
            cy.get('#Trade').type(inventory.trade).should('have.value', inventory.trade)
            cy.get('#Comp').type(inventory.comp).should('have.value', inventory.comp)

            //Linked parts
            // cy.get('#alternateParts #alternateParts #alternateParts #alternateParts').type('23144340').wait(2000)
            // cy.contains('23144340').click()
            // cy.get('#associatedParts #associatedParts #associatedParts #associatedParts').type('23142972').wait(2000)
            // cy.contains('23142972').click()

            //core Details
            cy.get('#coreReturnEligible').check()
            cy.get('#coreValue').type(inventory.coreValue, { force: true })
            cy.get('#corePartNumber').type(inventory.corePartNumber).should('have.value', inventory.corePartNumber)
            cy.contains('Show Details').click()

            //Additional Details
            cy.get('#stockingStatus').click()
            cy.contains('Active').click()
            cy.get('#unitOfMeasure').click()
            cy.contains('Inch').click()
            cy.get('#manufacturerControlled').click()
            cy.contains('Yes').click()
            cy.get('#partsClassification').type(inventory.partsClassification)
            cy.contains('No').click({ force: true })
            // cy.get('#manufacturerControlCode').type(inventory.manufactureControlCode).should('have.value', inventory.manufactureControlCode)
            cy.get('#maximumQuantity').type(inventory.maximumQuantity).should('have.value', inventory.maximumQuantity)
            cy.get('#minimumQuantity').type(inventory.minimumQuantity).should('have.value', inventory.minimumQuantity)
            cy.get('#ABCDCode').type(inventory.ABCDCode).should('have.value', inventory.ABCDCode)
            cy.get('#unitPackQuantity').type(inventory.unitPackQuantity).should('have.value', inventory.unitPackQuantity)
            cy.get('#materialReturnCode').type(inventory.materialReturnCode).should('have.value', inventory.materialReturnCode)
            cy.get('#firstYear').type(inventory.firstYear).should('have.value', inventory.firstYear)
            cy.get('#lastYear').type(inventory.lastYear).should('have.value', inventory.lastYear)
            cy.get('#cancelYear').type(inventory.cancelYear).should('have.value', inventory.cancelYear)
            cy.get('#partsShelfLife').type(inventory.partsShelfLife).should('have.value', inventory.partsShelfLife)
            cy.get('#highDaySupply').type(inventory.highDaySupply).should('have.value', inventory.highDaySupply)
            cy.get('#lowDaySupply').type(inventory.lowDaySupply).should('have.value', inventory.lowDaySupply)
            cy.get('#remanufactureIndicator').click()
            cy.contains('New').click()
            cy.get('.buttonWrapper_primaryButton__3MMKW').click()
        })
    })
    it('checking basic details', () => {

        cy.wait(10000)
        cy.get(':nth-child(1) > .rt-tr > :nth-child(1) > :nth-child(1) > .content_content__7zLh5').click()
        cy.get('@inventory').then((inventory) => {

            // cy.get('#partsDescription').should('have.value', 'Testing Part')
            cy.get('#Manufacturer > div > div > div.ant-select-selection-selected-value').should('have.text', inventory.manufacturer)
            cy.get('#Vendor').should('have.value', inventory.vendor)
            cy.get('#Group').should('have.value', inventory.group)
        })

    })

    it('checking stocking details', () => {
        cy.get('#sourceCode > div > div > div.ant-select-selection-selected-value').should('have.text', '100 - GM GENERAL')
        cy.get('#primaryBin > div > div > div.ant-select-selection-selected-value').should('have.text', '212')
    })

    it('checking pricing details', () => {
        cy.get('@inventory').then((inventory) => {
            cy.get('#cost').should('have.value', inventory.cost)
            cy.get('#listPrice').should('have.value', inventory.listPrice)
            cy.get('#Trade').should('have.value', inventory.trade)
            cy.get('#Comp').should('have.value', inventory.comp)
        })

    })

    it('checking core Details', () => {
        cy.get('@inventory').then((inventory) => {
            cy.get('#coreReturnEligible').should('be.checked')
            cy.get('#coreValue').should('have.value', inventory.coreValue)
            cy.get('#corePartNumber').should('have.value', inventory.corePartNumber)
            cy.contains('Show Details').click()
        })
    })

    it('checking additional details', () => {
        cy.get('@inventory').then((inventory) => {
            //cy.get('#stockingStatus > div > div > div.ant-select-selection-selected-value').should('have.text', 'Active')
            cy.get('#unitOfMeasure > div > div > div.ant-select-selection-selected-value').should('have.text', 'Inch')
            cy.get('#manufacturerControlled > div > div > div.ant-select-selection-selected-value').should('have.text', 'Y - Yes')
            cy.get('#manufacturerControlCode').should('have.value', '123')
            cy.get('#hazardous > div > div > div.ant-select-selection-selected-value').should('not.exist')
            cy.get('#partsClassification').should('have.value', inventory.partsClassification)
            cy.get('#maximumQuantity').should('have.value', inventory.maximumQuantity)
            cy.get('#minimumQuantity').should('have.value', inventory.minimumQuantity)
            cy.get('#ABCDCode').should('have.value', inventory.ABCDCode)
            cy.get('#unitPackQuantity').should('have.value', inventory.unitPackQuantity)
            cy.get('#materialReturnCode').should('have.value', inventory.materialReturnCode)
            cy.get('#returnEligibility > div > div > div.ant-select-selection-selected-value')
                .should('not.exist')
            cy.get('#firstYear').should('have.value', inventory.firstYear)
            cy.get('#lastYear').should('have.value', inventory.lastYear)
            cy.get('#cancelYear').should('have.value', inventory.cancelYear)
            cy.get('#partsShelfLife').should('have.value', inventory.partsShelfLife)
            // cy.get('#highDaySupply').should('have.value', inventory.highDaySupply)
            // cy.get('#lowDaySupply').should('have.value', inventory.lowDaySupply)
            cy.get('#remanufactureIndicator > div > div > div.ant-select-selection-selected-value').should('have.text', 'New')
            //cy.get('#truckPartIndicator > div > div > div.ant-select-selection-selected-value').should('not.exist')
        })
    })
})

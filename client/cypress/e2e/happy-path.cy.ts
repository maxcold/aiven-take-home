function mockLocation(latitude, longitude) {
    return {
        onBeforeLoad(win) {
            cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb, err) => {
                if (latitude && longitude) {
                    return cb({ coords: { latitude, longitude } })
                }
                throw err({ code: 1 })
            })
        }
    }
}

describe('Aiven Cloud selection', () => {
    it('should fulfill the happy path', () => {
        cy.visit('http://localhost:5173', mockLocation(52.520008, 13.404954))

        cy.get('h2').should('contain', 'Aiven Cloud')

        cy.get('[data-cy="sort-selector"]').select('geo_asc')

        cy.get('[data-cy="cloud-name-cell"]').should('contain', 'aws-eu-central-1')

        cy.get('[data-cy="provider-selector"]').select('aws')

        cy.get('[data-cy="provider-cell"]').should('contain', 'aws')

        cy.get('[data-cy="provider-selector"]').select('azure')

        cy.get('[data-cy="provider-cell"]').should('contain', 'azure')

        cy.get('[data-cy="provider-selector"]').select('google')

        cy.get('[data-cy="provider-cell"]').should('contain', 'google')
    })
})
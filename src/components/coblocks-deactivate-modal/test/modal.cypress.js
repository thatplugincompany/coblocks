describe( 'Component: CoBlocks Deactivate Modal', () => {
	beforeEach( () => {
		cy.visit( Cypress.env( 'testURL' ) + '/wp-admin/plugins.php' );

		cy.get( '#deactivate-coblocks' ).should( 'exist' );
	} );

	afterEach( () => {
		cy.get( '#activate-coblocks' ).should( 'exist' );

		cy.get( '#activate-coblocks' ).click();
	} );

	it( 'open modal and submit feedback', function() {
		cy.intercept(
			'GET',
			'https://wpnux.godaddy.com/v3/api/feedback/coblocks-optout?domain=http://localhost:8889&random=1&language=en-US',
			{ fixture: '../.dev/tests/cypress/fixtures/network/coblocks_optout.json' }
		);

		cy.get( '#deactivate-coblocks' ).click();

		cy.get( '.components-checkbox-control__input' ).eq( 0 ).check();

		cy.get( '.components-checkbox-control__input' ).eq( 2 ).check();

		cy.get( '.components-text-control__input' ).eq( 0 ).type( 'need more widgets' );

		cy.get( '.components-button-group .is-primary' ).click();

		cy.intercept(
			'POST',
			'https://wpnux.godaddy.com/v3/api/feedback/coblocks-optout',
			{
				statusCode: 201,
			}
		);

		cy.get( '#activate-coblocks' ).should( 'exist' );
	} );

	it( 'open modal and skip feedback', function() {
		cy.intercept(
			'GET',
			'https://wpnux.godaddy.com/v3/api/feedback/coblocks-optout?domain=http://localhost:8889&random=1&language=en-US',
			{ fixture: '../.dev/tests/cypress/fixtures/network/coblocks_optout.json' }
		);

		cy.get( '#deactivate-coblocks' ).click();

		cy.get( '.components-button-group .is-link' ).click();
	} );
} );

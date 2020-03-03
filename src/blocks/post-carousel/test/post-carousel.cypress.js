/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Post Carousel Block', function() {
	/**
	 * Test that we can add a post-carousel block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test post-carousel block saves with empty values.', function() {
		helpers.addCoBlocksBlockToPage( true, 'post-carousel' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'post-carousel' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-post-carousel' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test the post-carousel block column and post count controls
	 */
	it.only( 'Test the post-carousel block column and post count controls.', function() {
		helpers.addCoBlocksBlockToPage( true, 'post-carousel' );

		cy.get( '.wp-block[data-type="coblocks/post-carousel"]' ).click();

		[ 1, 2, 3, 4 ].forEach( ( columns ) => {
			helpers.setInputValue( 'post carousel settings', 'columns', columns );
			cy.get( '[data-type="coblocks/post-carousel"]' ).find( '.slick-slide[aria-hidden="false"]' ).should( 'have.length', columns );
		} );

		helpers.checkForBlockErrors( 'post-carousel' );

		[ 1, 2, 3, 4 ].forEach( ( number_of_posts ) => {
			helpers.setInputValue( 'feed settings', 'number of posts', number_of_posts );
			cy.get( '[data-type="coblocks/post-carousel"]' ).find( '.slick-slide:not(.slick-cloned)' ).should( 'have.length', number_of_posts );
		} );

		helpers.checkForBlockErrors( 'post-carousel' );
	} );

	/**
	 * Test the post-carousel block saves with custom classes
	 */
	it( 'Test the post-carousel block custom classes.', function() {
		helpers.addCoBlocksBlockToPage( true, 'post-carousel' );

		cy.get( '.edit-post-sidebar' ).contains( /post carousel settings/i ).click( { force: true } );

		cy.get( '.edit-post-sidebar' ).contains( /feed settings/i ).click( { force: true } );

		helpers.addCustomBlockClass( 'my-custom-class', 'post-carousel' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'post-carousel' );

		cy.get( '.wp-block-coblocks-post-carousel' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-post-carousel' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

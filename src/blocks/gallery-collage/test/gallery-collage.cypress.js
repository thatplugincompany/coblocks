/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';
import 'cypress-file-upload';

describe( 'Test CoBlocks Gallery Collage Block', function() {
	/**
	 * Setup Gallery data
	 */
	const galleryData = {
		caption: 'Caption Here',
	};

	/**
	 * Test that we can add a gallery-collage block to the content, not add any images or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test collage block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-collage', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-collage' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-collage' ).find( 'ul>li' ).each( ( $item ) => {
			cy.get( $item ).should( 'be.empty' );
		} );

		helpers.editPage();
	} );

	/**
	 * Test that we can upload images to block and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test collage block saves with image upload.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'coblocks/gallery-collage', true );

		cy.get( '.wp-block[data-type="coblocks/gallery-collage"]' ).click();

		helpers.upload.imageToBlock( 'coblocks/collage' );

		cy.get( '.wp-block-coblocks-gallery-collage__item img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-collage' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-collage__item' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.editPage();
	} );

	/**
	 * Test that we can add image from library and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test collage block saves with images from media library.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-collage', true );

		cy.get( '.wp-block[data-type="coblocks/gallery-collage"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( '.media-modal-content' ).find( '.media-button-select' ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-collage' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-collage' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-gallery-collage' ).find( 'img' ).should( 'have.attr', 'src' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add image captions
	 * to successfully save the block without errors.
	 */
	it( 'Test collage block saves with images captions.', function() {
		const { caption } = galleryData;
		helpers.addBlockToPost( 'coblocks/gallery-collage', true );

		cy.get( '.wp-block[data-type="coblocks/gallery-collage"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( '.media-modal-content' ).find( '.media-button-select' ).click();

		helpers.toggleSettingCheckbox( /captions/i );

		cy.get( '.wp-block-coblocks-gallery-collage__item' ).first().click()
			.find( 'figcaption' ).click( { force: true } ).type( caption );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-collage' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-collage' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-gallery-collage' ).contains( caption );

		helpers.editPage();
	} );
} );

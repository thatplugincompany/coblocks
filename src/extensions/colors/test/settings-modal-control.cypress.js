import * as helpers from '../../../../.dev/tests/cypress/helpers';

import {
	COLORS_FEATURE_ENABLED_KEY,
	COLORS_CUSTOM_FEATURE_ENABLED_KEY,
	COLORS_GRADIENT_FEATURE_ENABLED_KEY,
} from '../constants';

describe( 'Settings Modal: Colors feature', () => {
	beforeEach( () => {
		// Reset settings.
		helpers.getWindowObject().then( ( win ) => {
			win.wp.data.dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
				[ COLORS_FEATURE_ENABLED_KEY ]: true,
				[ COLORS_CUSTOM_FEATURE_ENABLED_KEY ]: true,
				[ COLORS_GRADIENT_FEATURE_ENABLED_KEY ]: true,
			} );

			win.wp.data.dispatch( 'core/block-editor' ).updateSettings( {
				colors: [
					{
						name: 'Primary',
						slug: 'primary',
						color: 'rgb(255,255,255)',
					},
				],
				gradients: [
					{
						name: 'Primary to Secondary',
						gradient: 'linear-gradient(135deg, rgb(0,0,0) 0%, rgb(255,255,255) 100%)',
						slug: 'primary-to-secondary',
					},
				],
			} );
		} );

		helpers.addBlockToPost( 'core/cover', true );

		// Open overlay settings on cover block where the color panel resides.
		cy.get( '.edit-post-visual-editor .wp-block[data-type="core/cover"]' ).first().click();
		helpers.openSettingsPanel( /Overlay/i );

		// Open settings modal.
		cy.get( '.interface-interface-skeleton__header .edit-post-more-menu .components-button' ).click();
		cy.get( '.components-menu-item__button' ).contains( 'Editor settings' ).click();
	} );

	afterEach( () => {
		cy.get( '.components-modal__header button[aria-label="Close dialog"]' ).click();
	} );

	it( 'can turn off all color settings', () => {
		cy.get( '.components-panel__body-title' ).contains( /Overlay/i ).should( 'exist' );
		cy.get( '.components-circular-option-picker__dropdown-link-action' ).should( 'exist' );
		cy.get( '.block-editor-color-gradient-control__button-tabs button' ).should( 'exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Color settings' ).click();

		cy.get( '.components-panel__body-title' ).contains( /Overlay/i ).should( 'not.exist' );
		cy.get( '.components-circular-option-picker__dropdown-link-action' ).should( 'not.exist' );
		cy.get( '.block-editor-color-gradient-control__button-tabs button' ).should( 'not.exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Color settings' ).click();
	} );

	it( 'can turn off custom color settings', () => {
		cy.get( '.components-panel__body-title' ).contains( /Overlay/i ).should( 'exist' );
		cy.get( '.components-circular-option-picker__dropdown-link-action' ).should( 'exist' );
		cy.get( '.block-editor-color-gradient-control__button-tabs button' ).should( 'exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Custom color pickers' ).click();

		cy.get( '.components-circular-option-picker__dropdown-link-action' ).should( 'not.exist' );
		cy.get( '.block-editor-color-gradient-control__button-tabs button' ).should( 'not.exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Custom color pickers' ).click();
	} );

	it( 'can turn off gradient settings', () => {
		cy.get( '.components-panel__body-title' ).contains( /Overlay/i ).should( 'exist' );
		cy.get( '.block-editor-color-gradient-control__button-tabs button' ).should( 'exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Gradient styles' ).click();

		cy.get( '.block-editor-color-gradient-control__button-tabs button' ).should( 'not.exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Gradient styles' ).click();
	} );
} );

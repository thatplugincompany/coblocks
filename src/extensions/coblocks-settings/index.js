/*global coblocksSettings*/

/**
 * Styles
 */
import './styles/style.scss';

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { registerPlugin, getPlugin, unregisterPlugin } from '@wordpress/plugins';
import { Modal } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CoBlocksSettingsModalControl from './coblocks-settings-slot';

export default function CoBlocksSettings() {
	const [ isOpen, setOpen ] = useState( false );

	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	return (
		<Fragment>
			<PluginMoreMenuItem onClick={ openModal }>
				{ __( 'Editor settings', 'coblocks' ) }
			</PluginMoreMenuItem>

			{ isOpen && (
				<Modal
					className="coblocks-settings-modal"
					title={ __( 'Editor settings', 'coblocks' ) }
					closeLabel={ __( 'Close', 'coblocks' ) }
					onRequestClose={ closeModal }
					shouldCloseOnClickOutside={ false }
				>
					<section className="edit-post-preferences-modal__section">
						<h2 className="edit-post-preferences-modal__section-title">
							{ __( 'General' ) }
						</h2>

						<CoBlocksSettingsModalControl.Slot>
							{
								/**
								 * Override with your implementation:
								 *
								 * import { registerPlugin } from '@wordpress/plugins';
								 * import { CoBlocksSettingsModalControl } from './coblocks-settings-slot';
								 * import { CoBlocksSettingsModalControl } from './coblocks-settings-toggle-control';
								 *
								 * registerPlugin( 'your-settings-modal-control', {
								 *     render: () => (
								 *         <CoBlocksSettingsModalControl>
								 *             <CoBlocksSettingsModalControl
								 *                 settingsKey="name_of_wordpress_setting"
								 *                 label={ __( 'The toggle control label', 'coblocks' ) }
								 *                 help={ __( 'The toggle control help text', 'coblocks' ) }
								 *             />
								 *         </CoBlocksSettingsModalControl>
								 *     ),
								 * } );
								 */
							}
							<div>CoBlocksSettingsModalControl</div>
						</CoBlocksSettingsModalControl.Slot>
					</section>
				</Modal>
			) }
		</Fragment>
	);
}

if ( typeof coblocksSettings !== 'undefined' && !! parseInt( coblocksSettings.coblocksSettingsEnabled ) ) {
	registerPlugin( 'coblocks-settings', {
		icon: '',
		render: CoBlocksSettings,
	} );
} else if ( getPlugin( 'coblocks-settings' ) ) {
	unregisterPlugin( 'coblocks-settings' );
}

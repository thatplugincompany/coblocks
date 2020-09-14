/**
 * Internal dependencies.
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * External dependencies
 */
import { ServiceItemIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Service', 'coblocks' ),
	/* translators: block description */
	description: __( 'A single service item within a services block.', 'coblocks' ),
	icon: <Icon icon={ ServiceItemIcon } />,
	keywords: [],
	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},
	example: {
		attributes: {},
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };

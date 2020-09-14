/**
 * Internal dependencies
 */
import edit from './edit';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * External dependencies
 */
import { FormWebsiteIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Block constants
 */
const metadata = {
	name: 'coblocks/field-website',
	category: 'layout',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Website', 'coblocks' ),
		},
		required: {
			type: 'boolean',
			default: false,
		},
	},
};

const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Website', 'coblocks' ),
	/* translators: block description */
	description: __( 'A text field for collecting a URL.', 'coblocks' ),
	icon: <Icon icon={ FormWebsiteIcon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'link', 'coblocks' ),
		/* translators: block keyword */
		__( 'hyperlink', 'coblocks' ),
		/* translators: block keyword */
		__( 'url', 'coblocks' ),
	],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
	},
	attributes,
	transforms,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };

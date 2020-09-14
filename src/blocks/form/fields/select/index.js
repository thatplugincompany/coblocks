/**
 * Internal dependencies
 */
import { editMultiField } from '../helpers';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * External dependencies
 */
import { FormSelectIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Block constants
 */
const metadata = {
	name: 'coblocks/field-select',
	category: 'layout',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Select', 'coblocks' ),
		},
		required: {
			type: 'boolean',
			default: false,
		},
		options: {
			type: 'array',
			default: [],
		},
	},
};

const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Select', 'coblocks' ),
	/* translators: block description */
	description: __( 'A dropdown field with multiple options where only one choice can be made.', 'coblocks' ),
	icon: <Icon icon={ FormSelectIcon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'dropdown', 'coblocks' ),
		/* translators: block keyword */
		__( 'option', 'coblocks' ),
	],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
	},
	attributes,
	transforms,
	edit: editMultiField( 'select' ),
	save: () => null,
};

export { name, category, metadata, settings };

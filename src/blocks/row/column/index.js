/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import save from './save';
import deprecated from './deprecated';
import metadata from './block.json';
import { BackgroundAttributes } from '../../../components/background';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name } = metadata;

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {
	title: __( 'Column' ),
	description: __( 'An immediate child of a row.' ),
	icon,
	parent: [ 'coblocks/row' ],
	supports: {
		inserter: false,
	},
	attributes,
	edit,
	getEditWrapperProps( attributes ) {
		const { paddingSize } = attributes;

		// If the column block has children, return the following.
		if ( paddingSize !== 'advanced' && paddingSize === 'no' ) {
			return { 'data-background-dropzone': false };
		}
	},
	save,
	deprecated,
};

export { name, metadata, settings };

/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { GalleryAttributes } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	title: _x( 'Carousel', 'block name' ),
	description: __( 'Display multiple images in a beautiful carousel gallery.' ),
	attributes,
	icon,
	keywords: [ _x( 'gallery', 'block keyword' ), _x( 'photos', 'block keyword' ) ],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
		coBlocksSpacing: true,
	},
	example: {
		attributes: {
			gridSize: 'lrg',
			gutter: 5,
			images: [
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-1.jpg' },
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-2.jpg' },
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-3.jpg' },
			],
		},
	},
	transforms,
	edit,
	deprecated,
	save,
};

export { name, category, icon, metadata, settings };

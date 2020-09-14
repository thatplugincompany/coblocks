/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import transforms from './transforms';
import deprecated from './deprecated';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * External dependencies
 */
import { PostCarouselIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Post Carousel', 'coblocks' ),
	/* translators: block description */
	description: __( 'Display posts or an external blog feed as a carousel.', 'coblocks' ),
	icon: <Icon icon={ PostCarouselIcon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'slider', 'coblocks' ),
		/* translators: block keyword */
		__( 'posts', 'coblocks' ),
		/* translators: block keyword */
		__( 'blog', 'coblocks' ),
		/* translators: block keyword */
		__( 'latest', 'coblocks' ),
		/* translators: block keyword */
		__( 'rss', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	transforms,
	edit,
	deprecated,
	save() {
		return null;
	},
};

export { name, category, settings };

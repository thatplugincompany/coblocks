/**
 * External dependencies
 */
import { ServicesIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import metadata from './block.json';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock, switchToBlockType } from '@wordpress/blocks';

/**
 * Block constants.
 */
const { name, category } = metadata;

const SERVICE_TEMPLATE = [
	[
		'core/image',
		{},
	],
	[
		'core/heading',
		{
			/* translators: content placeholder */
			content: __( '', 'coblocks' ),
			level: 4,
			/* translators: content placeholder */
			placeholder: __( 'Write title…', 'coblocks' ),
			textAlign: 'center',
		},
	],
	[
		'core/paragraph',
		{
			align: 'center',
			/* translators: content placeholder */
			content: __( '', 'coblocks' ),
			/* translators: content placeholder */
			placeholder: __( 'Write description…', 'coblocks' ),
		},
	],
];

const templateContainer = [
	SERVICE_TEMPLATE,
	SERVICE_TEMPLATE,
];

function Edit( { clientId } ) {
	const { replaceBlocks, ...restDispatch } = useDispatch( 'core/block-editor' );
	const { getBlock, getBlockParents, ...restSelect } = useSelect( ( select ) => select( 'core/block-editor' ) );

	const currentBlock = getBlock( clientId );

	if ( ! currentBlock ) {
		return null;
	}

	replaceBlocks(
		[ clientId ],
		switchToBlockType( currentBlock, 'core/columns' )
	);

	return null;
}

const migrateCurrent = ( attributes, innerBlocks ) => {
	return innerBlocks.map( ( innerBlock ) => {
		const formattedServiceTemplate = [ ...innerBlock.innerBlocks ];

		if ( innerBlock.attributes.imageUrl ) {
			const imageBlock = createBlock( 'core/image', { ...innerBlock.attributes } );
			formattedServiceTemplate.unshift( imageBlock );
		}

		const innerBlockList = formattedServiceTemplate.map( ( block ) => {
			const innerBlockAttributes = {
				...block.attributes,
			};

			if ( block.name === 'core/image' ) {
				innerBlockAttributes.url = innerBlock.attributes.imageUrl;
				innerBlockAttributes.className = 'is-style-service';
				innerBlockAttributes.align = 'full';
				innerBlockAttributes.allowResize = false;
			}

			return createBlock(
				block.name,
				innerBlockAttributes,
				block.innerBlocks,
			);
		} );

		return createBlock(
			'core/column',
			{},
			innerBlockList
		);
	} );
};

const migrateNew = () => {
	return templateContainer.map( ( innerBlock ) => {
		return createBlock(
			'core/column',
			{},
			innerBlock.map( ( block ) => {
				return createBlock(
					...block,
				);
			} )
		);
	} );
};

const settings = {
	/* translators: block name */
	title: __( 'Services', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add up to four columns of services to display.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'features', 'coblocks' ),
	],
	edit: Edit,
	save: () => <InnerBlocks.Content />,

	transforms: {
		to: [
			{
				blocks: [ 'core/columns' ],
				transform: ( attributes, innerBlocks ) => {
					console.log( 'innerBlocks for columns', innerBlocks );
					return createBlock(
						'core/columns',
						{},
						innerBlocks.length > 0 ? migrateCurrent( attributes, innerBlocks ) : migrateNew()
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

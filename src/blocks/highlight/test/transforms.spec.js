/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType, createBlock, switchToBlockType, getBlockTransforms, rawHandler } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

registerCoreBlocks();

const performPrefixTransformation = ( blockName, prefix, content ) => {
	const prefixTransforms = getBlockTransforms( 'from', blockName )
		.filter( ( { type: transformType, prefix: transformPrefix } ) => transformType === 'prefix' && prefix === transformPrefix );

	// Remove prefix trigger from content before performing the transform.
	const blockContent = content.replace( prefix, '' ).trim();
	const block = prefixTransforms[ 0 ].transform( blockContent );

	return block;
};

describe( 'coblocks/highlight transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform from core/paragraph block', () => {
		const coreParagraph = createBlock( 'core/paragraph', { content: 'paragraph content' } );
		const transformed = switchToBlockType( coreParagraph, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.content ).toBe( 'paragraph content' );
	} );

	it( 'should transform to core/paragraph block', () => {
		const block = createBlock( name, { content: 'paragraph content' } );
		const transformed = switchToBlockType( block, 'core/paragraph' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.content ).toBe( 'paragraph content' );
	} );

	it( 'should transform when :highlight prefix is seen', () => {
		const prefix = ':highlight';
		const content = 'Lorem ipsum dolor sit amet.';
		const block = performPrefixTransformation( name, prefix, prefix.concat( ' ', content ) );

		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
		expect( block.attributes.content ).toBe( content );
	} );

	it( 'should transform raw html to block', () => {
		const content = 'Lorem <strong>ipsum</strong> dolor sit amet.';
		const HTML = `<p class="wp-block-coblocks-highlight"><mark>${ content }</mark></p>`;

		const block = rawHandler( { HTML } );

		expect( block[ 0 ].isValid ).toBe( true );
		expect( block[ 0 ].name ).toBe( name );
		expect( block[ 0 ].attributes.content ).toBe( content );
	} );
} );

/**
 * External dependencies
 */
import classnames from 'classnames';
import { chunk } from 'lodash';

/**
 * Internal dependencies
 */
import metadata from './block.json';

const deprecated = [
	{
		migrate: ( attributes, innerBlocks ) => {
			const { features } = attributes;

			const listBlock = wp.blocks.createBlock( 'core/list', {
				content: features,
			} );

			delete attributes.features;
			return { attributes, innerBlocks: [ listBlock, ...innerBlocks ] };
		},
		attributes: {
			...metadata.attributes,
		},
		save: ( { attributes } ) => {
			const {
				amount,
				currency,
				customBackgroundColor,
				customTextColor,
				features,
				backgroundColor,
				textColor,
				title,
			} = attributes;

			const backgroundClass = getColorClassName( 'background-color', backgroundColor );
			const textColorClass = getColorClassName( 'color', textColor );

			const classes = classnames( {
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundClass ]: backgroundClass,
				'has-text-color': textColor || customTextColor,
				[ textColorClass ]: textColorClass,
			}
			);

			const styles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textColorClass ? undefined : customTextColor,
			};

			return isEmpty( attributes ) ? null : (
				<div
					className={ classes }
					style={ styles }
				>
					{ ! RichText.isEmpty( title ) && (
						<RichText.Content
							tagName="span"
							className="wp-block-coblocks-pricing-table-item__title"
							value={ title }
						/>
					) }
					{ ! RichText.isEmpty( amount ) && (
						<div className={ 'wp-block-coblocks-pricing-table-item__price-wrapper' }>
							{ ! RichText.isEmpty( currency ) && (
								<RichText.Content
									tagName="span"
									className="wp-block-coblocks-pricing-table-item__currency"
									value={ currency }
								/>
							) }
							<RichText.Content
								tagName="span"
								className="wp-block-coblocks-pricing-table-item__amount"
								value={ amount }
							/>
						</div>
					) }
					{ ! RichText.isEmpty( features ) && (
						<RichText.Content
							tagName="ul"
							multiline="li"
							className="wp-block-coblocks-pricing-table-item__features"
							value={ features }
						/>
					) }
					<InnerBlocks.Content />
				</div>
			);
	},
];

export default deprecated;

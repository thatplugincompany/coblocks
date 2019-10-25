/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { RichText, getColorClassName } from '@wordpress/block-editor';

const isEmpty = attributes => {
	const attributesToCheck = [ 'title', 'description', 'eventDay', 'eventMonth', 'eventYear', 'eventTime', 'eventLocation' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

export default function save( { attributes } ) {
	const colorClass = getColorClassName( 'color', attributes.textColor );

	const textClasses = classnames(
		attributes.className, {
			'has-text-color': attributes.textColor || attributes.customTextColor,
			[ colorClass ]: colorClass,
		} );

	const textStyles = {
		color: colorClass ? undefined : attributes.customTextColor,
	};

	return isEmpty( attributes ) ? null : (
		<div
			className="md:flex justify-between"
			data-page={ String( attributes.pageNum ) }
		>
			<div className={ classnames( textClasses, 'wp-block-coblocks-events__date' ) } style={ textStyles }>
				<RichText.Content
					tagName="span"
					className="wp-block-coblocks-events__day display-block"
					value={ attributes.eventDay }
				/>
				<RichText.Content
					value={ attributes.eventMonth }
					tagName="span"
					className="wp-block-coblocks-event-item__month display-block"
				/>
				<RichText.Content
					value={ attributes.eventYear }
					tagName="span"
					className="wp-block-coblocks-event-item__year display-block"
				/>
			</div>
			<div className={ classnames( textClasses, 'wp-block-coblocks-event-item__heading-wrapper' ) } style={ textStyles }>
				<RichText.Content
					value={ attributes.title }
					tagName="span"
					className="wp-block-coblocks-event-item__heading display-block"
				/>
				<RichText.Content
					value={ attributes.description }
					tagName="span"
					className="wp-block-coblocks-event-item__description display-block"
					itemprop="description"
				/>
			</div>
			<div className={ classnames( textClasses, 'wp-block-coblocks-events__details' ) } style={ textStyles }>
				<RichText.Content
					value={ attributes.eventTime }
					tagName="span"
					className="wp-block-coblocks-event-item__time display-block"
				/>
				<RichText.Content
					value={ attributes.eventLocation }
					tagName="span"
					className="wp-block-coblocks-event-item__location display-block"
				/>
			</div>
		</div>
	);
}

/**
 * Internal dependencies
 */
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import captionOptions from '../../components/block-gallery/options/caption-options';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, SelectControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.setCaptionStyleTo = this.setCaptionStyleTo.bind( this );
	}

	setCaptionStyleTo( value ) {
		this.props.setAttributes( { captionStyle: value } );
	}

	getCaptionsHelp( checked ) {
		return checked ? __( 'Showing captions for each media item.' ) : __( 'Toggle to show media captions.' );
	}

	render() {
		const {
			attributes,
			setAttributes,
			enableGutter,
		} = this.props;

		const {
			captions,
			captionStyle,
		} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Collage Settings' ) }>
					{ enableGutter && <ResponsiveTabsControl label={ __( 'Gutter' ) } { ...this.props } /> }
					<ToggleControl
						label={ __( 'Captions' ) }
						checked={ !! captions }
						onChange={ () => setAttributes( { captions: ! captions } ) }
						help={ this.getCaptionsHelp }
					/>
					{ captions && <SelectControl
						label={ __( 'Caption Style' ) }
						value={ captionStyle }
						onChange={ this.setCaptionStyleTo }
						options={ captionOptions }
					/> }
				</PanelBody>
			</InspectorControls>
		);
	}
}

export default Inspector;

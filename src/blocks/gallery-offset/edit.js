/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import GalleryImage from '../../components/block-gallery/gallery-image';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import GalleryUploader from '../../components/block-gallery/gallery-uploader';
import GalleryDropZone from '../../components/block-gallery/gallery-dropzone';
import Inspector from './inspector';
import { icon } from './';
import { GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { withNotices } from '@wordpress/components';
import { withFontSizes } from '@wordpress/block-editor';

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onMove = this.onMove.bind( this );
		this.onMoveForward = this.onMoveForward.bind( this );
		this.onMoveBackward = this.onMoveBackward.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );

		this.state = {
			selectedImage: null,
		};
	}

	componentDidMount() {
		if ( this.props.wideControlsEnabled === true && ! this.props.attributes.align ) {
			this.props.setAttributes( {
				align: 'full',
			} );
		}
	}

	componentDidUpdate( prevProps ) {
		// Deselect images when deselecting the block
		if ( ! this.props.isSelected && prevProps.isSelected ) {
			this.setState( {
				selectedImage: null,
				captionSelected: false,
			} );
		}
	}

	onMove( oldIndex, newIndex ) {
		const images = [ ...this.props.attributes.images ];
		images.splice( newIndex, 1, this.props.attributes.images[ oldIndex ] );
		images.splice( oldIndex, 1, this.props.attributes.images[ newIndex ] );
		this.setState( { selectedImage: newIndex } );
		this.props.setAttributes( { images } );
	}

	onMoveForward( oldIndex ) {
		return () => {
			if ( oldIndex === this.props.attributes.images.length - 1 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex + 1 );
		};
	}

	onMoveBackward( oldIndex ) {
		return () => {
			if ( oldIndex === 0 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex - 1 );
		};
	}

	onSelectImage( index ) {
		return () => {
			if ( this.state.selectedImage !== index ) {
				this.setState( {
					selectedImage: index,
				} );
			}
		};
	}

	onRemoveImage( index ) {
		return () => {
			const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
			this.setState( { selectedImage: null } );
			this.props.setAttributes( {
				images,
			} );
		};
	}

	setImageAttributes( index, attributes ) {
		const { attributes: { images }, setAttributes } = this.props;
		if ( ! images[ index ] ) {
			return;
		}
		setAttributes( {
			images: [
				...images.slice( 0, index ),
				{
					...images[ index ],
					...attributes,
				},
				...images.slice( index + 1 ),
			],
		} );
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			noticeUI,
			fontSize,
		} = this.props;

		const {
			align,
			captions,
			contentAlign,
			gridSize,
			gutter,
			gutterMobile,
			images,
			linkTo,
			shadow,
		} = attributes;

		const dropZone = (
			<GalleryDropZone
				{ ...this.props }
				label={ __( 'Drop to add to the offset gallery' ) }
			/>
		);

		const innerClasses = classnames(
			...GalleryClasses( attributes ),
			`has-bricks-grid-${ gridSize }`,
			`has-${ contentAlign }-content`, {
				[ `align${ align }` ]: align,
				// 'has-margin': gutter > 0,
				[ `has-gutter-${ gutter }` ]: gutter > 0,
				[ `has-gutter-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			}
		);

		if ( images.length === 0 ) {
			return (
				<GalleryPlaceholder
					{ ...this.props }
					label={ __( 'Offset Gallery' ) }
					icon={ icon }
				/>
			);
		}

		return (
			<Fragment>
				<Inspector
					{ ...this.props }
				/>
				{ noticeUI }
				{ dropZone }
				<div className={ className }>
					<ul className={ innerClasses }>
						{ images.map( ( img, index ) => {
							const ariaLabel = sprintf(
								/* translators: %1$d is the order number of the image, %2$d is the total number of images */
								__( 'image %1$d of %2$d in gallery', 'coblocks' ),
								( index + 1 ),
								images.length
							);

							return (
								<li className="coblocks-gallery--item" key={ img.id || img.url }>
									<GalleryImage
										url={ img.url }
										alt={ img.alt }
										id={ img.id }
										gutter={ gutter }
										gutterMobile={ gutterMobile }
										shadow={ shadow }
										isSelected={ isSelected && this.state.selectedImage === index }
										onRemove={ this.onRemoveImage( index ) }
										onSelect={ this.onSelectImage( index ) }
										setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
										caption={ img.caption }
										aria-label={ ariaLabel }
										captions={ captions }
										supportsCaption={ true }
										imgLink={ img.imgLink }
										linkTo={ linkTo }
										// marginBottom={ true }
										isFirstItem={ index === 0 }
										isLastItem={ ( index + 1 ) === images.length }
										onMoveBackward={ this.onMoveBackward( index ) }
										onMoveForward={ this.onMoveForward( index ) }
										// verticalMoving={ true }
										fontSize={ fontSize.size }
									/>
								</li>
							);
						} ) }
						<li className="coblocks-gallery--item--uploader">
							<GalleryUploader { ...this.props } />
						</li>
					</ul>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
	withFontSizes( 'fontSize' ),
	withNotices,
] )( Edit );

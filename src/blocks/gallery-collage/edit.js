/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import * as helper from './../../utils/helper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withNotices, DropZone, Spinner, IconButton, Dashicon } from '@wordpress/components';
import { MediaPlaceholder, RichText, URLInput } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { isBlobURL } from '@wordpress/blob';

class GalleryCollageEdit extends Component {
	constructor() {
		super( ...arguments );

		this.saveCustomLink = this.saveCustomLink.bind( this );

		this.state = {
			images: [],
			selectedImage: null,
		};
	}

	componentDidMount() {
		this.setupImageLocations();
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.className !== prevProps.className ) {
			this.setupImageLocations();

			if ( this.props.className.includes( 'is-style-layered' ) ) {
				this.props.setAttributes( { gutter: 10, gutterMobile: 10 } );
			}

			if ( ! this.props.className.includes( 'is-style-layered' ) ) {
				this.props.setAttributes( { shadow: null } );
			}
		}

		if ( this.props.isSelected !== prevProps.isSelected && this.props.isSelected === false ) {
			this.setState( { selectedImage: null } );
		}
	}

	setupImageLocations = ( images = null ) => {
		const theImages = images || this.props.attributes.images;

		const placeholderCount = this.props.className.includes( 'is-style-tiled' ) || this.props.className.includes( 'is-style-layered' ) ? 4 : 5;
		const imageLocations = [];

		for ( let index = 0; index < placeholderCount; index++ ) {
			imageLocations.push( theImages.find( image => parseInt( image.index ) === parseInt( index ) ) || {} );
		}

		this.props.setAttributes( { images: imageLocations } );
		this.setState( { images: imageLocations } );
	};

	onSelectImage = ( index ) => {
		if ( this.state.selectedImage !== index ) {
			this.setState( { selectedImage: index } );
		}
	}

	uploadImage = ( files, index ) => {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ image ] ) => this.replaceImage( image, index ),
		} );
	};

	replaceImage = ( image, index ) => {
		const { attributes } = this.props;

		const images = [
			...attributes.images.filter( image => parseInt( image.index ) !== parseInt( index ) ),
			{ ...helper.pickRelevantMediaFiles( image ), index },
		];
		this.setupImageLocations( images );
	};

	removeImage = ( index ) => {
		const { attributes } = this.props;

		const images = [
			...attributes.images.filter( image => parseInt( image.index ) !== parseInt( index ) ),
		];
		this.setupImageLocations( images );
	};

	updateImageAttributes = ( index, newAttributes ) => {
		const { attributes } = this.props;
		const image = attributes.images.filter( image => parseInt( image.index ) === parseInt( index ) ).pop();

		const images = [
			...attributes.images.filter( image => parseInt( image.index ) !== parseInt( index ) ),
			Object.assign( {}, image, newAttributes ),
		];

		this.setupImageLocations( images );
	}

	saveCustomLink() {
		this.setState( { isSaved: true } );
	}

	renderImage( index ) {
		const image = this.props.attributes.images.filter( image => parseInt( image.index ) === parseInt( index ) ).pop() || {};
		const isSelected = this.props.isSelected && this.state.selectedImage === image.index;
		const enableCaptions = ! this.props.className.includes( 'is-style-layered' );

		const dropZone = (
			<DropZone
				onFilesDrop={ files => this.uploadImage( files, index ) }
				label={ __( 'Drop image to replace' ) }
			/>
		);

		return (
			<Fragment>
				<a onClick={ () => this.onSelectImage( image.index ) }>
					<figure
						className={ classnames( {
							'wp-block-coblocks-gallery-collage__figure': true,
							'is-transient': isBlobURL( image.url ),
							'is-selected': isSelected,
							[ `has-shadow-${ this.props.attributes.shadow }` ]: this.props.attributes.shadow,
						} ) }>
						{ isSelected && (
							<div className="components-coblocks-gallery-item__remove-menu">
								<IconButton
									icon="no-alt"
									onClick={ () => this.removeImage( index ) }
									className="coblocks-gallery-item__button"
									label={ __( 'Remove Image' ) }
									disabled={ ! isSelected }
								/>
							</div>
						) }
						{ this.state.selectedImage === image.index && this.props.attributes.linkTo === 'custom' &&
							<form
								className="components-coblocks-gallery-item__image-link"
								onSubmit={ ( event ) => event.preventDefault() }>
								<Dashicon icon="admin-links" />
								<URLInput
									value={ image.imgLink }
									onChange={ ( imgLink ) => this.updateImageAttributes( index, { imgLink } ) }
								/>
								<IconButton icon={ this.state.isSaved ? 'saved' : 'editor-break' } label={ this.state.isSaved ? __( 'Saving' ) : __( 'Apply' ) } onClick={ this.saveCustomLink } type="submit" />
							</form>
						}
						{ dropZone }
						{ isBlobURL( image.url ) && <Spinner /> }
						<img src={ image.url } alt={ image.alt } />
						{ enableCaptions && this.props.attributes.captions && ( image.caption || isSelected ) &&
							<RichText
								tagName="figcaption"
								placeholder={ __( 'Write caption...' ) }
								className="coblocks-gallery--caption"
								value={ image.caption }
								onChange={ ( caption ) => this.updateImageAttributes( index, { caption } ) }
								isSelected={ isSelected }
								inlineToolbar
							/>
						}
					</figure>
				</a>
			</Fragment>
		);
	}

	gutterClasses = ( index ) => {
		const {
			attributes,
			className,
		} = this.props;

		const {
			gutter,
			gutterMobile,
		} = attributes;

		let gutterIndex;

		switch ( index ) {
			case 0:
				gutterIndex = `pr-${ gutterMobile } desktop:pr-${ gutter } pb-${ gutterMobile } desktop:pb-${ gutter }`;
				break;
			case 1:
				gutterIndex = `pl-${ gutterMobile } desktop:pl-${ gutter } pb-${ gutterMobile } desktop:pb-${ gutter }`;
				break;
			case 2:
				gutterIndex = `pt-${ gutterMobile } desktop:pt-${ gutter } pr-${ gutterMobile } desktop:pr-${ gutter } pl-${ gutterMobile } desktop:pl-${ gutter }`;
				break;
			case 3:
				gutterIndex = `pt-${ gutterMobile } desktop:pt-${ gutter } pr-${ gutterMobile } desktop:pr-${ gutter } pl-${ gutterMobile } desktop:pl-${ gutter }`;
				break;
			case 4:
				gutterIndex = `pt-${ gutterMobile } desktop:pt-${ gutter } pl-${ gutterMobile } desktop:pl-${ gutter }`;
				break;
		}

		if ( className.includes( 'is-style-tiled' ) ) {
			switch ( index ) {
				case 0:
					gutterIndex = `pr-${ gutterMobile } desktop:pr-${ gutter } pb-${ gutterMobile } desktop:pb-${ gutter }`;
					break;
				case 1:
					gutterIndex = `pl-${ gutterMobile } desktop:pl-${ gutter } pb-${ gutterMobile } desktop:pb-${ gutter }`;
					break;
				case 2:
					gutterIndex = `pt-${ gutterMobile } desktop:pt-${ gutter } pr-${ gutterMobile } desktop:pr-${ gutter }`;
					break;
				case 3:
					gutterIndex = `pt-${ gutterMobile } desktop:pt-${ gutter } pl-${ gutterMobile } desktop:pl-${ gutter }`;
					break;
			}
		}

		if ( className.includes( 'is-style-layered' ) ) {
			gutterIndex = null;
		}

		return gutterIndex;
	};

	renderPlaceholder( index ) {
		return (
			<MediaPlaceholder
				className={ classnames( 'wp-block-coblocks-gallery-collage__figure' ) }
				allowedTypes={ [ 'image' ] }
				multiple={ false }
				icon={ false }
				labels={ {
					title: ' ',
					instructions: ' ',
				} }
				onSelect={ image => this.replaceImage( image, index ) }
			/>
		);
	}

	render() {
		const {
			attributes,
			className,
			noticeUI,
		} = this.props;

		const {
			captionStyle,
			filter,
		} = attributes;

		const enableGutter = ! className.includes( 'is-style-layered' );
		const enableCaptions = ! className.includes( 'is-style-layered' );

		return (
			<Fragment>
				<Controls { ...this.props } />
				<Inspector { ...this.props } enableGutter={ enableGutter } enableCaptions={ enableCaptions } />
				{ noticeUI }
				<div className={ classnames( className, {
					[ `has-filter-${ filter }` ]: filter !== 'none',
					[ `has-caption-style-${ captionStyle }` ]: captionStyle !== undefined,
				} ) }
				>
					<ul>
						{ this.state.images.map( ( img, index ) => {
							const theIndex = img.index || index;

							return (
								<li
									key={ `image-${ theIndex }` }
									className={ classnames( 'wp-block-coblocks-gallery-collage__item', this.gutterClasses( index ) ) }
								>
									{ !! img.url ? this.renderImage( theIndex ) : this.renderPlaceholder( theIndex ) }
								</li>
							);
						} ) }
					</ul>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withNotices,
] )( GalleryCollageEdit );

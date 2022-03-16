<?php

class CoBlocks_Gallery_Stacked_Migrate extends CoBlocks_Block_Migration {
	private $has_border_radius = false;

	/**
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		return array_merge(
			$this->calculate_group_attributes(),
			$this->calculate_image_attributes(),
		);
	}

	/**
	 * Calculate attributes applied to the gallery.
	 *
	 * @return array attributes found and their values.
	 */
	private function calculate_group_attributes() {
		$block_wrapper = $this->query_selector( '//div[contains(@class,"wp-block-coblocks-gallery-stacked")]' );
		if ( ! $block_wrapper ) return array();

		$gallery_wrapper = $this->query_selector( '//ul[contains(@class,"coblocks-gallery")]' );
		if ( ! $gallery_wrapper ) return array();

		$this->has_border_radius = $this->get_attribute_from_classname( 'has-border-radius-', $block_wrapper );

		return array(
			'className' => $this->has_border_radius ? 'is-style-default' : 'is-style-compact',
			'filter' => $this->get_attribute_from_classname( 'has-filter-', $gallery_wrapper ),
			'align' => $this->get_attribute_from_classname( 'align', $block_wrapper ),
			'lightbox' => $this->get_attribute_from_classname( 'has-lightbox', $block_wrapper ),
		);
	}

	/**
	 * Calculate attributes applied to the gallery items.
	 *
	 * @return array attributes found and their values.
	 */
	private function calculate_image_attributes() {
		$gallery_images = array();
		$gallery_items = $this->query_selector_all( '//li[contains(@class,"coblocks-gallery--item")]' );

		foreach ( $gallery_items as $gallery_item ) {
			$img_element = $gallery_item->getElementsByTagName( 'img' )->item( 0 );
			$figcaption_element = $gallery_item->getElementsByTagName( 'figcaption' )->item( 0 );
			$anchor_element = $gallery_item->getElementsByTagName( 'a' )->item( 0 );

			$image_attributes = array(
				'alt' => $this->get_value_from_element_attribute( $img_element, 'alt' ),
				'animation' => $this->get_value_from_element_attribute( $gallery_item, 'data-coblocks-animation' ),
				'caption' => $this->get_value_from_element_attribute( $figcaption_element, 'textContent' ),
				'href' => $this->get_value_from_element_attribute( $anchor_element, 'href' ),
				'imgLink' => $this->get_value_from_element_attribute( $img_element, 'data-imgLink' ),
				'link' => $this->get_value_from_element_attribute( $img_element, 'data-link' ),
				'url' => $this->get_value_from_element_attribute( $img_element, 'src' ),
			);

			$border_radius_attr = array();
			if ( $this->has_border_radius ) {
				$border_radius_attr = array(
					'style' => array(
						'border' => array(
							'radius' => $this->has_border_radius . 'px',
						),
					),
				);
			}

			array_push(
				$gallery_images,
				array_filter( array_merge(
					$image_attributes,
					$border_radius_attr,
				) )
			);
		}

		return array( 'images' => $gallery_images );
	}
}

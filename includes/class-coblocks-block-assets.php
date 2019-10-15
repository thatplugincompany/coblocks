<?php
/**
 * Load assets for our blocks.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load general assets for our blocks.
 *
 * @since 1.0.0
 */
class CoBlocks_Block_Assets {


	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Block_Assets
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Block_Assets();
		}
	}

	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_url;

	/**
	 * The plugin version.
	 *
	 * @var string $_version
	 */
	private $_version;

	/**
	 * The plugin version.
	 *
	 * @var string $_slug
	 */
	private $_slug;

	/**
	 * The Constructor.
	 */
	public function __construct() {
		$this->_version = COBLOCKS_VERSION;
		$this->_slug    = 'coblocks';
		$this->_url     = untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) );

		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ) );
		add_action( 'init', array( $this, 'editor_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_scripts' ) );
		add_action( 'the_post', array( $this, 'frontend_scripts' ) );
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets() {

		// Styles.
		wp_enqueue_style(
			$this->_slug . '-frontend',
			$this->_url . '/dist/blocks.style.build.css',
			array(),
			$this->_version
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets() {

		// Styles.
		wp_register_style(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.editor.build.css',
			array(),
			$this->_version
		);

		// Scripts.
		wp_register_script(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-plugins', 'wp-components', 'wp-edit-post', 'wp-api', 'wp-rich-text', 'wp-editor' ),
			time()
		);

		$post_id    = filter_input( INPUT_GET, 'post', FILTER_SANITIZE_NUMBER_INT );
		$post_title = get_bloginfo( 'name' ) . ( ( false === $post_id ) ? '' : sprintf( ' - %s', get_the_title( $post_id ) ) );

		/**
		 * Filter the default block email address value
		 *
		 * @param string  $to      Admin email.
		 * @param integer $post_id Current post ID.
		 */
		$email_to = (string) apply_filters( 'coblocks_form_default_email', get_option( 'admin_email' ), $post_id );

		wp_localize_script(
			$this->_slug . '-editor',
			'coblocksBlockData',
			[
				'form'        => [
					'adminEmail'   => $email_to,
					'emailSubject' => $post_title,
				],
				'customIcons' => $this->get_custom_icons(),
			]
		);

	}

	/**
	 * Load custom icons from the theme directory, if they exist
	 *
	 * @return array Custom icons array if they exist, else empty array.
	 */
	public function get_custom_icons() {

		$config = [];
		$icons  = glob( get_stylesheet_directory() . '/coblocks/icons/*.svg' );

		if ( empty( $icons ) ) {

			return [];

		}

		if ( file_exists( get_stylesheet_directory() . '/coblocks/icons/config.json' ) ) {

			$config = json_decode( file_get_contents( get_stylesheet_directory() . '/coblocks/icons/config.json' ), true );

		}

		$custom_icons = [];

		foreach ( $icons as $icon ) {

			$icon_slug = str_replace( '.svg', '', basename( $icon ) );
			$icon_name = ucwords( str_replace( '-', ' ', $icon_slug ) );

			$custom_icons[ $icon_slug ] = [
				'label'    => $icon_name,
				'keywords' => strtolower( $icon_name ),
				'icon'     => file_get_contents( $icon ),
			];

		}

		if ( ! empty( $config ) ) {

			foreach ( $config as $icon => $metadata ) {

				if ( ! array_key_exists( $icon, $custom_icons ) ) {

					continue;

				}

				$custom_icons[ $icon ] = array_replace_recursive( $custom_icons[ $icon ], $metadata );

			}
		}

		return $custom_icons;

	}

	/**
	 * Enqueue front-end assets for blocks.
	 *
	 * @access public
	 * @since 1.9.5
	 */
	public function frontend_scripts() {

		// Custom scripts are not allowed in AMP, so short-circuit.
		if ( CoBlocks()->is_amp() ) {
			return;
		}

		// Define where the asset is loaded from.
		$dir = CoBlocks()->asset_source( 'js' );

		// Define where the vendor asset is loaded from.
		$vendors_dir = CoBlocks()->asset_source( 'js', 'vendors' );

		// Masonry block.
		if ( has_block( $this->_slug . '/gallery-masonry' ) ) {
			wp_enqueue_script(
				$this->_slug . '-masonry',
				$dir . $this->_slug . '-masonry' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery', 'masonry', 'imagesloaded' ),
				$this->_version,
				true
			);
		}

		// Carousel block.
		if ( has_block( $this->_slug . '/gallery-carousel' ) ) {
			wp_enqueue_script(
				$this->_slug . '-flickity',
				$vendors_dir . '/flickity' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery' ),
				$this->_version,
				true
			);
		}

		// Post Carousel block.
		if ( has_block( $this->_slug . '/post-carousel' ) ) {
			wp_enqueue_script(
				$this->_slug . '-slick',
				$vendors_dir . '/slick' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery' ),
				$this->_version,
				true
			);
			wp_enqueue_script(
				$this->_slug . '-slick-initializer-front',
				$dir . $this->_slug . '-slick-initializer-front' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery' ),
				$this->_version,
				true
			);
		}

		// Lightbox.
		if ( has_block( $this->_slug . '/gallery-masonry' ) || has_block( $this->_slug . '/gallery-stacked' ) ) {
			wp_enqueue_script(
				$this->_slug . '-lightbox',
				$dir . $this->_slug . '-lightbox' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery' ),
				$this->_version,
				true
			);

			wp_enqueue_script(
				$this->_slug . '-masonry',
				$dir . $this->_slug . '-masonry' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery', 'masonry', 'imagesloaded' ),
				$this->_version,
				true
			);
		}
	}

}

CoBlocks_Block_Assets::register();

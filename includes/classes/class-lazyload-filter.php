<?php
/**
 * Accessibility Checker plugin file.
 *
 * @package Accessibility_Checker
 */

namespace EDAC\Inc;

/**
 * A class that handles lazyload filter.
 * This class allows for disabling lazyload when highlighting elements.
 * 
 * @since 1.8.0 // TODO: Update with correct version number when released.
 */
class Lazyload_Filter {

	/**
	 * Initialize WordPress hooks.
	 */
	public function init_hooks() {
		add_filter( 'perfmatters_lazyload', array( $this, 'perfmatters' ) );
	}

	/**
	 * Add a filter for lazyloading images using the perfmatters_lazyload hook.
	 *
	 * @param bool $lazyload Whether to lazyload images.
	 * @return void
	 */
	public function perfmatters( $lazyload ) {
		if ( 
			! isset( $_GET['edac_nonce'] ) 
			|| ! wp_verify_nonce( sanitize_text_field( $_GET['edac_nonce'] ), 'edac_highlight' ) 
		) {
			return $lazyload;
		}
		if ( isset( $_GET['edac'] ) ) {
			return false;
		}
		return $lazyload;
	}
}

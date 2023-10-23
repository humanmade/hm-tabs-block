<?php
/**
 * Tabs Block.
 */

namespace HM_Tab_Block\Blocks\Tabs_Item;

function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\register_block' );
}

function register_block() {
	register_block_type( get_parent_theme_file_path( '/blocks/build/tabs-item' ) );
}

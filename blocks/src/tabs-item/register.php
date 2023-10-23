<?php
/**
 * Tab Item Block.
 */

namespace HM_Tabs_Block\Blocks\Tabs_Item;

function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\register_block' );
}

function register_block() {
	register_block_type( plugin_dir_path( dirname( __FILE__, 4 ) .  '/blocks/build/tabs-item/block.json' ) );
}

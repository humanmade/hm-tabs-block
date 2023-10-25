<?php
/**
 * Tabs Block.
 */

namespace HM_Tabs_Block\Blocks\Tabs;

function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\register_block' );
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts' );
}

function register_block() {
	register_block_type( plugin_dir_path( dirname( __FILE__, 4 ) .  '/blocks/build/tabs/block.json' ) );
}

function enqueue_scripts() {
	wp_script_add_data( 'yell-tabs-script', 'strategy', 'async' );
}

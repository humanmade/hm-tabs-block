<?php
/**
 * Simple Tabs Block Plugin.
 **
 * @link              https://humanmade.com
 * @since             1.0.0
 * @package           hm-tabs-block
 *
 * Plugin Name:       HM Tabs Block
 * Plugin URI:        https://humanmade.com
 * Description:       Simple tabs block for Wordpress block editor.
 * Version:           1.0.0
 * Author:            Human Made Limited
 * Author URI:        https://humanmade.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       hm-tabs
 * Domain Path:       /languages
 */

namespace HM_Tab_Block;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once __DIR__ . '/blocks/src/tabs/register.php';
require_once __DIR__ . '/blocks/src/tabs-item/register.php';

// Setup custom blocks.
Blocks\Tabs\bootstrap();
Blocks\Tabs_Item\bootstrap();

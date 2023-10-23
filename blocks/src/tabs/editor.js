/**
 * Block grouping for a tabbed layout block.
 */

import metadata from './block.json';
import TabEdit from './edit';
import Save from './save';
import { registerBlockType } from '@wordpress/blocks';

import './editor.css';

registerBlockType( metadata.name, {
	edit: TabEdit,
	save: Save,
} );

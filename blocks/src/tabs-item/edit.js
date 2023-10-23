import { useEffect } from '@wordpress/element';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Provide an interface for editing the block.
 *
 * @param {Object}   props               Props
 * @param {Function} props.setAttributes Set attributes.
 * @param {string}   props.clientId      Unique block ID.
 * @param {Object}   props.attributes    Attributes.
 * @return {Element} Formatted blocks.
 */
function Edit( { attributes, setAttributes, clientId } ) {
	const blockProps = useBlockProps( {
		className: 'hm-tabs-item',
	} );

	const { children, ...rest } = useInnerBlocksProps( blockProps );

	// Update the block ID.
	// Always override saved value to ensure we never have duplicates.
	useEffect( () => {
		if ( attributes.id !== clientId ) {
			setAttributes( { id: clientId } );
		}
	}, [ clientId, attributes.id, setAttributes ] );

	return <div { ...rest }>{ children }</div>;
}

export default Edit;

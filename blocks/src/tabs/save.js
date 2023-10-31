import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Saves the block content for display on the frontend.
 *
 * @param {Object} props
 * @param {Object} props.attributes
 * @return {Element} Formatted block.
 */
function Save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: 'hm-tabs',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'hm-tabs__content',
	} );

	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />
		</div>
	);
}

export default Save;

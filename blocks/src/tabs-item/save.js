import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Saves the block content for display on the frontend.
 *
 * @param {Object} props Props
 * @return {Element} Formatted block.
 */
function Save( props ) {
	const blockProps = useBlockProps.save( {
		className: 'hm-tabs-item',
		id: `hm-tabs-item-${ props.attributes.id }`,
		role: 'tabpanel',
		'aria-labelledby': `hm-tabs-nav-${ props.attributes.id }`,
		tabindex: 0,
	} );

	return (
		<div { ...blockProps }>
			<h2 className="hm-tabs-item__title">{ props.attributes.title }</h2>
			<div { ...useInnerBlocksProps.save() } />
		</div>
	);
}

export default Save;

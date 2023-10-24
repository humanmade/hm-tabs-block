import { InnerBlockSlider } from '@humanmade/block-editor-components';
import { useMemo, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	InspectorControls,
	store as blockEditorDataStore,
} from '@wordpress/block-editor';

import { TextControl, PanelBody } from '@wordpress/components';

const TAB_LIMIT = 3;
const ALLOWED_BLOCK = 'hm/tabs-item';

/**
 * Provide an interface for editing the block.
 *
 * @param {Object} props Props
 * @return {Element} Formatted blocks.
 */
function TabEdit( props ) {
	const { clientId, attributes, setAttributes } = props;

	const innerBlocks = useSelect(
		( select ) => {
			return (
				select( 'core/block-editor' ).getBlock( clientId )
					?.innerBlocks || []
			);
		},
		[ clientId ]
	);

	// Memoize an array of tab titles to reduce computation within the effect.
	const itemList = useMemo( () => {
		return innerBlocks.map( ( block ) => ( {
			title: block?.attributes?.title ?? '',
			id: block?.attributes?.id || block.clientId,
		} ) );
	}, [ innerBlocks ] );

	const blockProps = useBlockProps( {
		className: 'hm-tabs',
	} );

	const { updateBlockAttributes } = useDispatch( blockEditorDataStore.name );

	const [ currentItemIndex, setCurrentItemIndex ] = useState( 0 );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Tab Block Advanced Settings', 'hm-tabs' ) }
				>
					<TextControl
						label="Tab list container ID"
						help={ __(
							'By default, the tabs are inserted at the top of the tab block. To override this behaviour and insert the tabs elsewhere on the page, specify the ID of the alternative container element.',
							'hm-tabs'
						) }
						value={ attributes.tablistContainerId }
						onChange={ ( tablistContainerId ) =>
							setAttributes( { tablistContainerId } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div className="hm-tabs__nav">
				{ itemList.map( ( item, i ) => {
					let buttonClassName = 'hm-tabs__nav-button';

					if ( i === currentItemIndex ) {
						buttonClassName += ' hm-tabs__nav-button--is-active';
					}

					return (
						<RichText
							key={ item.id }
							tagName="span"
							className={ buttonClassName }
							value={ item.title }
							onChange={ ( title ) => {
								updateBlockAttributes( item.id, { title } );
							} }
							placeholder={ __( 'Tab title…', 'hm-tabs' ) }
							onClick={ () => {
								setExternalCurrentItemIndex( i );
							} }
						/>
					);
				} ) }
			</div>
			{
				<InnerBlockSlider
					allowedBlock={ ALLOWED_BLOCK }
					className={ 'hm-tabs__content' }
					slideLimit={ TAB_LIMIT }
					parentBlockId={ clientId }
					externalCurrentItemIndex={ currentItemIndex }
					setExternalCurrentItemIndex={ setCurrentItemIndex }
				/>
			}
		</div>
	);
}

export default TabEdit;

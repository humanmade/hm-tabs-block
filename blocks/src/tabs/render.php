<?php

// Load block content into dom document.
$dom = new DOMDocument;
libxml_use_internal_errors( true );
$dom->loadHTML( '<meta charset="utf-8">' . $content );
libxml_clear_errors();

$xpath = new DOMXPath( $dom );

// Create tablist container div.
$tablist_element = $dom->createElement( 'div' );
$tablist_element->setAttribute( 'class', 'hm-tabs__nav' );
$tablist_element->setAttribute( 'role', 'tablist' );

// Append a tab button for each tab item.
$tab_title_elements = $xpath->query( '//h2[contains(@class, "hm-tabs-item__title")]' );
foreach ( $tab_title_elements as $i => $tab_title_element ) {
	$tab_id = $tab_title_element->parentNode->getAttribute( 'id' );
	$button = $dom->createElement( 'button' );
	$button->setAttribute( 'class', 'hm-tabs__nav-button' );
	$button->setAttribute( 'role', 'tab' );
	$button->setAttribute( 'tabindex', $i === 0 ? '0' : '-1' );
	$button->setAttribute( 'aria-controls', $tab_id );
	$button->setAttribute( 'id', str_replace( 'hm-tabs-item-', 'hm-tabs-button-', $tab_id ) );
	$button->nodeValue = $tab_title_element->nodeValue;
	$tablist_element->appendChild( $button );
}

// Prepend tab list to top of tab block.
$tab_block_element = $xpath->query( '//div[contains(@class, "hm-tabs")][1]' )->item( 0 );
$tab_block_element->insertBefore( $tablist_element, $tab_block_element->firstChild );

// Maybe add tablist container id data attribute.
if ( ! empty( $attributes['tablistContainerId'] ) ) {
	$tab_block_element->setAttribute( 'data-tablist-container-id', $attributes['tablistContainerId'] );
}

// Output modified HTML.
// doc > html > head + body > block
echo $dom->saveHTML( $dom->documentElement->firstElementChild->nextSibling->firstChild ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

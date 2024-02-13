<?php
$p = new \WP_HTML_Tag_Processor( $content );

if ( $p->next_tag( [ 'tag_name' => 'div', 'class_name' => 'hm-tabs-item' ] ) ) {
	$p->set_attribute( 'role', 'tabpanel' );
	$p->set_attribute( 'aria-labelledby', 'hm-tabs-nav-' . $attributes['id'] );
	$p->set_attribute( 'tabindex', '0' );
}

if ( $p->next_tag( [ 'tag_name' => 'h2', 'class_name' => 'hm-tabs-item__title' ] ) ) {
	$p->set_attribute( 'hidden', 'true' );
	$p->set_attribute( 'style', 'display:none;' );
}

echo $p->get_updated_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

/**
 * Functionality for the HM Tab block.
 *
 * Adapted from the code provided on https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role
 */

import './frontend.css';

/**
 * Change to tabs.
 *
 * @param {HTMLElement} tab          Tab element.
 * @param {HTMLElement} blockElement Tab block element.
 */
function activateTab( tab, blockElement ) {
	blockElement.classList.add( 'hm-tabs--focused' );

	const handleClickOutside = ( event ) => {
		if (
			event.target !== blockElement &&
			! blockElement.contains( event.target )
		) {
			blockElement.classList.remove( 'hm-tabs--focused' );
			document.removeEventListener( 'click', handleClickOutside );
		}
	};

	// Skip activating if tab is already selected.
	if ( tab.getAttribute( 'aria-selected' ) === 'true' ) {
		// But clicking on an active tab, should focus container.
		document.addEventListener( 'click', handleClickOutside );
		return;
	}

	const panel = document.getElementById(
		tab.getAttribute( 'aria-controls' )
	);
	const tabPanels = blockElement.querySelectorAll( '[role="tabpanel"]' );

	// Remove all current selected tabs
	tab.parentElement
		.querySelectorAll( '[role="tab"][aria-selected="true"]' )
		.forEach( ( t ) => {
			t.setAttribute( 'aria-selected', false );
			t.setAttribute( 'tabindex', -1 );
			t.classList.remove( 'hm-tabs__nav-button--is-active' );
		} );

	// Set this tab as selected
	tab.setAttribute( 'aria-selected', true );
	tab.setAttribute( 'tabindex', 0 );
	tab.classList.add( 'hm-tabs__nav-button--is-active' );

	// Hide all tab panels
	tabPanels.forEach( ( p ) => {
		if ( p.getAttribute( 'id' ) === panel.getAttribute( 'id' ) ) {
			p.removeAttribute( 'hidden' );
		} else {
			p.setAttribute( 'hidden', true );
		}
	} );

	// Unfocus after switching tabs.
	blockElement.classList.remove( 'hm-tabs--focused' );
}

/**
 * Handle click event on tab.
 *
 * @param {Object}      e            Event
 * @param {HTMLElement} blockElement Tab block element.
 */
function handleTabClick( e, blockElement ) {
	activateTab( e.target, blockElement );
}

/**
 * Handle key navigation on tab element.
 *
 * @param {Object}      e            Event
 * @param {HTMLElement} blockElement Tab block element.
 */
function handleKeydown( e, blockElement ) {
	if ( ! ( e.keyCode === 39 || e.keyCode === 37 ) ) {
		return;
	}

	const tab = blockElement.querySelector(
		'[role="tab"][aria-selected="true"]'
	);
	const tabs = blockElement.querySelectorAll( '[role="tab"]' );

	const currentTabIndex = Array.from( tabs ).findIndex(
		( t ) => tab.getAttribute( 'id' ) === t.getAttribute( 'id' )
	);

	// Work out the next tab.
	let nextTabIndex =
		e.keyCode === 37 ? currentTabIndex - 1 : currentTabIndex + 1;
	nextTabIndex = Math.min( Math.max( nextTabIndex, 0 ), tabs.length );

	if ( nextTabIndex !== currentTabIndex ) {
		activateTab( tabs[ nextTabIndex ] );
		tabs[ currentTabIndex ].blur();
		tabs[ nextTabIndex ].focus();
	}
}

function createTabs( blockElement ) {
	// Create tabs.
	return Array.from( blockElement.querySelectorAll( '.hm-tabs-item' ) ).map(
		( tabItemEl, i ) => {
			const tabBtnElement = document.createElement( 'button' );
			tabBtnElement.setAttribute( 'role', 'tab' );
			tabBtnElement.setAttribute( 'tabindex', i === 0 ? '0' : '-1' );
			tabBtnElement.setAttribute( 'aria-controls', tabItemEl.id );
			tabBtnElement.setAttribute(
				'id',
				tabItemEl.id.replace( 'hm-tabs-item-', 'hm-tabs-button-' )
			);
			tabBtnElement.setAttribute(
				'aria-selected',
				i === 0 ? 'true' : 'false'
			);

			tabBtnElement.classList.add( 'hm-tabs__nav-button' );
			tabBtnElement.classList.toggle(
				'hm-tabs__nav-button--is-active',
				i === 0
			);

			const title =
				tabItemEl.querySelector( '.hm-tabs-item__title' ).textContent ||
				'';

			tabBtnElement.appendChild( document.createTextNode( title ) );
			return tabBtnElement;
		}
	);
}

/**
 * Initialize tab block.
 *
 * Ensure initial state is correct.
 *
 * @param {HTMLElement} blockElement Tab block.
 */
function initTabBlock( blockElement ) {
	const tabsListElement = document.createElement( 'div' );
	tabsListElement.classList.add( 'hm-tabs__nav' );
	tabsListElement.setAttribute( 'role', 'tablist' );

	const customTabContainerId = blockElement.dataset.tablistContainerId;

	if (
		customTabContainerId &&
		document.getElementById( customTabContainerId )
	) {
		document
			.getElementById( customTabContainerId )
			.prepend( tabsListElement );
	} else {
		blockElement.prepend( tabsListElement );
	}

	const tabs = createTabs( blockElement );

	// Add a click event handler to each tab
	tabs.forEach( ( tabBtnElement ) => {
		tabsListElement.appendChild( tabBtnElement );

		const panel = document.getElementById(
			tabBtnElement.getAttribute( 'aria-controls' )
		);

		const isActive = tabBtnElement.classList.contains(
			'hm-tabs__nav-button--is-active'
		);

		if ( isActive ) {
			panel.removeAttribute( 'hidden' );
		} else {
			panel.setAttribute( 'hidden', true );
		}

		tabBtnElement.addEventListener( 'click', ( event ) => {
			handleTabClick( event, blockElement );
		} );
	} );

	tabsListElement.addEventListener( 'keydown', ( event ) => {
		handleKeydown( event, blockElement );
	} );

	blockElement.classList.add( 'hm-tabs--is-initalized' );
}

/**
 * Kick it all off.
 */
function bootstrap() {
	document
		.querySelectorAll( '.hm-tabs' )
		.forEach( ( el ) => initTabBlock( el ) );
}

document.addEventListener( 'DOMContentLoaded', bootstrap );

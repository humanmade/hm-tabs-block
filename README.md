# HM Tabs Block

Super simple tab block for the WordPress block editor.

The Objective is to create something incredibly flexible, providing simple markup without any styling, allowing you to integrate with your theme easily.

It also aims to be accessible. The implementation is adapted from the [MDN Aria tab role documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role).

Performance is also important. The JS is lightweight and has no dependencies.

The tabs block is made up of 2 blocks. A container tabs block, and a child tabs-item block. The tabs item block is simply a wrapper, allowing you to add any content you wish.

## Saved markup.

One of the aims of this block is to keep the saved HTML really minimal. It should look OK even if this plugin is deactivated.

All of the functionality and interactive elements are created on the fly either rendered server side or constructed in JS.

## Styling the tabs.

The tabs are functional but unstyled.

Here is a sample of the markup to show the classes you can use to style the tabs.

```html
<div class="hm-tabs hm-tabs--is-initialized">
    <div class="hm-tabs__nav" role="tablist">
        <button class="hm-tabs__nav-button hm-tabs__nav-button--is-active">Tab 1</button>
        <button class="hm-tabs__nav-button">Tab 2</button>
        ...
    </div>
    <div class="hm-tabs__content">
        <div class="wp-block-hm-tabs-item hm-tabs-item">
            <h2 class="hm-tabs-item__title">Tab 1</h2>
            <div class="hm-tabs-item__content">
            </div>
        </div>
        <div class="wp-block-hm-tabs-item hm-tabs-item">
            <h2 class="hm-tabs-item__title">Tab 2</h2>
            <div class="hm-tabs-item__content">
            </div>
        </div>
        ...
    </div>
</div>
```

### Example styling

And here's some CSS to style up some nice old school looking tabs.

```css
.hm-tabs__nav {
	display: flex;
	position: relative;
	z-index: 1;
	margin: 0 0 -1px 0;
}

.hm-tabs__nav-button {
	background-color: #ddd;
	border: 1px solid #aaa;
	padding: 12px 16px;
	margin: 0;
	font-size: 12px;
}

.hm-tabs__nav-button + .hm-tabs__nav-button {
	border-left: none;
}

.hm-tabs__nav-button--is-active {
	background-color: #fff;
	border-bottom-color: #fff;
}

.hm-tabs__content {
	background-color: #fff;
	border: 1px solid #aaa;
	padding: 16px;
}
```

### Some useful classes for styling and animation.

* `.hm-tabs--is-initialized` Added once JS has initialized the tab functionality.
* `.hm-tabs--is-visible` Added when the tab if first scrolled into view.
* `.hm-tabs--is-focused`` Added when a tab is active.
* `.hm-tabs-item--is-active` Added when the tab is shown and removed after.

### Example of animation

Use this in addition to the styles above to create a slide/fade effect when switching tabs

```
@keyframes testFadeInLeft {
	from {
		visibility: hidden;
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0);
		transform: translate3d(-100%, 0, 0);
	}

	1% {
		visibility: visible;
	}

	to {
		opacity: 1;
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
	}
}

@keyframes testFadeOutRight {
	from {
		opacity: 1;
		visibility: visible;
	}

	99% {
		visibility: visible;
	}

	to {
		opacity: 0;
		-webkit-transform: translate3d(100%, 0, 0);
		transform: translate3d(100%, 0, 0);
		visibility: hidden;
	}
}

.hm-tabs__content {
	position: relative;
	display: grid;
	overflow: hidden;

	.hm-tabs-item {
		grid-column: 1;
		grid-row: 1;

		&[hidden="true"] {
			display: block;
			opacity: 0;
			visibility: hidden;
		}
	}
}

.hm-tabs-item {
	position: relative;

	&:not(.hm-tabs-item--is-active) {
		animation-duration: 0.25s;
		animation-name: testFadeOutRight;
	}

	&--is-active {
		opacity: 1;
		animation-duration: 0.25s;
		animation-name: testFadeInLeft;
	}
}

```

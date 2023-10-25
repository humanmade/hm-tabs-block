# HM Tabs Block

Super simple tab block for the WordPress block editor.

The Objective is to create something incredibly flexible, providing simple markup without any styling, allowing you to integrate with your theme easily.

It also aims to be accessible. The implementation is adapted from the [MDN Aria tab role documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role).

Performance is also important. The JS is lightweight and has no dependencies.

The tabs block is made up of 2 blocks. A container tabs block, and a child tabs-item block. The tabs item block is simply a wrapper, allowing you to add any content you wish.

## Styling the tabs.

The tabs are functional but unstyled.

Here is a sample of the markup to show the classes you can use to style the tabs.

```html
<div class="hm-tabs hm-tabs--is-initalized">
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

And here's some CSS to style up some nice old school looking tabs.

```css
.hm-tabs__nav {
	display: flex;
}

.hm-tabs__nav-button {
	background-color: #ddd;
	border: 1px solid #aaa;
	padding: 12px 16px;
	margin: 0 0 -1px 0;
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

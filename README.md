# @grifart/smoothscroll

Aim of this library is to provide more user-friendly and less epileptic scrolling effect on a long content as well as unification of all types of scrolling on a page.


## Installation and usage

```bash
yarn add @grifart/smoothscroll
```

```javascript
import SmoothScroll from '@grifart/smoothscroll';

// use defaults
SmoothScroll.enable();

// customize
SmoothScroll.enable({
	scrollOnLoad: true,
	scrollOnLinkClick: true,
});
```

### Options

| Option | Value | Default value | Description |
| --- | --- | --- | --- |
| `scrollOnLoad`\* | `true`/`false` | `true` | Causes smooth scroll to anchored element when the page is loaded.
| `scrollOnLinkClick` | `true`/`false` | `true` | Causes smooth scroll on given element when user clicks on an `a` tag having `href` starting with `#` character.

\*Note: when the page load lasts more than 500 ms, load smooth scroll effect is disabled as it would lead to user-unfriendly behaviour like jumping on the page up and down due to browser native behaviour.

### Methods

|Method|Parameters|
|---|---|
|`enable([options])`|`options` (optional): see above|
|`scrollToElement(element[, onScrollFinishedCallback])`|`element`: element to scroll to  `onScrollFinishedCallback` (optional): callback to trigger when scrolling is finished|
|`scrollToOffset(topOffset[, onScrollFinishedCallback])`|`topOffset`: scroll offset from top of document  `onScrollFinishedCallback` (optional): callback to trigger when scrolling is finished|
|`scrollToTarget(hashTarget[, onScrollFinishedCallback])`|`hashTarget`: instance of `HashTarget` object\* or `string`\*\*  `onScrollFinishedCallback` (optional): callback to trigger when scrolling is finished|

\* `HashTarget` is a value object representing a target to scroll to. You can easily initalize it with named constructor: `HashTarget.fromString('#some-identifier', document)`  
\*\* In case of passing `string`, `HashTarget` object will be instantiated automatically with current `document` context.

## More about

### Custom scrolling effect

Improved scrolling effect (internally called `ease-in-skip-out`) is registered by default and it works as basic ease-in-out with one modification that it skips content if it is too long. This results in nicer transition between two parts of a page.

### Covered scenarios

- scroll when clicking a link with an anchor (`<a href="#anchor">whatever</a>`)
- scroll when page is entered with an anchor (`https://example.com/whatever#anchor`)
- scroll when programatically needed to scroll to:
    - given position (top offset)
    - given element

## Development

```bash
yarn install
yarn dev
```

Every piece of this library comes with its unit test sitting alongside the script. Whole library is covered by integration test sitting in `src` folder.  
Note that you have to build assets first (`yarn build`) before running a test.

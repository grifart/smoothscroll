# @grifart/smoothscroll

Aim of this library is to provide more user-friendly
and less epileptic scrolling effect on a long content
by creating a customized easing and to apply this easing
to all various types of scrolling on a page
(see [Covered scenarios](#Covered scenarios)).


## Installation

```bash
npm install @grifart/smoothscroll
# or
yarn add @grifart/smoothscroll
```

## Usage

`@grifart/smoothscroll` exposes various functions to handle
different types of scrolling in your application. Each function
is importable through standard ES `import` directive.

### Global scrolling behavior

| Function | Description |
|---|---|
| **`handleOnLoadScroll()`** | Attaches scrolling to anchored element when the page is loaded.\* |
| **`handleOnLinkClickScroll()`** | Attaches scrolling to given element when user clicks on an `a` tag having `href` starting with `#` character. |

Use these functions **in top-level code**:

```javascript
import {handleOnLoadScroll, handleOnLinkClickScroll} from '@grifart/smoothscroll';

handleOnLoadScroll();
handleOnLinkClickScroll();
```

\*Note: when page load lasts more than 500 ms, load scroll effect
is disabled as it would lead to user-unfriendly behaviour like
jumping on the page up and down due to browser native behaviour.

### scrollToX functions

| Function                                                 | Parameters                                                                                                                                                     |
|----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `scrollToElement(element[, onScrollFinishedCallback])`   | `element`: element to scroll to;  `onScrollFinishedCallback` (optional): callback to trigger when scrolling is finished                                        |
| `scrollToOffset(topOffset[, onScrollFinishedCallback])`  | `topOffset`: scroll offset from top of document;  `onScrollFinishedCallback` (optional): callback to trigger when scrolling is finished                        |
| `scrollToTarget(targetHash[, onScrollFinishedCallback])` | `targetHash`: instance of `Hash` value object\* or hash a `string`;  `onScrollFinishedCallback` (optional): callback to trigger when scrolling is finished |

\* `Hash` is a value object representing a hash being requested.
You can easily initalize it with named constructor:
`Hash.fromString('#some-identifier')`

## More about

### Custom scrolling effect

Improved scrolling effect (internally called `ease-in-skip-out`) is registered
by default and it works as basic ease-in-out with one modification
that it skips content if it is too long. This results in nicer transition
between two distant parts in a page.

### Covered scenarios

- scroll when clicking a link with an anchor (`<a href="#anchor">whatever</a>`)
- scroll when page is entered with an anchor (`https://example.com/whatever#anchor`)
- scroll when programatically needed to scroll to:
    - given position (top offset)
    - given element
    - given target (`id` attribute)

## Development

```bash
yarn install
yarn dev
```

Every piece of this library comes with its unit test sitting alongside the script.
Whole library is covered by integration test sitting in `src` folder.  
Note that you have to build assets first (`yarn build`) before running a test.

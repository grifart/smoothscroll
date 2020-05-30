# @grifart/smoothscroll

As smoothscroll functionality is nice and more user-friendly, this library solves these two things which were often repeating in our code:

1. Enables smooth scrolling on all anchors starting with `#` character.
2. Enables smooth scrolling when page is entered with `#` character in URL.

Additionally this library comes with custom easing function registered by default which works as basic ease-in-out with one modification that it skips content if it is too long. This results in nicer transition between two parts of a page.


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
	scrollOnLoad: false,
	scrollOnLinkClick: true,
});
```

### Options

| Option | Value | Default value | Description |
| --- | --- | --- | --- |
| `scrollOnLoad`\* | `true`/`false` | `true` | Causes smooth scroll to anchored element when the page is loaded.
| `scrollOnLinkClick` | `true`/`false` | `true` | Causes smooth scroll on given element when user clicks on an `a` tag having `href` starting with `#` character.

\*Note: when the page load lasts more than 500 ms, load smooth scroll effect is disabled as it would lead to user-unfriendly behaviour like jumping on the page up and down due to browser native behaviour.


## Development

```bash
yarn install
yarn dev
```

Every piece of this library comes with its unit test sitting alongside the script. Whole library is covered by integration test sitting in `src` folder.

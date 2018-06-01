# grifart/smoothscroll

As smoothscroll functionality is nice and more user-friendly, this library solves these two things which were often repeating in our code:

1. Enables smooth scrolling on all anchors starting with `#` character.
2. Enables smooth scrolling when page is entered with `#` character in URL.

Additionally this library comes with custom easing function registered by default which works as basic ease-in-out with one modification that it skips content if it is too long. This results in nicer transition between two parts of a page.


## Usage

Import library using ES6 `import` statement and call the smoothscroll function.
It accepts one optional parameter - an `options` object, which allows you to turn on/off some behaviour.

```javascript
SmoothScroll([options])
```

### Options

| Option | Value | Default value | Description |
| --- | --- | --- | --- |
| `load` | `true`/`false` | `true` | Causes smooth scroll to anchored element when the page is loaded.\*
| `interaction` | `true`/`false` | `true` | Causes smooth scroll on given element when user clicks on an `a` tag having `href` starting with `#` character.

\*Note: when the page load lasts more than 500 ms, load smooth scrolling is disable as it would lead to user-unfriendly behaviour like jumping on the page up and down.

Usage example with all options passed:

```javascript
SmoothScroll({
	load: true,
	interaction: true,
});

```


## Development

Whole library consists only of one file - `index.js`.

If you need to check visually how the smooth scrolling behaviour acts like, you can take advantage of a testing file `visual.html` which has some lorem ipsum data and few of links to navigate through the content and test smooth scrolling.
To get it work, you need to run build first with following commands:

```bash
yarn install
yarn run gulp
```

You can use `yarn run gulp watch` as well.

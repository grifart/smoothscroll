# grifart/smoothscroll

As smoothscroll functionality is nice and more user-friendly, this library solves these two things which were often repeating in our code:

1. Enables smooth scrolling on all anchors starting with `#` character.
2. Enables smooth scrolling when page is entered with `#` character in URL.

Additionally this library comes with custom easing function registered by default which works as basic ease-in-out with one modification that it skips content if it is too long. This results in nicer transition between two parts of a page.


## Development

Whole library consists only of one file - `index.js`. If you need to check how the smoothscrolling looks, see *Visual check* section of this readme.

## Visual check

For checking a visual feeling of the smoothscroll funcionality, you can take advantage of a testing file `visual.html`.
You need to run build first to get it work with following commands:

```bash
yarn install
gulp
```

And you are ready to view it by opening `visual.html` in your favourite browser. To track for changes, run `gulp watch` instead of `gulp`.

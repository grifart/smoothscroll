import smoothScroll from 'smoothscroll-polyfill';

/**
 * As of version 62, Chrome started to support natively `behavior: smooth` in  `scrollIntoView()` method.
 * But it works strange - it moves the viewport just to the half of the target container.
 * Thus we have to force the polyfill to behave as intended.
 * Related: https://github.com/iamdustan/smoothscroll/issues/93
 */
window.__forceSmoothScrollPolyfill__ = true;
smoothScroll.polyfill();


export const handleInteraction = (documentObject) => {
	documentObject.addEventListener('DOMContentLoaded', () => {
		const items = documentObject.querySelectorAll('a[href^="#"]');

		for (let i in items) {
			if (typeof items[i] !== 'object') {
				continue;
			}

			items[i].addEventListener('click', (e) => {
				const hrefName = e.target.getAttribute('href').substr(1);

				if (!hrefName) {
					return;
				}

				documentObject.querySelector('#' + hrefName).scrollIntoView({
					behavior: 'smooth'
				});
			});
		}
	});
};

export const handleLoad = (windowObject) => {
	windowObject.addEventListener('load', () => { // The `load` event has been chosen intentionally as it is the only state when everything is loaded and the scroll will proceed correctly (it will slide to correct offset).
		if (windowObject.location.hash) {
			// First, we need to go to top immediately (hack to prevent jump to desired element).
			windowObject.scroll({top: 0, left: 0});

			// Then, scroll down to it smoothly.
			document.querySelector(windowObject.location.hash).scrollIntoView({
				behavior: 'smooth'
			});
		}
	});
};


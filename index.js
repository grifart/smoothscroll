import Velocity from 'velocity-animate';
// import smoothScroll from 'smoothscroll-polyfill';  In case of use, add `smoothscroll-polyfill` via `yarn add` first.

/**
 * As of version 62, Chrome started to support natively `behavior: smooth` in  `scrollIntoView()` method.
 * But it works strange - it moves the viewport just to the half of the target container.
 * Thus we have to force the polyfill to behave as intended.
 * Related: https://github.com/iamdustan/smoothscroll/issues/93
 */
// window.__forceSmoothScrollPolyfill__ = true;
// smoothScroll.polyfill();


export const handleInteraction = (windowObject, documentObject) => {
	if ((typeof document.querySelector === 'undefined') || (typeof document.querySelectorAll === 'undefined')) {
		return;
	}
	if (typeof document.addEventListener === 'undefined') {
		return;
	}

	documentObject.addEventListener('DOMContentLoaded', () => {
		const items = documentObject.querySelectorAll('a[href^="#"]');

		for (let i in items) {
			if (typeof items[i] !== 'object') {
				continue;
			}

			items[i].addEventListener('click', (e) => {
				if (typeof e.currentTarget.getAttribute === 'undefined') {
					return;
				}

				const hash = e.currentTarget.getAttribute('href');
				if (!hash) {
					return;
				}

				e.preventDefault();
				e.stopPropagation();

				scrollTo(hash, documentObject, windowObject);
			});
		}
	});
};

export const handleLoad = (windowObject, documentObject) => {
	if (typeof document.querySelector === 'undefined') {
		return;
	}
	if (typeof document.addEventListener === 'undefined') {
		return;
	}
	if (typeof windowObject.location === 'undefined') {
		return;
	}

	windowObject.addEventListener('load', () => { // The `load` event has been chosen intentionally as it is the only state when everything is loaded and the scroll will proceed correctly (it will slide to correct offset).
		if (windowObject.location.hash) {
			// First, we need to go to top immediately (hack to prevent jump to desired element).
			windowObject.scroll({top: 0, left: 0});

			// Then, scroll down to it smoothly.
			scrollTo(windowObject.location.hash, documentObject, windowObject);
		}
	});
};


const scrollTo = (hash, documentObject, windowObject) => {
	const element = documentObject.querySelector(hash);

	Velocity(element, 'scroll', {
		duration: 1200, // @todo: different depending on offset from page top?
		complete: () => {
			windowObject.location.hash = hash;
		}
	});

	/*
	 * @todo: Consider possibility of using Velocity or this native depending on offset from page top.
	 * Maybe the native one is better for shorter distances, Velocity is better for longer distances.
	 * Or maybe just work with the duration on Velocity would be better.
	 */
	// documentObject.querySelector('#' + hash).scrollIntoView({
	// 	behavior: 'smooth'
	// });
};
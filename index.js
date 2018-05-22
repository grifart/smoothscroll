import Velocity from 'velocity-animate';

export default function (options) {
	((windowObject, documentObject, options) => {

		/**
		 * This function scrolls smoothly to an element if there is a hash in the URL.
		 * E.g. you have `#example` in URL, then it scrolls to element with id `example`.
		 *
		 * Note:
		 * Because of UX, this behaviour is limited only when whole document is loaded in less than 500ms.
		 * Otherwise, it jumps directly to desired element without smooth scrolling, because too visible jumping through the page would appear.
		 */
		const handleLoad = () => {
			if (typeof document.querySelector === 'undefined') {
				return;
			}
			if (typeof document.addEventListener === 'undefined') {
				return;
			}
			if (typeof windowObject.location === 'undefined') {
				return;
			}

			// If no hash, we do not need to run scrolling.
			if (!windowObject.location.hash) {
				return;
			}

			// If performance is not present, the browser would not scroll smoothly otherwise I guess. So let's skip it completely, it's not worth fallbacking to Date() function.
			if (typeof performance === 'undefined') {
				return;
			}

			// Start timer.
			const start = performance.now();

			/*
			 * The `load` event has been chosen intentionally as it is the state when everything is ready -
			 * all styles are loaded and offsets are computed correctly - so the scroll will be computed correctly.
			 */
			windowObject.addEventListener('load', () => {
				// End timer.
				const end = performance.now();

				// If difference between start and stop is greater than 500ms, do nothing.
				if (end - start > 500) {
					return;
				}

				// First, we need to go to top immediately (hack to prevent jump to desired element).
				windowObject.scroll({top: 0, left: 0});

				// Then, scroll down to it smoothly.
				scrollTo(windowObject.location.hash, documentObject, windowObject);
			});
		};

		const handleInteraction = () => {
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


		// Registration of custom easing
		Velocity.Easings['ease-in-skip-out'] = easingWithSkip(windowObject);

		if (options !== undefined && typeof options === 'object' && options.interaction !== undefined && options.interaction === true) {
			handleInteraction();
		}

		if (options !== undefined && typeof options === 'object' && options.load !== undefined && options.load === true) {
			handleLoad();
		}
	})(window, document, options);
};

const scrollTo = (hash, documentObject, windowObject) => {
	const element = documentObject.querySelector(hash);

	Velocity(element, 'scroll', {
		duration: 1200, // @todo: different depending on offset from page top?
		easing: 'ease-in-skip-out',
		complete: () => {
			windowObject.location.hash = hash;
		}
	});
};

//Code for custom easing and helpers for custom easing

// e.g. (5,  5, 10,  500, 1000) => 500
// e.g. (5,  0, 10,  500, 1000) => 750
const mapIntervalLinear = (number, originalFrom, originalTo, newFrom, newTo) => {
	const oldDistance = originalTo - originalFrom;
	const newDistance = newTo - newFrom;

	// normalize value into interval 0 .. 1
	const normalized = (number - originalFrom) / oldDistance;
	// extend and move normalized value into new interval
	return (normalized * newDistance) + newFrom;
};

/**
 * Composes easings together, splits time into half.
 *
 * @param firstHalfEasingFn first half of easing
 * @param secondHalfEasingFn second half of easing
 * @return {function(*=, *=, *=)} the composed easing
 */
const compositeEasing = (firstHalfEasingFn, secondHalfEasingFn) => {

	// time: The call's completion percentage (decimal value).
	// opts (optional): The options object passed into the triggering Velocity call.
	// tweenDelta (optional): The difference between the animating property's ending value and its starting value.
	return (time, opts, tweenDelta) => {
		if(time < 0.5) {
			const normalizedTime = mapIntervalLinear(time, 0, 0.5, 0, 1); // map  0 - 0.5   =>   0 - 1
			return mapIntervalLinear(firstHalfEasingFn(normalizedTime, opts, tweenDelta), 0, 1, 0, 0.5); // map  1 - 0   =>   0 - 0.5

		} else {
			const normalizedTime = mapIntervalLinear(time, 0.5, 1, 0, 1); // map  0 - 0.5   =>   0 - 1
			return mapIntervalLinear(secondHalfEasingFn(normalizedTime, opts, tweenDelta), 0, 1, 0.5, 1); // map  1 - 0   =>   0 - 0.5
		}
	}
};

const computeHowMuchToSkip = (windowObject, tweenDelta) => {
	const howManyScreens = Math.abs(tweenDelta) / windowObject.innerHeight;

	// 0 .. 1 (percents)
	let howMuchToSkip = 0;

	// by testing in browser we have found following values as smooth:
	// howManyScreens .. howMuchToSkip
	// 1 .. 0 %
	// 2 .. 0 %
	// 3 .. 30 %
	// 8 .. 60 %
	// 30 .. 85 %
	// 60 .. 90 %
	// 100 .. 90 %
	if (howManyScreens <= 2) {
		howMuchToSkip = 0;
	} else if (howManyScreens <= 4) {
		howMuchToSkip = mapIntervalLinear(howManyScreens, 2, 4, 0, 0.3);
	} else if (howManyScreens <= 8) {
		howMuchToSkip = mapIntervalLinear(howManyScreens, 4, 8, 0.3, 0.6);
	} else if (howManyScreens <= 30) {
		howMuchToSkip = mapIntervalLinear(howManyScreens, 8, 30, 0.6, 0.85);
	} else if (howManyScreens <= 60) {
		howMuchToSkip = mapIntervalLinear(howManyScreens, 30, 60, 0.85, 0.9);
	} else {
		howMuchToSkip = 0.9;
	}

	return howMuchToSkip;
};

const easingWithSkip = (windowObject) => {
	return compositeEasing(
		(time, opts, tweenDelta) => mapIntervalLinear(
			Velocity.Easings["ease-in"](time, opts, tweenDelta),
			0, 1, // from interval
			0, 1 - computeHowMuchToSkip(windowObject, tweenDelta) // to interval
		),
		(time, opts, tweenDelta) => mapIntervalLinear(
			Velocity.Easings["ease-out"](time, opts, tweenDelta),
			0, 1, // from interval
			computeHowMuchToSkip(windowObject, tweenDelta), 1 // to interval
		)
	);
};

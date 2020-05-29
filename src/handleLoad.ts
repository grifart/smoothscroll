import {scrollTo} from './scrollTo';

/**
 * This function scrolls smoothly to an element if there is a hash in the URL.
 * E.g. you have `#example` in URL, then it scrolls to element with id `example`.
 *
 * Note:
 * Because of UX, this behaviour is limited only when whole document is loaded in less than 500ms.
 * Otherwise, it jumps directly to desired element without smooth scrolling, because too visible jumping through the page would appear.
 */
export function handleLoad(): void
{
	// If no hash, we do not need to run scrolling.
	if ( ! window.location.hash) {
		return;
	}

	// If performance is not present, the browser would not scroll smoothly otherwise I guess. So let's skip it completely, it's not worth fallbacking to Date() function.
	if (performance === undefined) {
		return;
	}

	const start = performance.now();

	/*
	 * The `load` event has been chosen intentionally as it is the state when everything is ready -
	 * all styles are loaded and offsets are computed correctly - so the scroll will be computed correctly.
	 */
	window.addEventListener('load', () => {
		const end = performance.now();

		// If difference between start and stop is greater than 500ms, do nothing.
		if (end - start > 500) {
			return;
		}

		// First, we need to go to top immediately (hack to prevent jump to desired element).
		window.scroll({top: 0, left: 0});

		// Then, scroll down to it smoothly.
		scrollTo(window.location.hash);
	});
}

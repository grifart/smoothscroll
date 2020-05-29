import {scrollTo} from './scrollTo';
import {HashTarget} from './HashTarget';
import {assert} from './assert';

/**
 * Scrolls smoothly to an element if there is a hash in the URL.
 * E.g. you have `#example` in URL, then it scrolls to element with id `example`.
 *
 * Note:
 * Because of UX, this behaviour is limited only when whole document is loaded in less than 500ms.
 * Otherwise, it jumps directly to desired element without smooth scrolling, because too visible jumping through the page would appear.
 */
export function initializeOnLoadScroll(): void
{
	let hashTarget: HashTarget|null = null;
	const start = performance.now();

	document.addEventListener('DOMContentLoaded', () => {
		hashTarget = HashTarget.fromString(window.location.hash, document);
	});

	/**
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
		assert(hashTarget !== null, 'Hash target should be set on DOM loaded.');
		scrollTo(hashTarget);
	});
}

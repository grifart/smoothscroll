import {scrollToTarget} from '../../scrollers/scrollToTarget';
import {HashTarget} from '../../HashTarget';
import {assert} from '../../assert';

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
	const hash = window.location.hash;
	if (hash === '' || hash === '#') {
		return;
	}

	let hashTarget: HashTarget|null = null;
	const start = performance.now();

	document.addEventListener('DOMContentLoaded', () => {
		try {
			hashTarget = HashTarget.fromString(hash, document);
		} catch (e) {} // when URL contains hash which has no corresponding DOM element, just ignore it
	});

	/**
	 * The `load` event has been chosen intentionally as it is the state when everything is ready -
	 * all styles are loaded and offsets are computed correctly - so the scroll will be computed correctly.
	 */
	window.addEventListener('load', () => {
		if (hashTarget === null) { // if target does not exist
			return;
		}

		const end = performance.now();

		// If difference between start and stop is greater than 500ms, do nothing.
		if (end - start > 500) {
			return;
		}

		// First, we need to go to top immediately (hack to prevent jump to desired element).
		window.scroll({top: 0, left: 0});

		// Then, scroll down to it smoothly.
		scrollToTarget(hashTarget);
	});
}

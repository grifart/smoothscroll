import {scrollTo} from './scrollTo';
import {assert} from './assert';
import {HashTarget} from './HashTarget';

export function initializeOnLinkClickScroll(): void
{
	document.addEventListener('DOMContentLoaded', () =>
		document.querySelectorAll('a[href^="#"]').forEach((item) =>
			item.addEventListener('click', (event) => {
				const element = event.currentTarget as HTMLAnchorElement;
				assert(element !== null);

				event.preventDefault();
				scrollTo(HashTarget.fromString(element.hash, document));
			})));
}

import {scrollToTarget} from '../../scrollers/scrollToTarget';
import {assert} from '../../assert';
import {Hash} from '../../Hash';

export function initializeOnLinkClickScroll(): void
{
	document.addEventListener('DOMContentLoaded', () =>
		document.querySelectorAll('a[href^="#"]').forEach((item) =>
			item.addEventListener('click', (event) => {
				const element = event.currentTarget as HTMLAnchorElement;
				assert(element !== null);

				if (element.hash === '' || element.hash === '#') {
					return;
				}

				event.preventDefault();
				scrollToTarget(Hash.fromString(element.hash));
			})));
}

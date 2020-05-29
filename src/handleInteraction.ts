import {scrollTo} from './scrollTo';

export function handleInteraction(): void
{
	document.addEventListener('DOMContentLoaded', () =>
		document.querySelectorAll('a[href^="#"]').forEach((item) =>
			item.addEventListener('click', (event) => {
				const element = event.currentTarget as HTMLAnchorElement;
				if ( ! element.hash) {
					return;
				}

				event.preventDefault();
				scrollTo(element.hash);
			})));
}

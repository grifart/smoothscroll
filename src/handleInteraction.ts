import {scrollTo} from './scrollTo';

export function handleInteraction(): void
{
	document.addEventListener('DOMContentLoaded', () => {
		const items = document.querySelectorAll('a[href^="#"]');

		for (const i in items) {
			if ( ! (items as object).hasOwnProperty(i)) {
				continue;
			}

			items[i].addEventListener('click', (e) => {
				const element = e.currentTarget as HTMLAnchorElement;
				if ( ! element.hash) {
					return;
				}

				e.preventDefault();
				scrollTo(element.hash);
			});
		}
	});
}

import {scrollTo} from './scrollTo';

export function handleInteraction(): void
{
	document.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('a[href^="#"]').forEach((item) => {
			item.addEventListener('click', (e) => {
				const element = e.currentTarget as HTMLAnchorElement;
				if ( ! element.hash) {
					return;
				}

				e.preventDefault();
				scrollTo(element.hash);
			});
		});
	});
}

import * as Velocity from 'velocity-animate';

export function scrollTo(hash: string): void
{
	const element = document.getElementById(hash.substring(1));
	if (element === null) {
		return;
	}

	Velocity.animate(element, 'scroll', {
		duration: 1200, // todo: different depending on offset from page top?
		easing: 'ease-in-skip-out',
		complete: () => window.location.hash = hash,
	});
}

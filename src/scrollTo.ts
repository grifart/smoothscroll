import * as Velocity from 'velocity-animate';
import {HashTarget} from './HashTarget';

export function scrollTo(hash: HashTarget): void
{
	Velocity.animate(hash.getElement(), 'scroll', {
		duration: 1200, // todo: different depending on offset from page top?
		easing: 'ease-in-skip-out',
		complete: () => window.location.hash = hash.getHash(),
	});
}

import * as Velocity from 'velocity-animate';
import {HashTarget} from './HashTarget';

export function scrollToTarget(hashTarget: HashTarget): void
{
	Velocity.animate(hashTarget.getElement(), 'scroll', {
		duration: 1200, // todo: different depending on offset from page top?
		easing: 'ease-in-skip-out',
		complete: () => window.location.hash = hashTarget.getHash(),
	});
}

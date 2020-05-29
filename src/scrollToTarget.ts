import * as Velocity from 'velocity-animate';
import {HashTarget} from './HashTarget';
import {EASE_IN_SKIP_OUT_EASING} from './setupVelocity';

export function scrollToTarget(hashTarget: HashTarget): void
{
	Velocity.animate(hashTarget.getElement(), 'scroll', {
		duration: 1200, // todo: different depending on offset from page top?
		easing: EASE_IN_SKIP_OUT_EASING,
		complete: () => window.location.hash = hashTarget.getHash(),
	});
}

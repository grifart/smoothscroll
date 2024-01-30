import * as Velocity from 'velocity-animate';
import {EASE_IN_SKIP_OUT_EASING} from '../easing/bindEasingToVelocity';
import {nativeScrollBehavior} from './NativeScrollBehavior';

export function scrollToElement(element: HTMLElement, onScrollFinishedCallback?: () => void): void
{
	nativeScrollBehavior.remove();
	Velocity.animate(element, 'scroll', {
		duration: 1200, // todo: different depending on offset from page top?
		easing: EASE_IN_SKIP_OUT_EASING,
		complete: () => {
			nativeScrollBehavior.restore();
			onScrollFinishedCallback !== undefined && onScrollFinishedCallback();
		},
	});
}

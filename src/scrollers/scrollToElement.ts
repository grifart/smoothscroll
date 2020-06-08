import * as Velocity from 'velocity-animate';
import {EASE_IN_SKIP_OUT_EASING} from '../easing/setupVelocity';

export function scrollToElement(element: HTMLElement, onScrollFinishedCallback?: () => void): void
{
	Velocity.animate(element, 'scroll', {
		duration: 1200, // todo: different depending on offset from page top?
		easing: EASE_IN_SKIP_OUT_EASING,
		complete: () => onScrollFinishedCallback !== undefined && onScrollFinishedCallback(),
	});
}

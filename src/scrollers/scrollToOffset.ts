import * as Velocity from 'velocity-animate';
import {EASE_IN_SKIP_OUT_EASING} from '../easing/bindEasingToVelocity';
import {nativeScrollBehavior} from "./NativeScrollBehavior";

export function scrollToOffset(
	topOffset: number,
	onScrollFinishedCallback?: () => void,
): void
{
	nativeScrollBehavior.remove();
	/**
	 * Setting `<html>` as the element to scroll to with offset simulates `window.scrollTo()` behavior.
	 * See last paragraph at http://velocityjs.org/#scroll
	 */
	Velocity.animate(document.documentElement, 'scroll', {
		duration: 1200, // todo: different depending on offset from page top?
		offset: topOffset,
		easing: EASE_IN_SKIP_OUT_EASING,
		complete: () => {
			nativeScrollBehavior.restore();
			onScrollFinishedCallback !== undefined && onScrollFinishedCallback();
		},
	});
}

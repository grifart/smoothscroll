import * as Velocity from 'velocity-animate';
import setupVelocity from './easing/setupVelocity';
import {initializeOnLoadScroll} from './handlers/loadScroll/initializeOnLoadScroll';
import {initializeOnLinkClickScroll} from './handlers/linkClickScroll/initializeOnLinkClickScroll';
import {scrollToElement} from './scrollers/scrollToElement';
import {scrollToOffset} from './scrollers/scrollToOffset';
import {scrollToTarget} from './scrollers/scrollToTarget';
import {HashTarget} from './HashTarget';

export interface SmoothScrollOptions {
	readonly scrollOnLoad?: boolean;
	readonly scrollOnLinkClick?: boolean;
}

/**
 * Wrapped into class for intuitive API use – `SmoothScroll.something()`
 */
class SmoothScroll
{
	public static enable(options?: SmoothScrollOptions): void
	{
		setupVelocity(Velocity);

		if ( ! (options && options.scrollOnLoad === false)) {
			initializeOnLoadScroll();
		}

		if ( ! (options && options.scrollOnLinkClick === false)) {
			initializeOnLinkClickScroll();
		}
	}

	public static scrollToElement(element: HTMLElement, onScrollFinishedCallback?: () => void): void
	{
		scrollToElement(element, onScrollFinishedCallback);
	}

	public static scrollToOffset(topOffset: number, onScrollFinishedCallback?: () => void): void
	{
		scrollToOffset(topOffset, onScrollFinishedCallback);
	}

	public static scrollToTarget(target: HashTarget, onScrollFinishedCallback?: () => void): void
	{
		scrollToTarget(target, onScrollFinishedCallback);
	}
}

export default SmoothScroll;

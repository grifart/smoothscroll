import * as Velocity from 'velocity-animate';
import setupVelocity from './setupVelocity';
import {initializeOnLoadScroll} from './initializeOnLoadScroll';
import {initializeOnLinkClickScroll} from './initializeOnLinkClickScroll';

export interface SmoothScrollOptions {
	readonly scrollOnLoad?: boolean;
	readonly scrollOnLinkClick?: boolean;
}

/**
 * Wrapped into class for intuitive API use – `SmoothScroll.enable()`
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
}

export default SmoothScroll;

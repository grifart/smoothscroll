import * as Velocity from 'velocity-animate';
import setupVelocity from './setupVelocity';
import {initializeOnLoadScroll} from './initializeOnLoadScroll';
import {initializeOnLinkClickScroll} from './initializeOnLinkClickScroll';

export interface SmoothScrollOptions {
	readonly load?: boolean;
	readonly interaction?: boolean;
}

function SmoothScroll(options?: SmoothScrollOptions): void
{
	setupVelocity(Velocity);

	if ( ! (options && options.load === false)) {
		initializeOnLoadScroll();
	}

	if ( ! (options && options.interaction === false)) {
		initializeOnLinkClickScroll();
	}
}

export default SmoothScroll;

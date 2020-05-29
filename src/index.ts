import * as Velocity from 'velocity-animate';
import setupVelocity from './setupVelocity';
import {handleLoad} from './handleLoad';
import {handleInteraction} from './handleInteraction';

export interface SmoothScrollOptions {
	readonly load?: boolean;
	readonly interaction?: boolean;
}

function SmoothScroll(options?: SmoothScrollOptions): void
{
	setupVelocity(Velocity);

	if ( ! (options && options.load === false)) {
		handleLoad();
	}

	if ( ! (options && options.interaction === false)) {
		handleInteraction();
	}
}

export default SmoothScroll;

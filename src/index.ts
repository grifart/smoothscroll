import * as Velocity from 'velocity-animate';
import bindEasingToVelocity from './easing/bindEasingToVelocity';
import {initializeOnLoadScroll} from './handlers/loadScroll/initializeOnLoadScroll';
import {initializeOnLinkClickScroll} from './handlers/linkClickScroll/initializeOnLinkClickScroll';
import {scrollToElement} from './scrollers/scrollToElement';
import {scrollToOffset} from './scrollers/scrollToOffset';
import {scrollToTarget} from './scrollers/scrollToTarget';
import {HashTarget} from './HashTarget';


// bind automatically on library import
bindEasingToVelocity(Velocity);


function handleGlobalScrollingBehavior(): void
{
	handleOnLoadScroll();
	handleOnLinkClickScroll();
}

function handleOnLoadScroll(): void
{
	initializeOnLoadScroll();
}

function handleOnLinkClickScroll(): void
{
	initializeOnLinkClickScroll();
}

export {
	HashTarget,
	handleGlobalScrollingBehavior,
	handleOnLoadScroll,
	handleOnLinkClickScroll,
	scrollToElement,
	scrollToOffset,
	scrollToTarget,
};

import * as Velocity from 'velocity-animate';
import bindEasingToVelocity from './easing/bindEasingToVelocity';
import {initializeOnLoadScroll} from './handlers/loadScroll/initializeOnLoadScroll';
import {initializeOnLinkClickScroll} from './handlers/linkClickScroll/initializeOnLinkClickScroll';
import {scrollToElement} from './scrollers/scrollToElement';
import {scrollToOffset} from './scrollers/scrollToOffset';
import {scrollToTarget} from './scrollers/scrollToTarget';
import {Hash} from './Hash';


// bind automatically on library import
bindEasingToVelocity(Velocity);


function handleOnLoadScroll(): void
{
	initializeOnLoadScroll();
}

function handleOnLinkClickScroll(): void
{
	initializeOnLinkClickScroll();
}

export {
	Hash,
	handleOnLoadScroll,
	handleOnLinkClickScroll,
	scrollToElement,
	scrollToOffset,
	scrollToTarget,
};

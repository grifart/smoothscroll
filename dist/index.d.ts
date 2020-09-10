import { scrollToElement } from './scrollers/scrollToElement';
import { scrollToOffset } from './scrollers/scrollToOffset';
import { scrollToTarget } from './scrollers/scrollToTarget';
import { HashTarget } from './HashTarget';
declare function handleGlobalScrollingBehavior(): void;
declare function handleOnLoadScroll(): void;
declare function handleOnLinkClickScroll(): void;
export { HashTarget, handleGlobalScrollingBehavior, handleOnLoadScroll, handleOnLinkClickScroll, scrollToElement, scrollToOffset, scrollToTarget, };

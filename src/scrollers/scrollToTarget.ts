import {HashTarget} from '../HashTarget';
import {scrollToElement} from './scrollToElement';
import {assert} from '../assert';

export function scrollToTarget(hashTarget: HashTarget|string, onScrollFinishedCallback?: () => void): void
{
	if (typeof hashTarget === 'string') {
		hashTarget = HashTarget.fromString(hashTarget);
	}

	scrollToElement(
		hashTarget.getRefElement(document),
		() => {
			assert(hashTarget instanceof HashTarget);
			window.location.hash = hashTarget.getHash();
			onScrollFinishedCallback !== undefined && onScrollFinishedCallback();
		},
	);
}

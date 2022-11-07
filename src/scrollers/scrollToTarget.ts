import {Hash} from '../Hash';
import {scrollToElement} from './scrollToElement';
import {assert} from '../assert';

export function scrollToTarget(targetHash: Hash|string, onScrollFinishedCallback?: () => void): void
{
	if (typeof targetHash === 'string') {
		targetHash = Hash.fromString(targetHash);
	}

	scrollToElement(
		targetHash.findTargetElementIn(document),
		() => {
			assert(targetHash instanceof Hash);
			window.location.hash = targetHash.getValue();
			onScrollFinishedCallback !== undefined && onScrollFinishedCallback();
		},
	);
}

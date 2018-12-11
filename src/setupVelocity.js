// e.g. (5, 5, 10, 500, 1000) => 500
// e.g. (5, 0, 10, 500, 1000) => 750
const mapIntervalLinear = (number, originalFrom, originalTo, newFrom, newTo) => {
	const oldDistance = originalTo - originalFrom;
	const newDistance = newTo - newFrom;

	// normalize value into interval 0 .. 1
	const normalized = (number - originalFrom) / oldDistance;
	// extend and move normalized value into new interval
	return (normalized * newDistance) + newFrom;
};

/**
 * Composes easings together, splits time into half.
 *
 * @param firstHalfEasingFn first half of easing
 * @param secondHalfEasingFn second half of easing
 * @return {function(*=, *=, *=)} the composed easing
 */
const composeEasing = (firstHalfEasingFn, secondHalfEasingFn) => {

	// time: The call's completion percentage (decimal value).
	// opts (optional): The options object passed into the triggering Velocity call.
	// tweenDelta (optional): The difference between the animating property's ending value and its starting value.
	return (time, opts, tweenDelta) => {
		if (time < 0.5) {
			const normalizedTime = mapIntervalLinear(time, 0, 0.5, 0, 1); // map  0 - 0.5   =>   0 - 1
			return mapIntervalLinear(firstHalfEasingFn(normalizedTime, opts, tweenDelta), 0, 1, 0, 0.5); // map  1 - 0   =>   0 - 0.5

		} else {
			const normalizedTime = mapIntervalLinear(time, 0.5, 1, 0, 1); // map  0 - 0.5   =>   0 - 1
			return mapIntervalLinear(secondHalfEasingFn(normalizedTime, opts, tweenDelta), 0, 1, 0.5, 1); // map  1 - 0   =>   0 - 0.5
		}
	}
};

const computeHowMuchToSkip = (tweenDelta) => {
	const howManyScreens = Math.abs(tweenDelta) / window.innerHeight;

	// 0 .. 1 (percents)
	let howMuchToSkip = 0;

	// by testing in browser we have found following values as smooth:
	// howManyScreens .. howMuchToSkip
	// 1 .. 0%
	// 2 .. 0%
	// 3 .. 30%
	// 8 .. 60%
	// 30 .. 85%
	// 60 .. 90%
	// 100 .. 90%
	if (howManyScreens <= 2) {
		howMuchToSkip = 0;
	} else if (howManyScreens <= 4) { // 2 - 4 screens; skip 0% - 30% of content
		howMuchToSkip = mapIntervalLinear(howManyScreens, 2, 4, 0, 0.3);
	} else if (howManyScreens <= 8) { // 4 - 8 screens; skip 30% - 60% of content
		howMuchToSkip = mapIntervalLinear(howManyScreens, 4, 8, 0.3, 0.6);
	} else if (howManyScreens <= 30) { // 8 - 30 screens; skip 60% - 85% of content
		howMuchToSkip = mapIntervalLinear(howManyScreens, 8, 30, 0.6, 0.85);
	} else if (howManyScreens <= 60) { // 30 - 60 screens; skip 85% - 30% of content
		howMuchToSkip = mapIntervalLinear(howManyScreens, 30, 60, 0.85, 0.9);
	} else { // > 60 screens; skip 90% of content
		howMuchToSkip = 0.9;
	}

	return howMuchToSkip;
};

const setupVelocity = (velocity) => {
	velocity.Easings['ease-in-skip-out'] = composeEasing(
		(time, opts, tweenDelta) => mapIntervalLinear(
			velocity.Easings['ease-in'](time, opts, tweenDelta),
			0, 1, // from interval
			0, 1 - computeHowMuchToSkip(tweenDelta), // to interval
		),
		(time, opts, tweenDelta) => mapIntervalLinear(
			velocity.Easings['ease-out'](time, opts, tweenDelta),
			0, 1, // from interval
			computeHowMuchToSkip(tweenDelta), 1, // to interval
		),
	);
};

export default setupVelocity;

import * as Velocity from 'velocity-animate';
import { animate } from 'velocity-animate';

var EASE_IN_SKIP_OUT_EASING = 'ease-in-skip-out'; // e.g. (5, 5, 10, 500, 1000) => 500
// e.g. (5, 0, 10, 500, 1000) => 750

var mapIntervalLinear = function mapIntervalLinear(number, originalFrom, originalTo, newFrom, newTo) {
  var oldDistance = originalTo - originalFrom;
  var newDistance = newTo - newFrom; // normalize value into interval 0 .. 1

  var normalized = (number - originalFrom) / oldDistance; // extend and move normalized value into new interval

  return normalized * newDistance + newFrom;
};
/**
 * Composes easings together, splits time into half.
 *
 * @param firstHalfEasingFn first half of easing
 * @param secondHalfEasingFn second half of easing
 * @return {function(*=, *=, *=)} the composed easing
 */


var composeEasing = function composeEasing(firstHalfEasingFn, secondHalfEasingFn) {
  // time: The call's completion percentage (decimal value).
  // opts (optional): The options object passed into the triggering Velocity call.
  // tweenDelta (optional): The difference between the animating property's ending value and its starting value.
  return function (time, opts, tweenDelta) {
    if (time < 0.5) {
      var normalizedTime = mapIntervalLinear(time, 0, 0.5, 0, 1); // map  0 - 0.5   =>   0 - 1

      return mapIntervalLinear(firstHalfEasingFn(normalizedTime, opts, tweenDelta), 0, 1, 0, 0.5); // map  1 - 0   =>   0 - 0.5
    } else {
      var _normalizedTime = mapIntervalLinear(time, 0.5, 1, 0, 1); // map  0 - 0.5   =>   0 - 1


      return mapIntervalLinear(secondHalfEasingFn(_normalizedTime, opts, tweenDelta), 0, 1, 0.5, 1); // map  1 - 0   =>   0 - 0.5
    }
  };
};

var computeHowMuchToSkip = function computeHowMuchToSkip(tweenDelta) {
  var howManyScreens = Math.abs(tweenDelta) / window.innerHeight; // 0 .. 1 (percents)

  var howMuchToSkip = 0; // by testing in browser we have found following values as smooth:
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
  } else if (howManyScreens <= 4) {
    // 2 - 4 screens; skip 0% - 30% of content
    howMuchToSkip = mapIntervalLinear(howManyScreens, 2, 4, 0, 0.3);
  } else if (howManyScreens <= 8) {
    // 4 - 8 screens; skip 30% - 60% of content
    howMuchToSkip = mapIntervalLinear(howManyScreens, 4, 8, 0.3, 0.6);
  } else if (howManyScreens <= 30) {
    // 8 - 30 screens; skip 60% - 85% of content
    howMuchToSkip = mapIntervalLinear(howManyScreens, 8, 30, 0.6, 0.85);
  } else if (howManyScreens <= 60) {
    // 30 - 60 screens; skip 85% - 30% of content
    howMuchToSkip = mapIntervalLinear(howManyScreens, 30, 60, 0.85, 0.9);
  } else {
    // > 60 screens; skip 90% of content
    howMuchToSkip = 0.9;
  }

  return howMuchToSkip;
};

var bindEasingToVelocity = function bindEasingToVelocity(velocity) {
  velocity.Easings[EASE_IN_SKIP_OUT_EASING] = composeEasing(function (time, opts, tweenDelta) {
    return mapIntervalLinear(velocity.Easings['ease-in'](time, opts, tweenDelta), 0, 1, // from interval
    0, 1 - computeHowMuchToSkip(tweenDelta) // to interval
    );
  }, function (time, opts, tweenDelta) {
    return mapIntervalLinear(velocity.Easings['ease-out'](time, opts, tweenDelta), 0, 1, // from interval
    computeHowMuchToSkip(tweenDelta), 1 // to interval
    );
  });
};

var HashTarget = (function () {
    function HashTarget(value, targetElement) {
        this.value = value;
        this.targetElement = targetElement;
    }
    HashTarget.fromString = function (value, document) {
        if (value === '' || value === '#') {
            throw new Error('Hash does not contain any fragment.');
        }
        var targetElementId = value.substring(1);
        var targetElement = document.getElementById(targetElementId);
        if (targetElement === null) {
            throw new Error("No referenced element with ID " + targetElementId + " exists.");
        }
        return new this(value, targetElement);
    };
    HashTarget.prototype.getHash = function () {
        return this.value;
    };
    HashTarget.prototype.getElement = function () {
        return this.targetElement;
    };
    return HashTarget;
}());

function scrollToElement(element, onScrollFinishedCallback) {
    animate(element, 'scroll', {
        duration: 1200,
        easing: EASE_IN_SKIP_OUT_EASING,
        complete: function () { return onScrollFinishedCallback !== undefined && onScrollFinishedCallback(); },
    });
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var AssertionError = (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AssertionError;
}(Error));
function assert(condition, message) {
    if (!condition) {
        throw new AssertionError(message);
    }
}

function scrollToTarget(hashTarget, onScrollFinishedCallback) {
    if (typeof hashTarget === 'string') {
        hashTarget = HashTarget.fromString(hashTarget, document);
    }
    scrollToElement(hashTarget.getElement(), function () {
        assert(hashTarget instanceof HashTarget);
        window.location.hash = hashTarget.getHash();
        onScrollFinishedCallback !== undefined && onScrollFinishedCallback();
    });
}

function initializeOnLoadScroll() {
    var hash = window.location.hash;
    if (hash === '' || hash === '#') {
        return;
    }
    var hashTarget = null;
    var start = performance.now();
    document.addEventListener('DOMContentLoaded', function () {
        hashTarget = HashTarget.fromString(hash, document);
    });
    window.addEventListener('load', function () {
        var end = performance.now();
        if (end - start > 500) {
            return;
        }
        window.scroll({ top: 0, left: 0 });
        assert(hashTarget !== null, 'Hash target should be set on DOM loaded.');
        scrollToTarget(hashTarget);
    });
}

function initializeOnLinkClickScroll() {
    document.addEventListener('DOMContentLoaded', function () {
        return document.querySelectorAll('a[href^="#"]').forEach(function (item) {
            return item.addEventListener('click', function (event) {
                var element = event.currentTarget;
                assert(element !== null);
                if (element.hash === '' || element.hash === '#') {
                    return;
                }
                event.preventDefault();
                scrollToTarget(HashTarget.fromString(element.hash, document));
            });
        });
    });
}

function scrollToOffset(topOffset, onScrollFinishedCallback) {
    animate(document.documentElement, 'scroll', {
        duration: 1200,
        offset: topOffset,
        easing: EASE_IN_SKIP_OUT_EASING,
        complete: onScrollFinishedCallback,
    });
}

bindEasingToVelocity(Velocity);
function handleGlobalScrollingBehavior() {
    handleOnLoadScroll();
    handleOnLinkClickScroll();
}
function handleOnLoadScroll() {
    initializeOnLoadScroll();
}
function handleOnLinkClickScroll() {
    initializeOnLinkClickScroll();
}

export { HashTarget, handleGlobalScrollingBehavior, handleOnLoadScroll, handleOnLinkClickScroll, scrollToElement, scrollToOffset, scrollToTarget };

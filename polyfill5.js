// ECMAScript5 polyfill
// inspired by this video: "D. Crockford: ECMAScript 5 - The New Parts"
// it's not well tested yet

(function()
{
	"use strict";

	/**
	 * Object.keys
	 * Returns an array of a given object's own enumerable properties, in the same order as that provided by a for-in loop
	 * (the difference being that a for-in loop enumerates properties in the prototype chain as well)
	 * @link https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
	 * appending "keys" method to Object instead of Object .prototype is intentional (trying to avoid most of collisions)
	 */
	if (! Object.hasOwnProperty('keys'))
	{
		Object.keys = function (object)
		{
			var key,
				hasProp = Object.prototype.hasOwnProperty,
				result = [];

			for (key in object)
			{
				if (hasProp.call(object, key)) {
					result.push(key);
				}
			}
			return result;
		}
	}

	/**
	 * Function.bind
	 * Creates a new function that, when called, has its this keyword set to the provided value,
	 * with a given sequence of arguments preceding any provided when the new function was called
	 * @link https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
	 */
	if (! Function.prototype.hasOwnProperty('bind'))
	{
		Function.prototype.bind = function (thisArg)
		{
			var slice = Array.prototype.slice,
				func = this,
				args = slice.call(arguments, 1);

			return function () {
				return func.apply(thisArg, args.concat(slice.call(arguments, 0)));
			}
		};
	}

	/**
	 * String.trim
	 * Removes whitespaces from both ends of the string
	 * @link https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim
	 */
	if (! String.prototype.hasOwnProperty('trim'))
	{
		String.prototype.trim = (function (re) {
			return function () {
				return this.replace(re, "$1");
			}
		}(/^\s*(\S*(\s+\S+)*)\s*$/));
	}

	/**
	 * Array methods
	 */
	/**
	 * Array.isArray
	 * Returns true if an object is an array, false if it is not
	 * @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	 */
	if (! Array.hasOwnProperty('isArray'))
	{
		Array.isArray = function (object)
		{
			return Object.prototype.toString.call(object) === '[object Array]';
		}
	}
	/**
	 * Array.every
	 * Tests whether all elements in the array pass the test implemented by the provided function.
	 * @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
	 */
	if (! Array.prototype.hasOwnProperty('every'))
	{
		Array.prototype.every = function (fn, thisArg)
		{
			var i,
				len = this.length;

			for (i = 0; i < len; i+= 1)
			{
				if (this.hasOwnProperty(i) && ! fn.call(thisArg, this[i], i, this)) {
					return false;
				}
			}
			return true;
		};
	}
	/**
	 * Array.filter
	 * Creates a new array with all elements that pass the test implemented by the provided function
	 * @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
	 */
	if (! Array.prototype.hasOwnProperty('filter'))
	{
		Array.prototype.filter = function (fn, thisArg)
		{
			var i,
				len = this.length,
				result = [],
				value;

			for (i = 0; i < len; i += 1)
			{
				if (this.hasOwnProperty(i))
				{
					value = this[i];
					if (fn.call(thisArg, value, i, this)) {
						result.push(value);
					}
				}
			}
			return result;
		};
	}
	/**
	 * Array.forEach
	 * Executes a provided function once per array element
	 * @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
	 */
	if (! Array.prototype.hasOwnProperty('forEach'))
	{
		Array.prototype.forEach = function (fn, thisArg)
		{
			var i,
				len = this.length;

			for (i = 0; i < len; i += 1)
			{
				if (this.hasOwnProperty(i)) {
					fn.call(thisArg, this[i], i, this);
				}
			}
		};
	}
	/**
	 * Array.indexOf
	 * Returns the first index at which a given element can be found in the array, or -1 if it is not present
	 * @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	 */
	if (! Array.prototype.hasOwnProperty('indexOf'))
	{
		Array.prototype.indexOf = function (value, fromPosition)
		{
			var i = fromPosition || 0,
				len = this.length;

			while (i < len)
			{
				if (this.hasOwnProperty(i) && this[i] === value) {
					return i;
				}
				i += 1;
			}
			return -1;
		};
	}
	/**
	 * Array.lastIndexOf
	 * Returns the last index at which a given element can be found in the array, or -1 if it is not present.
	 * The array is searched backwards, starting at fromIndex
	 * @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
	 */
	if (! Array.prototype.hasOwnProperty('lastIndexOf'))
	{
		Array.prototype.lastIndexOf = function (value, fromPosition)
		{
			var i = fromPosition;
			if (typeof i !== 'number') {
				i = this.length - 1;
			}

			while (i >= 0)
			{
				if (this.hasOwnProperty(i) && this[i] === value) {
					return i;
				}
				i -= 1;
			}
			return -1;
		};
	}
	/**
	 * Array.map
	 * Creates a new array with the results of calling a provided function on every element in this array
	 * @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
	 */
	if (! Array.prototype.hasOwnProperty('map'))
	{
		Array.prototype.map = function (fn, thisArg)
		{
			var i,
				len = this.length,
				result = [];

			for (i = 0; i < len; i += 1)
			{
				if (this.hasOwnProperty(i)) {
					result[i] = fn.call(thisArg, this[i], i, this);
				}
			}
			return result;
		};
	}
	/**
	 * Array.reduce
	 * Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value
	 * @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Reduce
	 */
	if (! Array.prototype.hasOwnProperty('reduce'))
	{
		Array.prototype.reduce = function (fn, initialValue)
		{
			var i,
				len = this.length;

			for (i = 0; i < len; i += 1)
			{
				if (this.hasOwnProperty(i)) {
					initialValue = fn.call(undefined, initialValue, this[i], i, this);
				}
			}
			return initialValue;
		};
	}
	/**
	 * Array.reduceRight
	 * Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value
	 * @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/ReduceRight
	 */
	if (! Array.prototype.hasOwnProperty('reduceRight'))
	{
		Array.prototype.reduceRight = function (fn, initialValue)
		{
			var i = this.length - 1;

			while (i >= 0)
			{
				if (this.hasOwnProperty(i)) {
					initialValue = fn.call(undefined, initialValue, this[i], i, this);
				}
				i -= 1;
			}
			return initialValue;
		};
	}
	/**
	 * Array.some
	 * Tests whether some element in the array passes the test implemented by the provided function
	 * @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
	 */
	if (! Array.prototype.hasOwnProperty('some'))
	{
		Array.prototype.some = function (fn, thisArg)
		{
			var i,
				len = this.length;

			for (i = 0; i < len; i += 1)
			{
				if (this.hasOwnProperty(i) && fn.call(thisArg, this[i], i, this)) {
					return true;
				}
			}
			return false;
		};
	}

	/**
	 * Date methods
	 */
	/**
	 * Date.now()
	 * Returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC
	 * @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/now
	 */
	if (! Date.hasOwnProperty('now'))
	{
		Date.now = function ()
		{
			return (new Date).getTime();
		}
	}
	/**
	 * Date.toISOString
	 * Format Date as follows: YYYY-MM-DDTHH:mm:ss.sssZ
	 * @link https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toISOString
	 */
	if (! Date.prototype.hasOwnProperty('toISOString'))
	{
		Date.prototype.toISOString = function ()
		{
			function fixZero(n)
			{
				return n < 10 ? ('0' + n) : n;
			}

			return this.getUTCFullYear() + '-' +
				fixZero(this.getUTCMonth() + 1) + '-' +
				fixZero(this.getUTCDate()) + 'T' +
				fixZero(this.getUTCHours()) + ':' +
				fixZero(this.getUTCMinutes()) + ':' +
				fixZero(this.getUTCSeconds()) + '.' +
				(this.getUTCMilliseconds()/1000).toFixed(3).slice(2, 5) +
				'Z';
		}
	}


//
//	/**
//	 * Object.create
//	 * Creates a new object with the specified prototype object and properties
//	 * @link https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
//	 * commented out because it cannot take null as the first parameter
//	 */
//	if (! Object.hasOwnProperty('create'))
//	{
//		Object.create = function (object, properties)
//		{
//			var result;
//
//			function F() {}
//			F.prototype = object;
//			result = new F();
//
//			if (properties !== undefined) {
//				Object.defineProperties(object, properties);
//			}
//			return result;
//		}
//	}
}());
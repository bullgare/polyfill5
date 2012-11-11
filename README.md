That's a little (802 bytes minified gzipped) polyfill to access ECMAScript5-functionality in older browsers.
It's inspired by Douglas Crockford's lecture "Level 7: ECMAScript 5: The New Parts" (Tuesday, March 29, 2011).
The following methods implemented (only if native not found of course):

* Object.keys
* function.prototype.bind
* String.prototype.trim
* Array.isArray
* Array.prototype.every
* Array.prototype.filter
* Array.prototype.forEach
* Array.prototype.indexOf
* Array.prototype.lastIndexOf
* Array.prototype.map
* Array.prototype.reduce
* Array.prototype.reduceRight
* Array.prototype.some
* Date.now
* Date.prototype.toISOString

/* >>>>>>>>>> BEGIN javascript.js */
/* >>>>>>>>>> BEGIN source/jquery.js */
/*!
 * jQuery JavaScript Library v1.4.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */
(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document;
var jQuery = (function() {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context );
	},

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// (both of which we optimize for)
	quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,

	// Is it a simple selector
	isSimple = /^.[^:#\[\.,]*$/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,
	rwhite = /\s/,

	// Used for trimming whitespace
	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	// Check for non-word characters
	rnonword = /\W/,

	// Check for digits
	rdigit = /\d/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	// Useragent RegExp
	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,
	
	// Has the ready events already been bound?
	readyBound = false,
	
	// The functions to execute on DOM ready
	readyList = [],

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,
	
	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), or $(undefined)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}
		
		// The body element only exists once, optimize finding it
		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = "body";
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			match = quickExpr.exec( selector );

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					doc = (context ? context.ownerDocument || context : document);

					// If a single string is passed in and it's a single tag
					// just do a createElement and skip the rest
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = (ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment).childNodes;
					}
					
					return jQuery.merge( this, selector );
					
				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $("TAG")
			} else if ( !context && !rnonword.test( selector ) ) {
				this.selector = selector;
				this.context = document;
				selector = document.getElementsByTagName( selector );
				return jQuery.merge( this, selector );

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return (context || rootjQuery).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return jQuery( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if (selector.selector !== undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.4.4",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this.slice(num)[ 0 ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = jQuery();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );
		
		} else {
			jQuery.merge( ret, elems );
		}

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + (this.selector ? " " : "") + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},
	
	ready: function( fn ) {
		// Attach the listeners
		jQuery.bindReady();

		// If the DOM is already ready
		if ( jQuery.isReady ) {
			// Execute the function immediately
			fn.call( document, jQuery );

		// Otherwise, remember the function for later
		} else if ( readyList ) {
			// Add the function to the wait list
			readyList.push( fn );
		}

		return this;
	},
	
	eq: function( i ) {
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, +i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},
	
	end: function() {
		return this.prevObject || jQuery(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	 var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		window.$ = _$;

		if ( deep ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},
	
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,
	
	// Handle when the DOM is ready
	ready: function( wait ) {
		// A third-party is pushing the ready event forwards
		if ( wait === true ) {
			jQuery.readyWait--;
		}

		// Make sure that the DOM is not already loaded
		if ( !jQuery.readyWait || (wait !== true && !jQuery.isReady) ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			if ( readyList ) {
				// Execute all of them
				var fn,
					i = 0,
					ready = readyList;

				// Reset the list of functions
				readyList = null;

				while ( (fn = ready[ i++ ]) ) {
					fn.call( document, jQuery );
				}

				// Trigger any bound ready events
				if ( jQuery.fn.trigger ) {
					jQuery( document ).trigger( "ready" ).unbind( "ready" );
				}
			}
		}
	},
	
	bindReady: function() {
		if ( readyBound ) {
			return;
		}

		readyBound = true;

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout( jQuery.ready, 1 );
		}

		// Mozilla, Opera and webkit nightlies currently support this event
		if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			
			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else if ( document.attachEvent ) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent("onreadystatechange", DOMContentLoaded);
			
			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	// A crude way of determining if an object is a window
	isWindow: function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	isNaN: function( obj ) {
		return obj == null || !rdigit.test( obj ) || isNaN( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}
		
		// Not own constructor property must be Object
		if ( obj.constructor &&
			!hasOwn.call(obj, "constructor") &&
			!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}
		
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
	
		var key;
		for ( key in obj ) {}
		
		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},
	
	error: function( msg ) {
		throw msg;
	},
	
	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );
		
		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test(data.replace(rvalidescape, "@")
			.replace(rvalidtokens, "]")
			.replace(rvalidbraces, "")) ) {

			// Try to use the native JSON parser first
			return window.JSON && window.JSON.parse ?
				window.JSON.parse( data ) :
				(new Function("return " + data))();

		} else {
			jQuery.error( "Invalid JSON: " + data );
		}
	},

	noop: function() {},

	// Evalulates a script in a global context
	globalEval: function( data ) {
		if ( data && rnotwhite.test(data) ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";

			if ( jQuery.support.scriptEval ) {
				script.appendChild( document.createTextNode( data ) );
			} else {
				script.text = data;
			}

			// Use insertBefore instead of appendChild to circumvent an IE6 bug.
			// This arises when a base node is used (#2709).
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction(object);

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
			}
		}

		return object;
	},

	// Use native String.trim function wherever possible
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// The extra typeof function check is to prevent crashes
			// in Safari 2 (See: #3039)
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = jQuery.type(array);

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array ) {
		if ( array.indexOf ) {
			return array.indexOf( elem );
		}

		for ( var i = 0, length = array.length; i < length; i++ ) {
			if ( array[ i ] === elem ) {
				return i;
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var ret = [], value;

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			value = callback( elems[ i ], i, arg );

			if ( value != null ) {
				ret[ ret.length ] = value;
			}
		}

		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	proxy: function( fn, proxy, thisObject ) {
		if ( arguments.length === 2 ) {
			if ( typeof proxy === "string" ) {
				thisObject = fn;
				fn = thisObject[ proxy ];
				proxy = undefined;

			} else if ( proxy && !jQuery.isFunction( proxy ) ) {
				thisObject = proxy;
				proxy = undefined;
			}
		}

		if ( !proxy && fn ) {
			proxy = function() {
				return fn.apply( thisObject || this, arguments );
			};
		}

		// Set the guid of unique handler to the same of original handler, so it can be removed
		if ( fn ) {
			proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
		}

		// So proxy can be declared as an argument
		return proxy;
	},

	// Mutifunctional method to get and set values to a collection
	// The value/s can be optionally by executed if its a function
	access: function( elems, key, value, exec, fn, pass ) {
		var length = elems.length;
	
		// Setting many attributes
		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
			}
			return elems;
		}
	
		// Setting one attribute
		if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = !pass && exec && jQuery.isFunction(value);
		
			for ( var i = 0; i < length; i++ ) {
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
			}
		
			return elems;
		}
	
		// Getting an attribute
		return length ? fn( elems[0], key ) : undefined;
	},

	now: function() {
		return (new Date()).getTime();
	},

	// Use of jQuery.browser is frowned upon.
	// More details: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	browser: {}
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}

// Deprecated, use jQuery.browser.webkit instead
if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

if ( indexOf ) {
	jQuery.inArray = function( elem, array ) {
		return indexOf.call( array, elem );
	};
}

// Verify that \s matches non-breaking spaces
// (IE fails on this test)
if ( !rwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}

// The DOM ready check for Internet Explorer
function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		// If IE is used, use the trick by Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	// and execute any waiting functions
	jQuery.ready();
}

// Expose jQuery to the global object
return (window.jQuery = window.$ = jQuery);

})();


(function() {

	jQuery.support = {};

	var root = document.documentElement,
		script = document.createElement("script"),
		div = document.createElement("div"),
		id = "script" + jQuery.now();

	div.style.display = "none";
	div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	var all = div.getElementsByTagName("*"),
		a = div.getElementsByTagName("a")[0],
		select = document.createElement("select"),
		opt = select.appendChild( document.createElement("option") );

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return;
	}

	jQuery.support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText insted)
		style: /red/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.55$/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: div.getElementsByTagName("input")[0].value === "on",

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Will be defined later
		deleteExpando: true,
		optDisabled: false,
		checkClone: false,
		scriptEval: false,
		noCloneEvent: true,
		boxModel: null,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableHiddenOffsets: true
	};

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as diabled)
	select.disabled = true;
	jQuery.support.optDisabled = !opt.disabled;

	script.type = "text/javascript";
	try {
		script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
	} catch(e) {}

	root.insertBefore( script, root.firstChild );

	// Make sure that the execution of code works by injecting a script
	// tag with appendChild/createTextNode
	// (IE doesn't support this, fails, and uses .text instead)
	if ( window[ id ] ) {
		jQuery.support.scriptEval = true;
		delete window[ id ];
	}

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete script.test;

	} catch(e) {
		jQuery.support.deleteExpando = false;
	}

	root.removeChild( script );

	if ( div.attachEvent && div.fireEvent ) {
		div.attachEvent("onclick", function click() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			jQuery.support.noCloneEvent = false;
			div.detachEvent("onclick", click);
		});
		div.cloneNode(true).fireEvent("onclick");
	}

	div = document.createElement("div");
	div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";

	var fragment = document.createDocumentFragment();
	fragment.appendChild( div.firstChild );

	// WebKit doesn't clone checked state correctly in fragments
	jQuery.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

	// Figure out if the W3C box model works as expected
	// document.body must exist before we can do this
	jQuery(function() {
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";

		document.body.appendChild( div );
		jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;

		if ( "zoom" in div.style ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.style.display = "inline";
			div.style.zoom = 1;
			jQuery.support.inlineBlockNeedsLayout = div.offsetWidth === 2;

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "";
			div.innerHTML = "<div style='width:4px;'></div>";
			jQuery.support.shrinkWrapBlocks = div.offsetWidth !== 2;
		}

		div.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
		var tds = div.getElementsByTagName("td");

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		jQuery.support.reliableHiddenOffsets = tds[0].offsetHeight === 0;

		tds[0].style.display = "";
		tds[1].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE < 8 fail this test)
		jQuery.support.reliableHiddenOffsets = jQuery.support.reliableHiddenOffsets && tds[0].offsetHeight === 0;
		div.innerHTML = "";

		document.body.removeChild( div ).style.display = "none";
		div = tds = null;
	});

	// Technique from Juriy Zaytsev
	// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
	var eventSupported = function( eventName ) {
		var el = document.createElement("div");
		eventName = "on" + eventName;

		var isSupported = (eventName in el);
		if ( !isSupported ) {
			el.setAttribute(eventName, "return;");
			isSupported = typeof el[eventName] === "function";
		}
		el = null;

		return isSupported;
	};

	jQuery.support.submitBubbles = eventSupported("submit");
	jQuery.support.changeBubbles = eventSupported("change");

	// release memory in IE
	root = script = div = all = a = null;
})();



var windowData = {},
	rbrace = /^(?:\{.*\}|\[.*\])$/;

jQuery.extend({
	cache: {},

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page	
	expando: "jQuery" + jQuery.now(),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	data: function( elem, name, data ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		elem = elem == window ?
			windowData :
			elem;

		var isNode = elem.nodeType,
			id = isNode ? elem[ jQuery.expando ] : null,
			cache = jQuery.cache, thisCache;

		if ( isNode && !id && typeof name === "string" && data === undefined ) {
			return;
		}

		// Get the data from the object directly
		if ( !isNode ) {
			cache = elem;

		// Compute a unique ID for the element
		} else if ( !id ) {
			elem[ jQuery.expando ] = id = ++jQuery.uuid;
		}

		// Avoid generating a new cache unless none exists and we
		// want to manipulate it.
		if ( typeof name === "object" ) {
			if ( isNode ) {
				cache[ id ] = jQuery.extend(cache[ id ], name);

			} else {
				jQuery.extend( cache, name );
			}

		} else if ( isNode && !cache[ id ] ) {
			cache[ id ] = {};
		}

		thisCache = isNode ? cache[ id ] : cache;

		// Prevent overriding the named cache with undefined values
		if ( data !== undefined ) {
			thisCache[ name ] = data;
		}

		return typeof name === "string" ? thisCache[ name ] : thisCache;
	},

	removeData: function( elem, name ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		elem = elem == window ?
			windowData :
			elem;

		var isNode = elem.nodeType,
			id = isNode ? elem[ jQuery.expando ] : elem,
			cache = jQuery.cache,
			thisCache = isNode ? cache[ id ] : id;

		// If we want to remove a specific section of the element's data
		if ( name ) {
			if ( thisCache ) {
				// Remove the section of cache data
				delete thisCache[ name ];

				// If we've removed all the data, remove the element's cache
				if ( isNode && jQuery.isEmptyObject(thisCache) ) {
					jQuery.removeData( elem );
				}
			}

		// Otherwise, we want to remove all of the element's data
		} else {
			if ( isNode && jQuery.support.deleteExpando ) {
				delete elem[ jQuery.expando ];

			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( jQuery.expando );

			// Completely remove the data cache
			} else if ( isNode ) {
				delete cache[ id ];

			// Remove all fields from the object
			} else {
				for ( var n in elem ) {
					delete elem[ n ];
				}
			}
		}
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var data = null;

		if ( typeof key === "undefined" ) {
			if ( this.length ) {
				var attr = this[0].attributes, name;
				data = jQuery.data( this[0] );

				for ( var i = 0, l = attr.length; i < l; i++ ) {
					name = attr[i].name;

					if ( name.indexOf( "data-" ) === 0 ) {
						name = name.substr( 5 );
						dataAttr( this[0], name, data[ name ] );
					}
				}
			}

			return data;

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			// Try to fetch any internally stored data first
			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
				data = dataAttr( this[0], key, data );
			}

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;

		} else {
			return this.each(function() {
				var $this = jQuery( this ),
					args = [ parts[0], value ];

				$this.triggerHandler( "setData" + parts[1] + "!", args );
				jQuery.data( this, key, value );
				$this.triggerHandler( "changeData" + parts[1] + "!", args );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		data = elem.getAttribute( "data-" + key );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				!jQuery.isNaN( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}




jQuery.extend({
	queue: function( elem, type, data ) {
		if ( !elem ) {
			return;
		}

		type = (type || "fx") + "queue";
		var q = jQuery.data( elem, type );

		// Speed up dequeue by getting out quickly if this is just a lookup
		if ( !data ) {
			return q || [];
		}

		if ( !q || jQuery.isArray(data) ) {
			q = jQuery.data( elem, type, jQuery.makeArray(data) );

		} else {
			q.push( data );
		}

		return q;
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift();

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift("inprogress");
			}

			fn.call(elem, function() {
				jQuery.dequeue(elem, type);
			});
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function( i ) {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},

	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue( type, function() {
			var elem = this;
			setTimeout(function() {
				jQuery.dequeue( elem, type );
			}, time );
		});
	},

	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	}
});




var rclass = /[\n\t]/g,
	rspaces = /\s+/,
	rreturn = /\r/g,
	rspecialurl = /^(?:href|src|style)$/,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rradiocheck = /^(?:radio|checkbox)$/i;

jQuery.props = {
	"for": "htmlFor",
	"class": "className",
	readonly: "readOnly",
	maxlength: "maxLength",
	cellspacing: "cellSpacing",
	rowspan: "rowSpan",
	colspan: "colSpan",
	tabindex: "tabIndex",
	usemap: "useMap",
	frameborder: "frameBorder"
};

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name, fn ) {
		return this.each(function(){
			jQuery.attr( this, name, "" );
			if ( this.nodeType === 1 ) {
				this.removeAttribute( name );
			}
		});
	},

	addClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.addClass( value.call(this, i, self.attr("class")) );
			});
		}

		if ( value && typeof value === "string" ) {
			var classNames = (value || "").split( rspaces );

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className ) {
						elem.className = value;

					} else {
						var className = " " + elem.className + " ",
							setClass = elem.className;

						for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
								setClass += " " + classNames[c];
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.removeClass( value.call(this, i, self.attr("class")) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			var classNames = (value || "").split( rspaces );

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						var className = (" " + elem.className + " ").replace(rclass, " ");
						for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[c] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.toggleClass( value.call(this, i, self.attr("class"), stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspaces );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space seperated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery.data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery.data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ";
		for ( var i = 0, l = this.length; i < l; i++ ) {
			if ( (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		if ( !arguments.length ) {
			var elem = this[0];

			if ( elem ) {
				if ( jQuery.nodeName( elem, "option" ) ) {
					// attributes.value is undefined in Blackberry 4.7 but
					// uses .value. See #6932
					var val = elem.attributes.value;
					return !val || val.specified ? elem.value : elem.text;
				}

				// We need to handle select boxes special
				if ( jQuery.nodeName( elem, "select" ) ) {
					var index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type === "select-one";

					// Nothing was selected
					if ( index < 0 ) {
						return null;
					}

					// Loop through all the selected options
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						// Don't return options that are disabled or in a disabled optgroup
						if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && 
								(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				}

				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				if ( rradiocheck.test( elem.type ) && !jQuery.support.checkOn ) {
					return elem.getAttribute("value") === null ? "on" : elem.value;
				}
				

				// Everything else, we just grab the value
				return (elem.value || "").replace(rreturn, "");

			}

			return undefined;
		}

		var isFunction = jQuery.isFunction(value);

		return this.each(function(i) {
			var self = jQuery(this), val = value;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call(this, i, self.val());
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray(val) ) {
				val = jQuery.map(val, function (value) {
					return value == null ? "" : value + "";
				});
			}

			if ( jQuery.isArray(val) && rradiocheck.test( this.type ) ) {
				this.checked = jQuery.inArray( self.val(), val ) >= 0;

			} else if ( jQuery.nodeName( this, "select" ) ) {
				var values = jQuery.makeArray(val);

				jQuery( "option", this ).each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					this.selectedIndex = -1;
				}

			} else {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},
		
	attr: function( elem, name, value, pass ) {
		// don't set attributes on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
			return undefined;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery(elem)[name](value);
		}

		var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc( elem ),
			// Whether we are setting (or getting)
			set = value !== undefined;

		// Try to normalize/fix the name
		name = notxml && jQuery.props[ name ] || name;

		// These attributes require special treatment
		var special = rspecialurl.test( name );

		// Safari mis-reports the default selected property of an option
		// Accessing the parent's selectedIndex property fixes it
		if ( name === "selected" && !jQuery.support.optSelected ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}

		// If applicable, access the attribute via the DOM 0 way
		// 'in' checks fail in Blackberry 4.7 #6931
		if ( (name in elem || elem[ name ] !== undefined) && notxml && !special ) {
			if ( set ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( name === "type" && rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				}

				if ( value === null ) {
					if ( elem.nodeType === 1 ) {
						elem.removeAttribute( name );
					}

				} else {
					elem[ name ] = value;
				}
			}

			// browsers index elements by id/name on forms, give priority to attributes.
			if ( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) ) {
				return elem.getAttributeNode( name ).nodeValue;
			}

			// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
			// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
			if ( name === "tabIndex" ) {
				var attributeNode = elem.getAttributeNode( "tabIndex" );

				return attributeNode && attributeNode.specified ?
					attributeNode.value :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}

			return elem[ name ];
		}

		if ( !jQuery.support.style && notxml && name === "style" ) {
			if ( set ) {
				elem.style.cssText = "" + value;
			}

			return elem.style.cssText;
		}

		if ( set ) {
			// convert the value to a string (all browsers do this but IE) see #1070
			elem.setAttribute( name, "" + value );
		}

		// Ensure that missing attributes return undefined
		// Blackberry 4.7 returns "" from getAttribute #6938
		if ( !elem.attributes[ name ] && (elem.hasAttribute && !elem.hasAttribute( name )) ) {
			return undefined;
		}

		var attr = !jQuery.support.hrefNormalized && notxml && special ?
				// Some attributes require a special call on IE
				elem.getAttribute( name, 2 ) :
				elem.getAttribute( name );

		// Non-existent attributes return null, we normalize to undefined
		return attr === null ? undefined : attr;
	}
});




var rnamespaces = /\.(.*)$/,
	rformElems = /^(?:textarea|input|select)$/i,
	rperiod = /\./g,
	rspace = / /g,
	rescape = /[^\w\s.|`]/g,
	fcleanup = function( nm ) {
		return nm.replace(rescape, "\\$&");
	},
	focusCounts = { focusin: 0, focusout: 0 };

/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function( elem, types, handler, data ) {
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// For whatever reason, IE has trouble passing the window object
		// around, causing it to be cloned in the process
		if ( jQuery.isWindow( elem ) && ( elem !== window && !elem.frameElement ) ) {
			elem = window;
		}

		if ( handler === false ) {
			handler = returnFalse;
		} else if ( !handler ) {
			// Fixes bug #7229. Fix recommended by jdalton
		  return;
		}

		var handleObjIn, handleObj;

		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure
		var elemData = jQuery.data( elem );

		// If no elemData is found then we must be trying to bind to one of the
		// banned noData elements
		if ( !elemData ) {
			return;
		}

		// Use a key less likely to result in collisions for plain JS objects.
		// Fixes bug #7150.
		var eventKey = elem.nodeType ? "events" : "__events__",
			events = elemData[ eventKey ],
			eventHandle = elemData.handle;
			
		if ( typeof events === "function" ) {
			// On plain objects events is a fn that holds the the data
			// which prevents this data from being JSON serialized
			// the function does not need to be called, it just contains the data
			eventHandle = events.handle;
			events = events.events;

		} else if ( !events ) {
			if ( !elem.nodeType ) {
				// On plain objects, create a fn that acts as the holder
				// of the values to avoid JSON serialization of event data
				elemData[ eventKey ] = elemData = function(){};
			}

			elemData.events = events = {};
		}

		if ( !eventHandle ) {
			elemData.handle = eventHandle = function() {
				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && !jQuery.event.triggered ?
					jQuery.event.handle.apply( eventHandle.elem, arguments ) :
					undefined;
			};
		}

		// Add elem as a property of the handle function
		// This is to prevent a memory leak with non-native events in IE.
		eventHandle.elem = elem;

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = types.split(" ");

		var type, i = 0, namespaces;

		while ( (type = types[ i++ ]) ) {
			handleObj = handleObjIn ?
				jQuery.extend({}, handleObjIn) :
				{ handler: handler, data: data };

			// Namespaced event handlers
			if ( type.indexOf(".") > -1 ) {
				namespaces = type.split(".");
				type = namespaces.shift();
				handleObj.namespace = namespaces.slice(0).sort().join(".");

			} else {
				namespaces = [];
				handleObj.namespace = "";
			}

			handleObj.type = type;
			if ( !handleObj.guid ) {
				handleObj.guid = handler.guid;
			}

			// Get the current list of functions bound to this event
			var handlers = events[ type ],
				special = jQuery.event.special[ type ] || {};

			// Init the event handler queue
			if ( !handlers ) {
				handlers = events[ type ] = [];

				// Check for a special event handler
				// Only use addEventListener/attachEvent if the special
				// events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}
			
			if ( special.add ) { 
				special.add.call( elem, handleObj ); 

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add the function to the element's handler list
			handlers.push( handleObj );

			// Keep track of which events have been used, for global triggering
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, pos ) {
		// don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		if ( handler === false ) {
			handler = returnFalse;
		}

		var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,
			eventKey = elem.nodeType ? "events" : "__events__",
			elemData = jQuery.data( elem ),
			events = elemData && elemData[ eventKey ];

		if ( !elemData || !events ) {
			return;
		}
		
		if ( typeof events === "function" ) {
			elemData = events;
			events = events.events;
		}

		// types is actually an event object here
		if ( types && types.type ) {
			handler = types.handler;
			types = types.type;
		}

		// Unbind all events for the element
		if ( !types || typeof types === "string" && types.charAt(0) === "." ) {
			types = types || "";

			for ( type in events ) {
				jQuery.event.remove( elem, type + types );
			}

			return;
		}

		// Handle multiple events separated by a space
		// jQuery(...).unbind("mouseover mouseout", fn);
		types = types.split(" ");

		while ( (type = types[ i++ ]) ) {
			origType = type;
			handleObj = null;
			all = type.indexOf(".") < 0;
			namespaces = [];

			if ( !all ) {
				// Namespaced event handlers
				namespaces = type.split(".");
				type = namespaces.shift();

				namespace = new RegExp("(^|\\.)" + 
					jQuery.map( namespaces.slice(0).sort(), fcleanup ).join("\\.(?:.*\\.)?") + "(\\.|$)");
			}

			eventType = events[ type ];

			if ( !eventType ) {
				continue;
			}

			if ( !handler ) {
				for ( j = 0; j < eventType.length; j++ ) {
					handleObj = eventType[ j ];

					if ( all || namespace.test( handleObj.namespace ) ) {
						jQuery.event.remove( elem, origType, handleObj.handler, j );
						eventType.splice( j--, 1 );
					}
				}

				continue;
			}

			special = jQuery.event.special[ type ] || {};

			for ( j = pos || 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( handler.guid === handleObj.guid ) {
					// remove the given handler for the given type
					if ( all || namespace.test( handleObj.namespace ) ) {
						if ( pos == null ) {
							eventType.splice( j--, 1 );
						}

						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}

					if ( pos != null ) {
						break;
					}
				}
			}

			// remove generic event handler if no more handlers exist
			if ( eventType.length === 0 || pos != null && eventType.length === 1 ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				ret = null;
				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			var handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			delete elemData.events;
			delete elemData.handle;

			if ( typeof elemData === "function" ) {
				jQuery.removeData( elem, eventKey );

			} else if ( jQuery.isEmptyObject( elemData ) ) {
				jQuery.removeData( elem );
			}
		}
	},

	// bubbling is internal
	trigger: function( event, data, elem /*, bubbling */ ) {
		// Event object or event type
		var type = event.type || event,
			bubbling = arguments[3];

		if ( !bubbling ) {
			event = typeof event === "object" ?
				// jQuery.Event object
				event[ jQuery.expando ] ? event :
				// Object literal
				jQuery.extend( jQuery.Event(type), event ) :
				// Just the event type (string)
				jQuery.Event(type);

			if ( type.indexOf("!") >= 0 ) {
				event.type = type = type.slice(0, -1);
				event.exclusive = true;
			}

			// Handle a global trigger
			if ( !elem ) {
				// Don't bubble custom events when global (to avoid too much overhead)
				event.stopPropagation();

				// Only trigger if we've ever bound an event for it
				if ( jQuery.event.global[ type ] ) {
					jQuery.each( jQuery.cache, function() {
						if ( this.events && this.events[type] ) {
							jQuery.event.trigger( event, data, this.handle.elem );
						}
					});
				}
			}

			// Handle triggering a single element

			// don't do events on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
				return undefined;
			}

			// Clean up in case it is reused
			event.result = undefined;
			event.target = elem;

			// Clone the incoming data, if any
			data = jQuery.makeArray( data );
			data.unshift( event );
		}

		event.currentTarget = elem;

		// Trigger the event, it is assumed that "handle" is a function
		var handle = elem.nodeType ?
			jQuery.data( elem, "handle" ) :
			(jQuery.data( elem, "__events__" ) || {}).handle;

		if ( handle ) {
			handle.apply( elem, data );
		}

		var parent = elem.parentNode || elem.ownerDocument;

		// Trigger an inline bound script
		try {
			if ( !(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) ) {
				if ( elem[ "on" + type ] && elem[ "on" + type ].apply( elem, data ) === false ) {
					event.result = false;
					event.preventDefault();
				}
			}

		// prevent IE from throwing an error for some elements with some event types, see #3533
		} catch (inlineError) {}

		if ( !event.isPropagationStopped() && parent ) {
			jQuery.event.trigger( event, data, parent, true );

		} else if ( !event.isDefaultPrevented() ) {
			var old,
				target = event.target,
				targetType = type.replace( rnamespaces, "" ),
				isClick = jQuery.nodeName( target, "a" ) && targetType === "click",
				special = jQuery.event.special[ targetType ] || {};

			if ( (!special._default || special._default.call( elem, event ) === false) && 
				!isClick && !(target && target.nodeName && jQuery.noData[target.nodeName.toLowerCase()]) ) {

				try {
					if ( target[ targetType ] ) {
						// Make sure that we don't accidentally re-trigger the onFOO events
						old = target[ "on" + targetType ];

						if ( old ) {
							target[ "on" + targetType ] = null;
						}

						jQuery.event.triggered = true;
						target[ targetType ]();
					}

				// prevent IE from throwing an error for some elements with some event types, see #3533
				} catch (triggerError) {}

				if ( old ) {
					target[ "on" + targetType ] = old;
				}

				jQuery.event.triggered = false;
			}
		}
	},

	handle: function( event ) {
		var all, handlers, namespaces, namespace_re, events,
			namespace_sort = [],
			args = jQuery.makeArray( arguments );

		event = args[0] = jQuery.event.fix( event || window.event );
		event.currentTarget = this;

		// Namespaced event handlers
		all = event.type.indexOf(".") < 0 && !event.exclusive;

		if ( !all ) {
			namespaces = event.type.split(".");
			event.type = namespaces.shift();
			namespace_sort = namespaces.slice(0).sort();
			namespace_re = new RegExp("(^|\\.)" + namespace_sort.join("\\.(?:.*\\.)?") + "(\\.|$)");
		}

		event.namespace = event.namespace || namespace_sort.join(".");

		events = jQuery.data(this, this.nodeType ? "events" : "__events__");

		if ( typeof events === "function" ) {
			events = events.events;
		}

		handlers = (events || {})[ event.type ];

		if ( events && handlers ) {
			// Clone the handlers to prevent manipulation
			handlers = handlers.slice(0);

			for ( var j = 0, l = handlers.length; j < l; j++ ) {
				var handleObj = handlers[ j ];

				// Filter the functions by class
				if ( all || namespace_re.test( handleObj.namespace ) ) {
					// Pass in a reference to the handler function itself
					// So that we can later remove it
					event.handler = handleObj.handler;
					event.data = handleObj.data;
					event.handleObj = handleObj;
	
					var ret = handleObj.handler.apply( this, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}

					if ( event.isImmediatePropagationStopped() ) {
						break;
					}
				}
			}
		}

		return event.result;
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// store a copy of the original event object
		// and "clone" to set read-only properties
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ) {
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary
		if ( !event.target ) {
			// Fixes #1925 where srcElement might not be defined either
			event.target = event.srcElement || document;
		}

		// check if target is a textnode (safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement ) {
			event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
		}

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var doc = document.documentElement,
				body = document.body;

			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
		}

		// Add which for key events
		if ( event.which == null && (event.charCode != null || event.keyCode != null) ) {
			event.which = event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey ) {
			event.metaKey = event.ctrlKey;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button !== undefined ) {
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
		}

		return event;
	},

	// Deprecated, use jQuery.guid instead
	guid: 1E8,

	// Deprecated, use jQuery.proxy instead
	proxy: jQuery.proxy,

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady,
			teardown: jQuery.noop
		},

		live: {
			add: function( handleObj ) {
				jQuery.event.add( this,
					liveConvert( handleObj.origType, handleObj.selector ),
					jQuery.extend({}, handleObj, {handler: liveHandler, guid: handleObj.handler.guid}) ); 
			},

			remove: function( handleObj ) {
				jQuery.event.remove( this, liveConvert( handleObj.origType, handleObj.selector ), handleObj );
			}
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} : 
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src ) {
	// Allow instantiation without the 'new' keyword
	if ( !this.preventDefault ) {
		return new jQuery.Event( src );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;
	// Event type
	} else {
		this.type = src;
	}

	// timeStamp is buggy for some events on Firefox(#3843)
	// So we won't rely on the native value
	this.timeStamp = jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		
		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function( event ) {
	// Check if mouse(over|out) are still within the same parent element
	var parent = event.relatedTarget;

	// Firefox sometimes assigns relatedTarget a XUL element
	// which we cannot access the parentNode property of
	try {
		// Traverse up the tree
		while ( parent && parent !== this ) {
			parent = parent.parentNode;
		}

		if ( parent !== this ) {
			// set the correct event type
			event.type = event.data;

			// handle event if we actually just moused on to a non sub-element
			jQuery.event.handle.apply( this, arguments );
		}

	// assuming we've left the element since we most likely mousedover a xul element
	} catch(e) { }
},

// In case of event delegation, we only need to rename the event.type,
// liveHandler will take care of the rest.
delegate = function( event ) {
	event.type = event.data;
	jQuery.event.handle.apply( this, arguments );
};

// Create mouseenter and mouseleave events
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		setup: function( data ) {
			jQuery.event.add( this, fix, data && data.selector ? delegate : withinElement, orig );
		},
		teardown: function( data ) {
			jQuery.event.remove( this, fix, data && data.selector ? delegate : withinElement );
		}
	};
});

// submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function( data, namespaces ) {
			if ( this.nodeName.toLowerCase() !== "form" ) {
				jQuery.event.add(this, "click.specialSubmit", function( e ) {
					var elem = e.target,
						type = elem.type;

					if ( (type === "submit" || type === "image") && jQuery( elem ).closest("form").length ) {
						e.liveFired = undefined;
						return trigger( "submit", this, arguments );
					}
				});
	 
				jQuery.event.add(this, "keypress.specialSubmit", function( e ) {
					var elem = e.target,
						type = elem.type;

					if ( (type === "text" || type === "password") && jQuery( elem ).closest("form").length && e.keyCode === 13 ) {
						e.liveFired = undefined;
						return trigger( "submit", this, arguments );
					}
				});

			} else {
				return false;
			}
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialSubmit" );
		}
	};

}

// change delegation, happens here so we have bind.
if ( !jQuery.support.changeBubbles ) {

	var changeFilters,

	getVal = function( elem ) {
		var type = elem.type, val = elem.value;

		if ( type === "radio" || type === "checkbox" ) {
			val = elem.checked;

		} else if ( type === "select-multiple" ) {
			val = elem.selectedIndex > -1 ?
				jQuery.map( elem.options, function( elem ) {
					return elem.selected;
				}).join("-") :
				"";

		} else if ( elem.nodeName.toLowerCase() === "select" ) {
			val = elem.selectedIndex;
		}

		return val;
	},

	testChange = function testChange( e ) {
		var elem = e.target, data, val;

		if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {
			return;
		}

		data = jQuery.data( elem, "_change_data" );
		val = getVal(elem);

		// the current data will be also retrieved by beforeactivate
		if ( e.type !== "focusout" || elem.type !== "radio" ) {
			jQuery.data( elem, "_change_data", val );
		}
		
		if ( data === undefined || val === data ) {
			return;
		}

		if ( data != null || val ) {
			e.type = "change";
			e.liveFired = undefined;
			return jQuery.event.trigger( e, arguments[1], elem );
		}
	};

	jQuery.event.special.change = {
		filters: {
			focusout: testChange, 

			beforedeactivate: testChange,

			click: function( e ) {
				var elem = e.target, type = elem.type;

				if ( type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select" ) {
					return testChange.call( this, e );
				}
			},

			// Change has to be called before submit
			// Keydown will be called before keypress, which is used in submit-event delegation
			keydown: function( e ) {
				var elem = e.target, type = elem.type;

				if ( (e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") ||
					(e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
					type === "select-multiple" ) {
					return testChange.call( this, e );
				}
			},

			// Beforeactivate happens also before the previous element is blurred
			// with this event you can't trigger a change event, but you can store
			// information
			beforeactivate: function( e ) {
				var elem = e.target;
				jQuery.data( elem, "_change_data", getVal(elem) );
			}
		},

		setup: function( data, namespaces ) {
			if ( this.type === "file" ) {
				return false;
			}

			for ( var type in changeFilters ) {
				jQuery.event.add( this, type + ".specialChange", changeFilters[type] );
			}

			return rformElems.test( this.nodeName );
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialChange" );

			return rformElems.test( this.nodeName );
		}
	};

	changeFilters = jQuery.event.special.change.filters;

	// Handle when the input is .focus()'d
	changeFilters.focus = changeFilters.beforeactivate;
}

function trigger( type, elem, args ) {
	args[0].type = type;
	return jQuery.event.handle.apply( elem, args );
}

// Create "bubbling" focus and blur events
if ( document.addEventListener ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( focusCounts[fix]++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			}, 
			teardown: function() { 
				if ( --focusCounts[fix] === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};

		function handler( e ) { 
			e = jQuery.event.fix( e );
			e.type = fix;
			return jQuery.event.trigger( e, null, e.target );
		}
	});
}

jQuery.each(["bind", "one"], function( i, name ) {
	jQuery.fn[ name ] = function( type, data, fn ) {
		// Handle object literals
		if ( typeof type === "object" ) {
			for ( var key in type ) {
				this[ name ](key, data, type[key], fn);
			}
			return this;
		}
		
		if ( jQuery.isFunction( data ) || data === false ) {
			fn = data;
			data = undefined;
		}

		var handler = name === "one" ? jQuery.proxy( fn, function( event ) {
			jQuery( this ).unbind( event, handler );
			return fn.apply( this, arguments );
		}) : fn;

		if ( type === "unload" && name !== "one" ) {
			this.one( type, data, fn );

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.add( this[i], type, handler, data );
			}
		}

		return this;
	};
});

jQuery.fn.extend({
	unbind: function( type, fn ) {
		// Handle object literals
		if ( typeof type === "object" && !type.preventDefault ) {
			for ( var key in type ) {
				this.unbind(key, type[key]);
			}

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.remove( this[i], type, fn );
			}
		}

		return this;
	},
	
	delegate: function( selector, types, data, fn ) {
		return this.live( types, data, fn, selector );
	},
	
	undelegate: function( selector, types, fn ) {
		if ( arguments.length === 0 ) {
				return this.unbind( "live" );
		
		} else {
			return this.die( types, null, fn, selector );
		}
	},
	
	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},

	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			var event = jQuery.Event( type );
			event.preventDefault();
			event.stopPropagation();
			jQuery.event.trigger( event, data, this[0] );
			return event.result;
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			i = 1;

		// link all the functions, so any of them can unbind this click handler
		while ( i < args.length ) {
			jQuery.proxy( fn, args[ i++ ] );
		}

		return this.click( jQuery.proxy( fn, function( event ) {
			// Figure out which function to execute
			var lastToggle = ( jQuery.data( this, "lastToggle" + fn.guid ) || 0 ) % i;
			jQuery.data( this, "lastToggle" + fn.guid, lastToggle + 1 );

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ lastToggle ].apply( this, arguments ) || false;
		}));
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

var liveMap = {
	focus: "focusin",
	blur: "focusout",
	mouseenter: "mouseover",
	mouseleave: "mouseout"
};

jQuery.each(["live", "die"], function( i, name ) {
	jQuery.fn[ name ] = function( types, data, fn, origSelector /* Internal Use Only */ ) {
		var type, i = 0, match, namespaces, preType,
			selector = origSelector || this.selector,
			context = origSelector ? this : jQuery( this.context );
		
		if ( typeof types === "object" && !types.preventDefault ) {
			for ( var key in types ) {
				context[ name ]( key, data, types[key], selector );
			}
			
			return this;
		}

		if ( jQuery.isFunction( data ) ) {
			fn = data;
			data = undefined;
		}

		types = (types || "").split(" ");

		while ( (type = types[ i++ ]) != null ) {
			match = rnamespaces.exec( type );
			namespaces = "";

			if ( match )  {
				namespaces = match[0];
				type = type.replace( rnamespaces, "" );
			}

			if ( type === "hover" ) {
				types.push( "mouseenter" + namespaces, "mouseleave" + namespaces );
				continue;
			}

			preType = type;

			if ( type === "focus" || type === "blur" ) {
				types.push( liveMap[ type ] + namespaces );
				type = type + namespaces;

			} else {
				type = (liveMap[ type ] || type) + namespaces;
			}

			if ( name === "live" ) {
				// bind live handler
				for ( var j = 0, l = context.length; j < l; j++ ) {
					jQuery.event.add( context[j], "live." + liveConvert( type, selector ),
						{ data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType } );
				}

			} else {
				// unbind live handler
				context.unbind( "live." + liveConvert( type, selector ), fn );
			}
		}
		
		return this;
	};
});

function liveHandler( event ) {
	var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret,
		elems = [],
		selectors = [],
		events = jQuery.data( this, this.nodeType ? "events" : "__events__" );

	if ( typeof events === "function" ) {
		events = events.events;
	}

	// Make sure we avoid non-left-click bubbling in Firefox (#3861)
	if ( event.liveFired === this || !events || !events.live || event.button && event.type === "click" ) {
		return;
	}
	
	if ( event.namespace ) {
		namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
	}

	event.liveFired = this;

	var live = events.live.slice(0);

	for ( j = 0; j < live.length; j++ ) {
		handleObj = live[j];

		if ( handleObj.origType.replace( rnamespaces, "" ) === event.type ) {
			selectors.push( handleObj.selector );

		} else {
			live.splice( j--, 1 );
		}
	}

	match = jQuery( event.target ).closest( selectors, event.currentTarget );

	for ( i = 0, l = match.length; i < l; i++ ) {
		close = match[i];

		for ( j = 0; j < live.length; j++ ) {
			handleObj = live[j];

			if ( close.selector === handleObj.selector && (!namespace || namespace.test( handleObj.namespace )) ) {
				elem = close.elem;
				related = null;

				// Those two events require additional checking
				if ( handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave" ) {
					event.type = handleObj.preType;
					related = jQuery( event.relatedTarget ).closest( handleObj.selector )[0];
				}

				if ( !related || related !== elem ) {
					elems.push({ elem: elem, handleObj: handleObj, level: close.level });
				}
			}
		}
	}

	for ( i = 0, l = elems.length; i < l; i++ ) {
		match = elems[i];

		if ( maxLevel && match.level > maxLevel ) {
			break;
		}

		event.currentTarget = match.elem;
		event.data = match.handleObj.data;
		event.handleObj = match.handleObj;

		ret = match.handleObj.origHandler.apply( match.elem, arguments );

		if ( ret === false || event.isPropagationStopped() ) {
			maxLevel = match.level;

			if ( ret === false ) {
				stop = false;
			}
			if ( event.isImmediatePropagationStopped() ) {
				break;
			}
		}
	}

	return stop;
}

function liveConvert( type, selector ) {
	return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspace, "&");
}

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.bind( name, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}
});

// Prevent memory leaks in IE
// Window isn't included so as not to unbind existing unload events
// More info:
//  - http://isaacschlueter.com/2006/10/msie-memory-leaks/
if ( window.attachEvent && !window.addEventListener ) {
	jQuery(window).bind("unload", function() {
		for ( var id in jQuery.cache ) {
			if ( jQuery.cache[ id ].handle ) {
				// Try/Catch is to handle iframes being unloaded, see #4280
				try {
					jQuery.event.remove( jQuery.cache[ id ].handle.elem );
				} catch(e) {}
			}
		}
	});
}


/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var match,
			type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName( "*" );
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var found, item,
					filter = Expr.filter[ type ],
					left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !/\W/.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			return context.getElementsByTagName( match[1] );
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace(/\\/g, "");
		},

		TAG: function( match, curLoop ) {
			return match[1].toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			return "text" === elem.type;
		},
		radio: function( elem ) {
			return "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return "checkbox" === elem.type;
		},

		file: function( elem ) {
			return "file" === elem.type;
		},
		password: function( elem ) {
			return "password" === elem.type;
		},

		submit: function( elem ) {
			return "submit" === elem.type;
		},

		image: function( elem ) {
			return "image" === elem.type;
		},

		reset: function( elem ) {
			return "reset" === elem.type;
		},

		button: function( elem ) {
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( "Syntax error, unrecognized expression: " + name );
			}
		},

		CHILD: function( elem, match ) {
			var type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					var first = match[2],
						last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// If the nodes are siblings (or identical) we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Utility function for retreiving the text value of an array of DOM nodes
Sizzle.getText = function( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += Sizzle.getText( elem.childNodes );
		}
	}

	return ret;
};

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Make sure that attribute selectors are quoted
			query = query.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				if ( context.nodeType === 9 ) {
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var old = context.getAttribute( "id" ),
						nid = old || id;

					if ( !old ) {
						context.setAttribute( "id", nid );
					}

					try {
						return makeArray( context.querySelectorAll( "#" + nid + " " + query ), extra );

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector,
		pseudoWorks = false;

	try {
		// This should fail with an exception
		// Gecko does not error, returns false instead
		matches.call( document.documentElement, "[test!='']:sizzle" );
	
	} catch( pseudoError ) {
		pseudoWorks = true;
	}

	if ( matches ) {
		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						return matches.call( node, expr );
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	// Note: This RegExp should be improved, or likely pulled from Sizzle
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS;

jQuery.fn.extend({
	find: function( selector ) {
		var ret = this.pushStack( "", "find", selector ),
			length = 0;

		for ( var i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( var n = length; n < ret.length; n++ ) {
					for ( var r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},
	
	is: function( selector ) {
		return !!selector && jQuery.filter( selector, this ).length > 0;
	},

	closest: function( selectors, context ) {
		var ret = [], i, l, cur = this[0];

		if ( jQuery.isArray( selectors ) ) {
			var match, selector,
				matches = {},
				level = 1;

			if ( cur && selectors.length ) {
				for ( i = 0, l = selectors.length; i < l; i++ ) {
					selector = selectors[i];

					if ( !matches[selector] ) {
						matches[selector] = jQuery.expr.match.POS.test( selector ) ? 
							jQuery( selector, context || this.context ) :
							selector;
					}
				}

				while ( cur && cur.ownerDocument && cur !== context ) {
					for ( selector in matches ) {
						match = matches[selector];

						if ( match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match) ) {
							ret.push({ selector: selector, elem: cur, level: level });
						}
					}

					cur = cur.parentNode;
					level++;
				}
			}

			return ret;
		}

		var pos = POS.test( selectors ) ? 
			jQuery( selectors, context || this.context ) : null;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique(ret) : ret;
		
		return this.pushStack( ret, "closest", selectors );
	},
	
	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {
		if ( !elem || typeof elem === "string" ) {
			return jQuery.inArray( this[0],
				// If it receives a string, the selector is used
				// If it receives nothing, the siblings are used
				elem ? jQuery( elem ) : this.parent().children() );
		}
		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context || this.context ) :
				jQuery.makeArray( selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );
		
		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call(arguments).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},
	
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return (elem === qualifier) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return (jQuery.inArray( elem, qualifier ) >= 0) === keep;
	});
}




var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnocache = /<(?:script|object|embed|option|style)/i,
	// checked="checked" or checked (html5)
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	raction = /\=([^="'>\s]+\/)>/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	};

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery( this );

				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append(this);
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		return this.each(function() {
			jQuery( this ).wrapAll( html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery(arguments[0]);
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery(arguments[0]).toArray() );
			return set;
		}
	},
	
	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					 elem.parentNode.removeChild( elem );
				}
			}
		}
		
		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}
		
		return this;
	},

	clone: function( events ) {
		// Do the clone
		var ret = this.map(function() {
			if ( !jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this) ) {
				// IE copies events bound via attachEvent when
				// using cloneNode. Calling detachEvent on the
				// clone will also remove the events from the orignal
				// In order to get around this, we use innerHTML.
				// Unfortunately, this means some modifications to
				// attributes in IE that are actually only stored
				// as properties will not be copied (such as the
				// the name attribute on an input).
				var html = this.outerHTML,
					ownerDocument = this.ownerDocument;

				if ( !html ) {
					var div = ownerDocument.createElement("div");
					div.appendChild( this.cloneNode(true) );
					html = div.innerHTML;
				}

				return jQuery.clean([html.replace(rinlinejQuery, "")
					// Handle the case in IE 8 where action=/test/> self-closes a tag
					.replace(raction, '="$1">')
					.replace(rleadingWhitespace, "")], ownerDocument)[0];
			} else {
				return this.cloneNode(true);
			}
		});

		// Copy the events from the original to the clone
		if ( events === true ) {
			cloneCopyEvent( this, ret );
			cloneCopyEvent( this.find("*"), ret.find("*") );
		}

		// Return the cloned set
		return ret;
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		// See if we can take a shortcut and just use innerHTML
		} else if ( typeof value === "string" && !rnocache.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, "<$1></$2>");

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					// Remove element nodes and prevent memory leaks
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			// If using innerHTML throws an exception, use the fallback method
			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery( this );

				self.html( value.call(this, i, self.html()) );
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value );
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			// If we're in a fragment, just use that instead of building a new one
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = jQuery.buildFragment( args, this, scripts );
			}
			
			fragment = results.fragment;
			
			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						i > 0 || results.cacheable || this.length > 1  ?
							fragment.cloneNode(true) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent(orig, ret) {
	var i = 0;

	ret.each(function() {
		if ( this.nodeName !== (orig[i] && orig[i].nodeName) ) {
			return;
		}

		var oldData = jQuery.data( orig[i++] ),
			curData = jQuery.data( this, oldData ),
			events = oldData && oldData.events;

		if ( events ) {
			delete curData.handle;
			curData.events = {};

			for ( var type in events ) {
				for ( var handler in events[ type ] ) {
					jQuery.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
				}
			}
		}
	});
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults,
		doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);

	// Only cache "small" (1/2 KB) strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	if ( args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
		!rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {

		cacheable = true;
		cacheresults = jQuery.fragments[ args[0] ];
		if ( cacheresults ) {
			if ( cacheresults !== 1 ) {
				fragment = cacheresults;
			}
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ args[0] ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;
		
		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;
			
		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = (i > 0 ? this.clone(true) : this).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}
		
			return this.pushStack( ret, name, insert.selector );
		}
	};
});

jQuery.extend({
	clean: function( elems, context, fragment, scripts ) {
		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [];

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" && !rhtml.test( elem ) ) {
				elem = context.createTextNode( elem );

			} else if ( typeof elem === "string" ) {
				// Fix "XHTML"-style tags in all browsers
				elem = elem.replace(rxhtmlTag, "<$1></$2>");

				// Trim whitespace, otherwise indexOf won't work as expected
				var tag = (rtagName.exec( elem ) || ["", ""])[1].toLowerCase(),
					wrap = wrapMap[ tag ] || wrapMap._default,
					depth = wrap[0],
					div = context.createElement("div");

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + elem + wrap[2];

				// Move to the right depth
				while ( depth-- ) {
					div = div.lastChild;
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !jQuery.support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					var hasBody = rtbody.test(elem),
						tbody = tag === "table" && !hasBody ?
							div.firstChild && div.firstChild.childNodes :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !hasBody ?
								div.childNodes :
								[];

					for ( var j = tbody.length - 1; j >= 0 ; --j ) {
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
							tbody[ j ].parentNode.removeChild( tbody[ j ] );
						}
					}

				}

				// IE completely kills leading whitespace when innerHTML is used
				if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
				}

				elem = div.childNodes;
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
				
				} else {
					if ( ret[i].nodeType === 1 ) {
						ret.splice.apply( ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},
	
	cleanData: function( elems ) {
		var data, id, cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;
		
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];
			
			if ( id ) {
				data = cache[ id ];
				
				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}
				}
				
				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}
				
				delete cache[ id ];
			}
		}
	}
});

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}




var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rdashAlpha = /-([a-z])/ig,
	rupper = /([A-Z])/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle,

	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn.css = function( name, value ) {
	// Setting 'undefined' is a no-op
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"zIndex": true,
		"fontWeight": true,
		"opacity": true,
		"zoom": true,
		"lineHeight": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			// Make sure that NaN and null values aren't set. See: #7116
			if ( typeof value === "number" && isNaN( value ) || value == null ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( typeof value === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		// Make sure that we're working with the right name
		var ret, origName = jQuery.camelCase( name ),
			hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name, origName );
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	},

	camelCase: function( string ) {
		return string.replace( rdashAlpha, fcamelCase );
	}
});

// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					val = getWH( elem, name, extra );

				} else {
					jQuery.swap( elem, cssShow, function() {
						val = getWH( elem, name, extra );
					});
				}

				if ( val <= 0 ) {
					val = curCSS( elem, name, name );

					if ( val === "0px" && currentStyle ) {
						val = currentStyle( elem, name, name );
					}

					if ( val != null ) {
						// Should return "auto" instead of 0, use 0 for
						// temporary backwards-compat
						return val === "" || val === "auto" ? "0px" : val;
					}
				}

				if ( val < 0 || val == null ) {
					val = elem.style[ name ];

					// Should return "auto" instead of 0, use 0 for
					// temporary backwards-compat
					return val === "" || val === "auto" ? "0px" : val;
				}

				return typeof val === "string" ? val : val + "px";
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				// ignore negative width and height values #1599
				value = parseFloat(value);

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
				(parseFloat(RegExp.$1) / 100) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style;

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// Set the alpha filter to set the opacity
			var opacity = jQuery.isNaN(value) ?
				"" :
				"alpha(opacity=" + value * 100 + ")",
				filter = style.filter || "";

			style.filter = ralpha.test(filter) ?
				filter.replace(ralpha, opacity) :
				style.filter + ' ' + opacity;
		}
	};
}

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, newName, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( !(defaultView = elem.ownerDocument.defaultView) ) {
			return undefined;
		}

		if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			elem.runtimeStyle.left = elem.currentStyle.left;
			style.left = name === "fontSize" ? "1em" : (ret || 0);
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			elem.runtimeStyle.left = rsLeft;
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {
	var which = name === "width" ? cssWidth : cssHeight,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight;

	if ( extra === "border" ) {
		return val;
	}

	jQuery.each( which, function() {
		if ( !extra ) {
			val -= parseFloat(jQuery.css( elem, "padding" + this )) || 0;
		}

		if ( extra === "margin" ) {
			val += parseFloat(jQuery.css( elem, "margin" + this )) || 0;

		} else {
			val -= parseFloat(jQuery.css( elem, "border" + this + "Width" )) || 0;
		}
	});

	return val;
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var jsc = jQuery.now(),
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rnoContent = /^(?:GET|HEAD)$/,
	rbracket = /\[\]$/,
	jsre = /\=\?(&|$)/,
	rquery = /\?/,
	rts = /([?&])_=[^&]*/,
	rurl = /^(\w+:)?\/\/([^\/?#]+)/,
	r20 = /%20/g,
	rhash = /#.*$/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load;

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function( res, status ) {
				// If successful, inject the HTML into all the matched elements
				if ( status === "success" || status === "notmodified" ) {
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(res.responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						res.responseText );
				}

				if ( callback ) {
					self.each( callback, [res.responseText, status, res] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param(this.serializeArray());
	},

	serializeArray: function() {
		return this.map(function() {
			return this.elements ? jQuery.makeArray(this.elements) : this;
		})
		.filter(function() {
			return this.name && !this.disabled &&
				(this.checked || rselectTextarea.test(this.nodeName) ||
					rinput.test(this.type));
		})
		.map(function( i, elem ) {
			var val = jQuery(this).val();

			return val == null ?
				null :
				jQuery.isArray(val) ?
					jQuery.map( val, function( val, i ) {
						return { name: elem.name, value: val };
					}) :
					{ name: elem.name, value: val };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function( i, o ) {
	jQuery.fn[o] = function( f ) {
		return this.bind(o, f);
	};
});

jQuery.extend({
	get: function( url, data, callback, type ) {
		// shift arguments if data argument was omited
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = null;
		}

		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},

	post: function( url, data, callback, type ) {
		// shift arguments if data argument was omited
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		url: location.href,
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		username: null,
		password: null,
		traditional: false,
		*/
		// This function can be overriden by calling jQuery.ajaxSetup
		xhr: function() {
			return new window.XMLHttpRequest();
		},
		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			script: "text/javascript, application/javascript",
			json: "application/json, text/javascript",
			text: "text/plain",
			_default: "*/*"
		}
	},

	ajax: function( origSettings ) {
		var s = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings),
			jsonp, status, data, type = s.type.toUpperCase(), noContent = rnoContent.test(type);

		s.url = s.url.replace( rhash, "" );

		// Use original (not extended) context object if it was provided
		s.context = origSettings && origSettings.context != null ? origSettings.context : s;

		// convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Handle JSONP Parameter Callbacks
		if ( s.dataType === "jsonp" ) {
			if ( type === "GET" ) {
				if ( !jsre.test( s.url ) ) {
					s.url += (rquery.test( s.url ) ? "&" : "?") + (s.jsonp || "callback") + "=?";
				}
			} else if ( !s.data || !jsre.test(s.data) ) {
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
			}
			s.dataType = "json";
		}

		// Build temporary JSONP function
		if ( s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url)) ) {
			jsonp = s.jsonpCallback || ("jsonp" + jsc++);

			// Replace the =? sequence both in the query string and the data
			if ( s.data ) {
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			}

			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			// We need to make sure
			// that a JSONP style response is executed properly
			s.dataType = "script";

			// Handle JSONP-style loading
			var customJsonp = window[ jsonp ];

			window[ jsonp ] = function( tmp ) {
				if ( jQuery.isFunction( customJsonp ) ) {
					customJsonp( tmp );

				} else {
					// Garbage collect
					window[ jsonp ] = undefined;

					try {
						delete window[ jsonp ];
					} catch( jsonpError ) {}
				}

				data = tmp;
				jQuery.handleSuccess( s, xhr, status, data );
				jQuery.handleComplete( s, xhr, status, data );
				
				if ( head ) {
					head.removeChild( script );
				}
			};
		}

		if ( s.dataType === "script" && s.cache === null ) {
			s.cache = false;
		}

		if ( s.cache === false && noContent ) {
			var ts = jQuery.now();

			// try replacing _= if it is there
			var ret = s.url.replace(rts, "$1_=" + ts);

			// if nothing was replaced, add timestamp to the end
			s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
		}

		// If data is available, append data to url for GET/HEAD requests
		if ( s.data && noContent ) {
			s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
		}

		// Watch for a new set of requests
		if ( s.global && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Matches an absolute URL, and saves the domain
		var parts = rurl.exec( s.url ),
			remote = parts && (parts[1] && parts[1].toLowerCase() !== location.protocol || parts[2].toLowerCase() !== location.host);

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( s.dataType === "script" && type === "GET" && remote ) {
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			var script = document.createElement("script");
			if ( s.scriptCharset ) {
				script.charset = s.scriptCharset;
			}
			script.src = s.url;

			// Handle Script loading
			if ( !jsonp ) {
				var done = false;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function() {
					if ( !done && (!this.readyState ||
							this.readyState === "loaded" || this.readyState === "complete") ) {
						done = true;
						jQuery.handleSuccess( s, xhr, status, data );
						jQuery.handleComplete( s, xhr, status, data );

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}
					}
				};
			}

			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			// This arises when a base node is used (#2709 and #4378).
			head.insertBefore( script, head.firstChild );

			// We handle everything using the script element injection
			return undefined;
		}

		var requestDone = false;

		// Create the request object
		var xhr = s.xhr();

		if ( !xhr ) {
			return;
		}

		// Open the socket
		// Passing null username, generates a login popup on Opera (#2865)
		if ( s.username ) {
			xhr.open(type, s.url, s.async, s.username, s.password);
		} else {
			xhr.open(type, s.url, s.async);
		}

		// Need an extra try/catch for cross domain requests in Firefox 3
		try {
			// Set content-type if data specified and content-body is valid for this type
			if ( (s.data != null && !noContent) || (origSettings && origSettings.contentType) ) {
				xhr.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[s.url] ) {
					xhr.setRequestHeader("If-Modified-Since", jQuery.lastModified[s.url]);
				}

				if ( jQuery.etag[s.url] ) {
					xhr.setRequestHeader("If-None-Match", jQuery.etag[s.url]);
				}
			}

			// Set header so the called script knows that it's an XMLHttpRequest
			// Only send the header if it's not a remote XHR
			if ( !remote ) {
				xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			}

			// Set the Accepts header for the server, depending on the dataType
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*; q=0.01" :
				s.accepts._default );
		} catch( headerError ) {}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false ) {
			// Handle the global AJAX counter
			if ( s.global && jQuery.active-- === 1 ) {
				jQuery.event.trigger( "ajaxStop" );
			}

			// close opended socket
			xhr.abort();
			return false;
		}

		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxSend", [xhr, s] );
		}

		// Wait for a response to come back
		var onreadystatechange = xhr.onreadystatechange = function( isTimeout ) {
			// The request was aborted
			if ( !xhr || xhr.readyState === 0 || isTimeout === "abort" ) {
				// Opera doesn't call onreadystatechange before this point
				// so we simulate the call
				if ( !requestDone ) {
					jQuery.handleComplete( s, xhr, status, data );
				}

				requestDone = true;
				if ( xhr ) {
					xhr.onreadystatechange = jQuery.noop;
				}

			// The transfer is complete and the data is available, or the request timed out
			} else if ( !requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout") ) {
				requestDone = true;
				xhr.onreadystatechange = jQuery.noop;

				status = isTimeout === "timeout" ?
					"timeout" :
					!jQuery.httpSuccess( xhr ) ?
						"error" :
						s.ifModified && jQuery.httpNotModified( xhr, s.url ) ?
							"notmodified" :
							"success";

				var errMsg;

				if ( status === "success" ) {
					// Watch for, and catch, XML document parse errors
					try {
						// process the data (runs the xml through httpData regardless of callback)
						data = jQuery.httpData( xhr, s.dataType, s );
					} catch( parserError ) {
						status = "parsererror";
						errMsg = parserError;
					}
				}

				// Make sure that the request was successful or notmodified
				if ( status === "success" || status === "notmodified" ) {
					// JSONP handles its own success callback
					if ( !jsonp ) {
						jQuery.handleSuccess( s, xhr, status, data );
					}
				} else {
					jQuery.handleError( s, xhr, status, errMsg );
				}

				// Fire the complete handlers
				if ( !jsonp ) {
					jQuery.handleComplete( s, xhr, status, data );
				}

				if ( isTimeout === "timeout" ) {
					xhr.abort();
				}

				// Stop memory leaks
				if ( s.async ) {
					xhr = null;
				}
			}
		};

		// Override the abort handler, if we can (IE 6 doesn't allow it, but that's OK)
		// Opera doesn't fire onreadystatechange at all on abort
		try {
			var oldAbort = xhr.abort;
			xhr.abort = function() {
				if ( xhr ) {
					// oldAbort has no call property in IE7 so
					// just do it this way, which works in all
					// browsers
					Function.prototype.call.call( oldAbort, xhr );
				}

				onreadystatechange( "abort" );
			};
		} catch( abortError ) {}

		// Timeout checker
		if ( s.async && s.timeout > 0 ) {
			setTimeout(function() {
				// Check to see if the request is still happening
				if ( xhr && !requestDone ) {
					onreadystatechange( "timeout" );
				}
			}, s.timeout);
		}

		// Send the data
		try {
			xhr.send( noContent || s.data == null ? null : s.data );

		} catch( sendError ) {
			jQuery.handleError( s, xhr, null, sendError );

			// Fire the complete handlers
			jQuery.handleComplete( s, xhr, status, data );
		}

		// firefox 1.5 doesn't fire statechange for sync requests
		if ( !s.async ) {
			onreadystatechange();
		}

		// return XMLHttpRequest to allow aborting the request etc.
		return xhr;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction(value) ? value() : value;
				s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
			};
		
		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}
		
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray(a) || a.jquery ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});
			
		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[prefix], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(r20, "+");
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray(obj) && obj.length ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});
			
	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		if ( jQuery.isEmptyObject( obj ) ) {
			add( prefix, "" );

		// Serialize object item.
		} else {
			jQuery.each( obj, function( k, v ) {
				buildParams( prefix + "[" + k + "]", v, traditional, add );
			});
		}
					
	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	handleError: function( s, xhr, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) {
			s.error.call( s.context, xhr, status, e );
		}

		// Fire the global callback
		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxError", [xhr, s, e] );
		}
	},

	handleSuccess: function( s, xhr, status, data ) {
		// If a local callback was specified, fire it and pass it the data
		if ( s.success ) {
			s.success.call( s.context, data, status, xhr );
		}

		// Fire the global callback
		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxSuccess", [xhr, s] );
		}
	},

	handleComplete: function( s, xhr, status ) {
		// Process result
		if ( s.complete ) {
			s.complete.call( s.context, xhr, status );
		}

		// The request was completed
		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxComplete", [xhr, s] );
		}

		// Handle the global AJAX counter
		if ( s.global && jQuery.active-- === 1 ) {
			jQuery.event.trigger( "ajaxStop" );
		}
	},
		
	triggerGlobal: function( s, type, args ) {
		(s.context && s.context.url == null ? jQuery(s.context) : jQuery.event).trigger(type, args);
	},

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( xhr ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return !xhr.status && location.protocol === "file:" ||
				xhr.status >= 200 && xhr.status < 300 ||
				xhr.status === 304 || xhr.status === 1223;
		} catch(e) {}

		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xhr, url ) {
		var lastModified = xhr.getResponseHeader("Last-Modified"),
			etag = xhr.getResponseHeader("Etag");

		if ( lastModified ) {
			jQuery.lastModified[url] = lastModified;
		}

		if ( etag ) {
			jQuery.etag[url] = etag;
		}

		return xhr.status === 304;
	},

	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type") || "",
			xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if ( xml && data.documentElement.nodeName === "parsererror" ) {
			jQuery.error( "parsererror" );
		}

		// Allow a pre-filtering function to sanitize the response
		// s is checked to keep backwards compatibility
		if ( s && s.dataFilter ) {
			data = s.dataFilter( data, type );
		}

		// The filter can actually parse the response
		if ( typeof data === "string" ) {
			// Get the JavaScript object, if JSON is used.
			if ( type === "json" || !type && ct.indexOf("json") >= 0 ) {
				data = jQuery.parseJSON( data );

			// If the type is "script", eval it in global context
			} else if ( type === "script" || !type && ct.indexOf("javascript") >= 0 ) {
				jQuery.globalEval( data );
			}
		}

		return data;
	}

});

/*
 * Create the request object; Microsoft failed to properly
 * implement the XMLHttpRequest in IE7 (can't request local files),
 * so we use the ActiveXObject when it is available
 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
 * we need a fallback.
 */
if ( window.ActiveXObject ) {
	jQuery.ajaxSettings.xhr = function() {
		if ( window.location.protocol !== "file:" ) {
			try {
				return new window.XMLHttpRequest();
			} catch(xhrError) {}
		}

		try {
			return new window.ActiveXObject("Microsoft.XMLHTTP");
		} catch(activeError) {}
	};
}

// Does this browser support XHR requests?
jQuery.support.ajax = !!jQuery.ajaxSettings.xhr();




var elemdisplay = {},
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)(.*)$/,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	];

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[i];
				display = elem.style.display;

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !jQuery.data(elem, "olddisplay") && display === "none" ) {
					display = elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( display === "" && jQuery.css( elem, "display" ) === "none" ) {
					jQuery.data(elem, "olddisplay", defaultDisplay(elem.nodeName));
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				elem = this[i];
				display = elem.style.display;

				if ( display === "" || display === "none" ) {
					elem.style.display = jQuery.data(elem, "olddisplay") || "";
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				var display = jQuery.css( this[i], "display" );

				if ( display !== "none" ) {
					jQuery.data( this[i], "olddisplay", display );
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				this[i].style.display = "none";
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete );
		}

		return this[ optall.queue === false ? "each" : "queue" ](function() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			var opt = jQuery.extend({}, optall), p,
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				self = this;

			for ( p in prop ) {
				var name = jQuery.camelCase( p );

				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
					p = name;
				}

				if ( prop[p] === "hide" && hidden || prop[p] === "show" && !hidden ) {
					return opt.complete.call(this);
				}

				if ( isElement && ( p === "height" || p === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height
					// animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {
						if ( !jQuery.support.inlineBlockNeedsLayout ) {
							this.style.display = "inline-block";

						} else {
							var display = defaultDisplay(this.nodeName);

							// inline-level elements accept inline-block;
							// block-level elements need to be inline with layout
							if ( display === "inline" ) {
								this.style.display = "inline-block";

							} else {
								this.style.display = "inline";
								this.style.zoom = 1;
							}
						}
					}
				}

				if ( jQuery.isArray( prop[p] ) ) {
					// Create (if needed) and add to specialEasing
					(opt.specialEasing = opt.specialEasing || {})[p] = prop[p][1];
					prop[p] = prop[p][0];
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			opt.curAnim = jQuery.extend({}, prop);

			jQuery.each( prop, function( name, val ) {
				var e = new jQuery.fx( self, opt, name );

				if ( rfxtypes.test(val) ) {
					e[ val === "toggle" ? hidden ? "show" : "hide" : val ]( prop );

				} else {
					var parts = rfxnum.exec(val),
						start = e.cur() || 0;

					if ( parts ) {
						var end = parseFloat( parts[2] ),
							unit = parts[3] || "px";

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( self, name, (end || 1) + unit);
							start = ((end || 1) / e.cur()) * start;
							jQuery.style( self, name, start + unit);
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			});

			// For JS strict compliance
			return true;
		});
	},

	stop: function( clearQueue, gotoEnd ) {
		var timers = jQuery.timers;

		if ( clearQueue ) {
			this.queue([]);
		}

		this.each(function() {
			// go in reverse order so anything added to the queue during the loop is ignored
			for ( var i = timers.length - 1; i >= 0; i-- ) {
				if ( timers[i].elem === this ) {
					if (gotoEnd) {
						// force the next step to be the last
						timers[i](true);
					}

					timers.splice(i, 1);
				}
			}
		});

		// start the next in the queue if the last step wasn't forced
		if ( !gotoEnd ) {
			this.dequeue();
		}

		return this;
	}

});

function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {
		obj[ this ] = type;
	});

	return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

		// Queueing
		opt.old = opt.complete;
		opt.complete = function() {
			if ( opt.queue !== false ) {
				jQuery(this).dequeue();
			}
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if ( !options.orig ) {
			options.orig = {};
		}
	}

});

jQuery.fx.prototype = {
	// Simple function for setting a style value
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );
	},

	// Get the current size
	cur: function() {
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
			return this.elem[ this.prop ];
		}

		var r = parseFloat( jQuery.css( this.elem, this.prop ) );
		return r && r > -10000 ? r : 0;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx;

		this.startTime = jQuery.now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		function t( gotoEnd ) {
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval(fx.tick, fx.interval);
		}
	},

	// Simple 'show' function
	show: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any
		// flash of content
		this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());

		// Start by showing the element
		jQuery( this.elem ).show();
	},

	// Simple 'hide' function
	hide: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom(this.cur(), 0);
	},

	// Each step of an animation
	step: function( gotoEnd ) {
		var t = jQuery.now(), done = true;

		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			for ( var i in this.options.curAnim ) {
				if ( this.options.curAnim[i] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				// Reset the overflow
				if ( this.options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {
					var elem = this.elem,
						options = this.options;

					jQuery.each( [ "", "X", "Y" ], function (index, value) {
						elem.style[ "overflow" + value ] = options.overflow[index];
					} );
				}

				// Hide the element if the "hide" operation was done
				if ( this.options.hide ) {
					jQuery(this.elem).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( this.options.hide || this.options.show ) {
					for ( var p in this.options.curAnim ) {
						jQuery.style( this.elem, p, this.options.orig[p] );
					}
				}

				// Execute the complete function
				this.options.complete.call( this.elem );
			}

			return false;

		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			// Perform the easing function, defaults to swing
			var specialEasing = this.options.specialEasing && this.options.specialEasing[this.prop];
			var defaultEasing = this.options.easing || (jQuery.easing.swing ? "swing" : "linear");
			this.pos = jQuery.easing[specialEasing || defaultEasing](this.state, n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			// Perform the next step of the animation
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timers = jQuery.timers;

		for ( var i = 0; i < timers.length; i++ ) {
			if ( !timers[i]() ) {
				timers.splice(i--, 1);
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

function defaultDisplay( nodeName ) {
	if ( !elemdisplay[ nodeName ] ) {
		var elem = jQuery("<" + nodeName + ">").appendTo("body"),
			display = elem.css("display");

		elem.remove();

		if ( display === "none" || display === "" ) {
			display = "block";
		}

		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

		if ( options ) { 
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		// Make sure we're not dealing with a disconnected DOM node
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box || { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = (win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop ),
			scrollLeft = (win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft),
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) { 
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		jQuery.offset.initialize();

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {
	initialize: function() {
		var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.css(body, "marginTop") ) || 0,
			html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

		jQuery.extend( container.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" } );

		container.innerHTML = html;
		body.insertBefore( container, body.firstChild );
		innerDiv = container.firstChild;
		checkDiv = innerDiv.firstChild;
		td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		checkDiv.style.position = "fixed";
		checkDiv.style.top = "20px";

		// safari subtracts parent border width here which is 5px
		this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
		checkDiv.style.position = checkDiv.style.top = "";

		innerDiv.style.overflow = "hidden";
		innerDiv.style.position = "relative";

		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);

		body.removeChild( container );
		body = container = innerDiv = checkDiv = table = td = null;
		jQuery.offset.initialize = jQuery.noop;
	},

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		jQuery.offset.initialize();

		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},
	
	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = (position === "absolute" && jQuery.inArray('auto', [curCSSTop, curCSSLeft]) > -1),
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is absolute
		if ( calculatePosition ) {
			curPosition = curElem.position();
		}

		curTop  = calculatePosition ? curPosition.top  : parseInt( curCSSTop,  10 ) || 0;
		curLeft = calculatePosition ? curPosition.left : parseInt( curCSSLeft, 10 ) || 0;

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if (options.top != null) {
			props.top = (options.top - curOffset.top) + curTop;
		}
		if (options.left != null) {
			props.left = (options.left - curOffset.left) + curLeft;
		}
		
		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({
	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function(val) {
		var elem = this[0], win;
		
		if ( !elem ) {
			return null;
		}

		if ( val !== undefined ) {
			// Set the scroll offset
			return this.each(function() {
				win = getWindow( this );

				if ( win ) {
					win.scrollTo(
						!i ? val : jQuery(win).scrollLeft(),
						 i ? val : jQuery(win).scrollTop()
					);

				} else {
					this[ method ] = val;
				}
			});
		} else {
			win = getWindow( elem );

			// Return the scroll offset
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}




// Create innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn["inner" + name] = function() {
		return this[0] ?
			parseFloat( jQuery.css( this[0], type, "padding" ) ) :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn["outer" + name] = function( margin ) {
		return this[0] ?
			parseFloat( jQuery.css( this[0], type, margin ? "margin" : "border" ) ) :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}
		
		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		if ( jQuery.isWindow( elem ) ) {
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			return elem.document.compatMode === "CSS1Compat" && elem.document.documentElement[ "client" + name ] ||
				elem.document.body[ "client" + name ];

		// Get document width or height
		} else if ( elem.nodeType === 9 ) {
			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		// Get or set width or height on the element
		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNaN( ret ) ? orig : ret;

		// Set the width or height on the element (default to pixels if value is unitless)
		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});


})(window);

/* >>>>>>>>>> BEGIN source/jquery-buffer.js */
// sc_require("jquery");
jQuery.Buffer = (function() {

  var Buffer = function(elem) {
    if (elem) this.assign(elem);

    // the internal buffer
    this._bufferedCommandList = [];
    this._bufferedCommands = {};
  };

  // the set of buffers
  Buffer._buffers = [];
  Buffer._pool = [];

  /**
    If there is already a buffer for the element, returns that. Otherwise, creates a new one.
  */
  Buffer.bufferForElement = function(elem) {
    if (elem._jquery_buffer) {
      return elem._jquery_buffer;
    }
    return this.bufferFromPool().assign(elem);
  };

  Buffer.bufferFromPool = function() {
    var buffer = null;
    if (this._pool.length === 0) {
      buffer = new Buffer();
    } else {
      buffer = this._pool.pop();
    }

    // add buffer
    Buffer._buffers.push(buffer);
    if (!this.flushingScheduled) this.scheduleFlushing();
    return buffer;
  };

  Buffer.returnToPool = function(buffer) {
    buffer.unassign();
    this._pool.push(buffer);
  };

  Buffer.scheduleFlushing = function() {
    this.flushingScheduled = true;
  };

  /**
    Flushes all of the buffers.
  */
  Buffer.flush = function() {
    // get the buffers
    var buffers = this._buffers, idx, len = buffers.length;
    for (idx = 0; idx < len; idx++) {
      buffers[idx].flush();
      this.returnToPool(buffers[idx]);
    }
    this._buffers = [];
    this.flushingScheduled = false;
  };

  /**
    Assigns an element to a buffer.
  */
  Buffer.prototype.assign = function(elem) {
    if (this._el) this.unassign();

    this._el = elem;
    this._el._jquery_buffer = this;
    return this;
  };

  Buffer.prototype.unassign = function() {
    if (!this._el) return;
    this._el._jquery_buffer = undefined;
    this._el = undefined;
    return this;
  };

  /**
    Flushes a buffer.
  */
  Buffer.prototype.flush = function() {
    var commands = this._bufferedCommandList, len = commands.length, idx, c;
    for (idx = 0; idx < len; idx++) {
      // get command name
      c = commands[idx];

      // run command
      this[c](this._bufferedCommands[c]);

      // remove from set now that we have run it.
      delete this._bufferedCommands[c];
    }

    this._bufferedCommandList.length = 0;
    this.unassign();
  };

  Buffer.prototype.$ = function(selector, context) {
    if (!context) context = this._el;
    if (selector === "" || selector === undefined) {
      selector = context; context = undefined;
    }
    return jQuery(selector, context);
  };

  /**
    Gets the buffered command, adding it to a buffer if needed.
  */
  Buffer.prototype.bufferedCommand = function(command) {
    // creates the buffered command if needed
    if (!this._bufferedCommands[command]) {
      // sets up the hash for the command
      this._bufferedCommands[command] = {};
      this._bufferedCommandList.push(command);
    }

    // return the buffered commands
    return this._bufferedCommands[command];
  };

  Buffer.prototype.hasBufferedCommand = function(command) {
    return !!this._bufferedCommands[command];
  };

  /**
    Applies HTML.
  */
  Buffer.prototype.html = function(value) {
    var context = this.bufferedCommand("flushContent");
    if (value === undefined) return context.text || context.html || this.$().html();

    context.text = undefined;
    context.html = value;
  };

  Buffer.prototype.text = function(value) {
    var context = this.bufferedCommand("flushContent");
    if (value === undefined) return context.text || context.html || this.$().text();

    context.text = value;
    context.html = undefined;
  };

  Buffer.prototype.flushContent = function(context) {
    if (context.text !== undefined) this.$().text(context.text);
    else if (context.html !== undefined) this.$().html(context.html);
  };



  /**
    Handles attribute setting.
  */
  Buffer.prototype.attr = function(key, value) {
    // first handle the key-as-object scenario
    if (typeof key === "object") {
      for (var k in key) this.attr(k, key[k]);
      return;
    }

    // now, if it is a special key, handle it specially.
    if (key === "class") {
      // note: setClass will return the value if "value" is undefined.
      if (value === undefined) return this.setClass(value).join(' ');
      else return this.setClass(value);
    } else if (key === "html") {
      return this.html(value);
    } else if (key === "text") {
      return this.text(value);
    } else if (key === 'style') {
      return this.resetStyles(value);
    }

    var context = this.bufferedCommand("flushAttributes");
    if (!context.attr) context.attr = {};
    context.attr[key] = value;
  };

  Buffer.prototype.flushAttributes = function(context) {
    var attr = context.attr, cq = this.$(), v;
    for (var key in attr) {
      if (!attr.hasOwnProperty(key)) continue;
      v = attr[key];
      if (v !== null) cq.attr(key, v);
      else cq.removeAttr(key);
    }
  };


  // 
  // SUPPORT FOR CSS STYLES
  //
  Buffer.prototype._STYLE_REGEX = /-?\s*([^:\s]+)\s*:\s*([^;]+)\s*;?/g;

  Buffer.prototype._camelizeStyleName = function(name) {
    // IE wants the first letter lowercase so we can allow normal behavior
    var needsCap = name.match(/^-(webkit|moz|o)-/),
        camelized = name.camelize();

    if (needsCap) {
      return camelized.substr(0,1).toUpperCase() + camelized.substr(1);
    } else {
      return camelized;
    }
  };

  Buffer.prototype._dasherizeStyleName = function(name) {
    var dasherized = name.dasherize();
    if (dasherized.match(/^(webkit|moz|ms|o)-/)) dasherized = '-'+dasherized;
    return dasherized;
  };

  Buffer.prototype._loadStyles = function(attr) {
    // parse style...
    if (!attr) attr = this.$().attr('style');
    
    if (attr && (attr = attr.toString()).length>0) {
      if(SC.browser.msie){ 
        attr = attr.toLowerCase();
      }
      var styles = {};
      
      var regex = this._STYLE_REGEX, match;
      regex.lastIndex = 0;
      
      while(match = regex.exec(attr)) styles[this._camelizeStyleName(match[1])] = match[2];
      
      return styles;
    } else {
      return { };
    }
  };

  Buffer.prototype.resetStyles = function(styles) {
    var context = this.bufferedCommand("flushStyles");
    context._styles = this._loadStyles(styles || " ");
  };

  Buffer.prototype.styles = function() {
    var context = this.bufferedCommand("flushStyles");
    if (!context._styles) context._styles = this._loadStyles();
    return context._styles;
  };

  Buffer.prototype.css = function(key, value) {
    if (typeof key === "object") {
      for (var k in key) this.css(k, key[k]);
      return;
    }

    var context = this.bufferedCommand("flushStyles");
    if (!context._styles) context._styles = this._loadStyles();

    context._styles[key] = value;
  };

  Buffer.prototype.flushStyles = function(context) {
    var styles = context._styles;
    var str = "";

    var key, value, props = [], idx = 0;
    for (key in styles) {
      if (!styles.hasOwnProperty(key)) continue;
      value = styles[key];
      if (value === null) continue;
      if (typeof value === "number" && key !== 'zIndex' && key !== "fontWeight" && key !== "opacity") value += "px";

      props[idx++] = this._dasherizeStyleName(key) + ": " + value;
    }

    this.$().attr("style", props.join("; "));
  };

  // 
  // SUPPORT FOR CLASS NAMES
  //
  Buffer.prototype._hashFromClassNames = function(classNames) {
    // split if needed
    if (typeof classNames === "string") classNames = classNames.split(" ");

    // and continue
    var idx, len = classNames.length, ret = {};
    for (idx = 0; idx < len; idx++) {
      ret[classNames[idx]] = true;
    }
    return ret;
  };

  Buffer.prototype.setClass = function(value, on) {
    var context = this.bufferedCommand("flushClassNames"), key;

    // if there is no value, that means we are trying to actually _get_ the class names.
    if (value === undefined) {
      if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);

      var classNames = context.classNames, v = [];
      for (key in classNames) if (key && classNames[key]) v.push(key);
      return v;
    }

    // if on is defined
    if (on !== undefined) {
      if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);
      context.classNames[value] = on || NO;
      return;
    }

    // if it is not, but we still have a string supplied (or array), we need to
    // just use that as the class names.
    if (typeof value === "string" || jQuery.isArray(value)) {
      context.classNames = this._hashFromClassNames(value);
      return;
    }

    // check value
    if (typeof value === "object") {
      // this is a hash
      if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);

      // loop over class names and set it properly.
      for (key in value) {
        context.classNames[key] = value[key];
      }
    }
  };

  Buffer.prototype.hasClass = function(className) {
    var context = this.bufferedCommand("flushClassNames");
    if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);
    return !!context.classNames[className];
  };
  
  Buffer.prototype.addClass = function(value) {
    if (!value) return;
    
    var context = this.bufferedCommand("flushClassNames");
    if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);
    
    if (typeof value === "string") value = value.split(' ');
    
    var idx, len = value.length;
    for (idx = 0; idx < len; idx++) context.classNames[value[idx].trim()] = true;
  };

  Buffer.prototype.removeClass = function(value) {
    var context = this.bufferedCommand("flushClassNames");
    if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);
    context.classNames[value] = false;
  };

  Buffer.prototype.resetClassNames = function(value) {
    var context = this.bufferedCommand("flushClassNames");
    context.classNames = {};
  };

  Buffer.prototype.flushClassNames = function(context) {
    var classNames = [];
    var c = context.classNames, k;
    for (k in c) if (c[k]) classNames.push(k)

    this.$().attr("class", classNames.join(" "));
  };


  /** DEBUGGING CODE */
  function dn(o) {
    for (var key in o) if (typeof o[key] === "function") o[key].displayName = key;
  }
  dn(Buffer);
  dn(Buffer.prototype);

  return Buffer;
})();

/* >>>>>>>>>> BEGIN source/jquery-buffered.js */
/*global Buffer */
// sc_require("jquery");
// sc_require("jquery-buffer");

(function() {

// Create Buffer Constructor
jQuery.buffer = jQuery.bufferedJQuery = function(selector, context) {
  return new jQuery.bufferedJQuery.prototype.init(selector, context);
};

// Base it on jquery
var T = function() { };
T.prototype = jQuery.fn;
jQuery.bufferedJQuery.prototype = new T();

// keep track of whether buffering is active
jQuery._isBuffering = 0;

// relay init properly
jQuery.bufferedJQuery.prototype.init = function(selector, context) {
  jQuery._isBuffering++;
  var ret = jQuery.fn.init.call(this, selector, context);
  ret.isBuffered = true;
  jQuery._isBuffering--;
  return ret;
};

// set prototype of init to the buffer prototype.
jQuery.bufferedJQuery.prototype.init.prototype = jQuery.bufferedJQuery.prototype;

/**
  Actually subclass jQuery now.
*/
var base = jQuery.fn;

jQuery.fn.extend({

  /**
    Returns an array of buffers for the elements. This is mostly here for illustration; the
    built-in buffered commands inline the logic for performance.
  */
  buffers: function() {
    var len = this.length, i, r = [];
    for (i = 0; i < len; i++) {
      r.push(jQuery.Buffer.bufferForElement(this[i]));
    }
    return r;
  }

});

/*
  Replace jQuery's find() to make the results buffered.
*/
jQuery.fn._jqb_originalFind = jQuery.fn.find;
jQuery.fn.find = function(selector) {
  // if we are not currently buffering, don't bother with this crap.
  if (jQuery._isBuffering <= 0 && !this.isBuffered) return jQuery.fn._jqb_originalFind.call(this, selector);

	var ret = jQuery.buffer(), length = 0;

	for ( var i = 0, l = this.length; i < l; i++ ) {
		length = ret.length;
		jQuery.find( selector, this[i], ret );

		if ( i > 0 ) {
			// Make sure that the results are unique
			for ( var n = length; n < ret.length; n++ ) {
				for ( var r = 0; r < length; r++ ) {
					if ( ret[r] === ret[n] ) {
						ret.splice(n--, 1);
						break;
					}
				}
			}
		}
	}

	return ret;
};

jQuery.extend(jQuery.bufferedJQuery.prototype, {

  html: function(value) {
    // if there is no value, we don't handle it.
    if (value === undefined) {
      if (this.length < 1) return undefined;
      return jQuery.Buffer.bufferForElement(this[i]).html();
    }

    // there is a vlaue. We are going to do it like jquery, but different.
    // in this, we inline "buffers" above
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.html(value);
    }
    return this;
  },

  text: function(value) {
    if (value === undefined) {
      if (this.length < 1) return undefined;
      return jQuery.Buffer.bufferForElement(this[i]).text();
    }

    // there is a vlaue. We are going to do it like jquery, but different.
    // in this, we inline "buffers" above
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.text(value);
    }
    return this;
  },

  attr: function(key, value) {
    // first, handle the get-case
    if (typeof value === "undefined" && typeof key === "string") {
      if (this.length < 1) return false;
      var buffer = jQuery.Buffer.bufferForElement(this[0]);
      return buffer.attr(key);
    }

    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.attr(key, value);
    }
    return this;
  },

  hasClass: function(className) {
    if (this.length < 1) return false;
    return jQuery.Buffer.bufferForElement(this[0]).hasClass(className);
  },
  
  setClass: function(value, on) {
    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.setClass(value, on);
    }
    return this;
  },

  addClass: function(value) {
    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.addClass(value);
    }
    return this;
  },

  removeClass: function(value) {
    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.removeClass(value);
    }
    return this;
  },

  resetClassNames: function() {
    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.resetClassNames();
    }
    return this;
  },

  css: function(key, value) {
    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.css(key, value);
    }
    return this;
  },

  styles: function() {
    if (this.length < 1) return null;
    return jQuery.Buffer.bufferForElement(this[0]).styles();
  },

  resetStyles: function() {
    if (this.length < 1) return null;
    jQuery.Buffer.bufferForElement(this[0]).resetStyles();
    return this;
  }

});



})();

/* >>>>>>>>>> BEGIN source/jquery-sc.js */
// sc_require("jquery-buffer");
jQuery.Buffer.scheduleFlushing = function() {
  SC.RunLoop.currentRunLoop.invokeOnce(function() {
    jQuery.Buffer.flush()
  });
  this.flushingScheduled = true;
};


/* >>>>>>>>>> BEGIN javascript.js */
/* >>>>>>>>>> BEGIN source/license.js */
/**
 * @license
 * ==========================================================================
 * SproutCore Costello -- Property Observing Library
 * Copyright ©2006-2011, Strobe Inc. and contributors.
 * Portions copyright ©2008-2010 Apple Inc. All rights reserved.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 * For more information about SproutCore, visit http://www.sproutcore.com
 * 
 * ==========================================================================
 */

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*global NodeList */
// These commands are used by the build tools to control load order.  On the
// client side these are a no-op.
var require = require || function require() { } ;
var sc_require = sc_require || require;
var sc_resource = sc_resource || function sc_resource() {};
sc_require('license') ;

// ........................................
// GLOBAL CONSTANTS
//
// Most global constants should be defined inside of the SC namespace.
// However the following two are useful enough and generally benign enough
// to put into the global object.
var YES = true ;
var NO = false ;

// prevent a console.log from blowing things up if we are on a browser that
// does not support it
if (typeof console === 'undefined') {
  window.console = {} ;
  console.log = console.info = console.warn = console.error = function(){};
}

// ........................................
// BOOTSTRAP
//
// The root namespace and some common utility methods are defined here. The
// rest of the methods go into the mixin defined below.

/**
  @version 1.5.0.pre.3
  @namespace

  The SproutCore namespace.  All SproutCore methods and functions are defined
  inside of this namespace.  You generally should not add new properties to
  this namespace as it may be overwritten by future versions of SproutCore.

  You can also use the shorthand "SC" instead of "SproutCore".

  SproutCore-Base is a framework that provides core functions for SproutCore
  including cross-platform functions, support for property observing and
  objects.  It's focus is on small size and performance.  You can use this
  in place of or along-side other cross-platform libraries such as jQuery or
  Prototype.

  The core Base framework is based on the jQuery API with a number of
  performance optimizations.
*/
var SC = SC || {} ;
var SproutCore = SproutCore || SC ;

SC.VERSION = '1.5.0.pre.3';

/**
  @private

  Adds properties to a target object. You must specify whether
  to overwrite a value for a property or not.

  Used as a base function for the wrapper functions SC.mixin and SC.supplement.

  @param overwrite {Boolean} if a target has a value for a property, this specifies
                  whether or not to overwrite that value with the copyied object's
                  property value.
  @param target {Object} the target object to extend
  @param properties {Object} one or more objects with properties to copy.
  @returns {Object} the target object.
  @static
*/
SC._baseMixin = function (override) {
  var args = Array.prototype.slice.call(arguments, 1), src,
  // copy reference to target object
      target = args[0] || {},
      idx = 1,
      length = args.length ,
      options, copy , key;

  // Handle case where we have only one item...extend SC
  if (length === 1) {
    target = this || {};
    idx=0;
  }

  for ( ; idx < length; idx++ ) {
    if (!(options = args[idx])) continue ;
    for(key in options) {
      if (!options.hasOwnProperty(key)) continue ;
      copy = options[key] ;
      if (target===copy) continue ; // prevent never-ending loop
      if (copy !== undefined && ( override || (target[key] === undefined) )) target[key] = copy ;
    }
  }

  return target;
} ;

/**
  Adds properties to a target object.

  Takes the root object and adds the attributes for any additional
  arguments passed.

  @param target {Object} the target object to extend
  @param properties {Object} one or more objects with properties to copy.
  @returns {Object} the target object.
  @static
*/
SC.mixin = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(true);
  return SC._baseMixin.apply(this, args);
} ;

/**
  Adds properties to a target object.  Unlike SC.mixin, however, if the target
  already has a value for a property, it will not be overwritten.

  Takes the root object and adds the attributes for any additional
  arguments passed.

  @param target {Object} the target object to extend
  @param properties {Object} one or more objects with properties to copy.
  @returns {Object} the target object.
  @static
*/
SC.supplement = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(false);
  return SC._baseMixin.apply(this, args);
} ;

/**
  Alternative to mixin.  Provided for compatibility with jQuery.
  @function
*/
SC.extend = SC.mixin ;

// ..........................................................
// CORE FUNCTIONS
//
// Enough with the bootstrap code.  Let's define some core functions

SC.mixin(/** @scope SC */ {

  // ........................................
  // GLOBAL CONSTANTS
  //
  T_ERROR:     'error',
  T_OBJECT:    'object',
  T_NULL:      'null',
  T_CLASS:     'class',
  T_HASH:      'hash',
  T_FUNCTION:  'function',
  T_UNDEFINED: 'undefined',
  T_NUMBER:    'number',
  T_BOOL:      'boolean',
  T_ARRAY:     'array',
  T_STRING:    'string',

  // ........................................
  // TYPING & ARRAY MESSAGING
  //

  /**
    Returns a consistant type for the passed item.

    Use this instead of the built-in typeOf() to get the type of an item.
    It will return the same result across all browsers and includes a bit
    more detail.  Here is what will be returned:

    | Return Value Constant | Meaning |
    | SC.T_STRING | String primitive |
    | SC.T_NUMBER | Number primitive |
    | SC.T_BOOLEAN | Boolean primitive |
    | SC.T_NULL | Null value |
    | SC.T_UNDEFINED | Undefined value |
    | SC.T_FUNCTION | A function |
    | SC.T_ARRAY | An instance of Array |
    | SC.T_CLASS | A SproutCore class (created using SC.Object.extend()) |
    | SC.T_OBJECT | A SproutCore object instance |
    | SC.T_HASH | A JavaScript object not inheriting from SC.Object |

    @param item {Object} the item to check
    @returns {String} the type
  */
  typeOf: function(item) {
    if (item === undefined) return SC.T_UNDEFINED ;
    if (item === null) return SC.T_NULL ;

    var nativeType = jQuery.type(item);

    if (nativeType === "function") {
      return item.isClass ? SC.T_CLASS : SC.T_FUNCTION
    } else if (nativeType === "object") {
      if (item.isError) {
        return SC.T_ERROR ;
      } else if (item.isObject) {
        return SC.T_OBJECT ;
      } else {
        return SC.T_HASH ;
      }
    }

    return nativeType ;
  },

  /**
    Returns YES if the passed value is null or undefined.  This avoids errors
    from JSLint complaining about use of ==, which can be technically
    confusing.

    @param {Object} obj value to test
    @returns {Boolean}
  */
  none: function(obj) {
    return obj == null;
  },

  /**
    Verifies that a value is either null or an empty string. Return false if
    the object is not a string.

    @param {Object} obj value to test
    @returns {Boolean}
  */
  empty: function(obj) {
    return obj === null || obj === undefined || obj === '';
  },

  /**
    Returns YES if the passed object is an array or Array-like.

    SproutCore Array Protocol:
    * the object has an objectAt property; or
    * the object is a native Array; or
    * the object is an Object, and has a length property

    Unlike SC.typeOf this method returns true even if the passed object is
    not formally array but appears to be array-like (i.e. has a length
    property, responds to .objectAt, etc.)

    @param obj {Object} the object to test
    @returns {Boolean}
  */
  isArray: function(obj) {
    if ( !obj || obj.setInterval ) {
      return false;
    } else if ( obj.objectAt ) {
      return true ;
    } else if ( obj.length && jQuery.type(obj) === "object" ) {
      return true
    }

    return false;
  },

  /**
    Makes an object into an Array if it is not array or array-like already.
    Unlike SC.A(), this method will not clone the object if it is already
    an array.

    @param {Object} obj object to convert
    @returns {Array} Actual array
  */
  makeArray: function(obj) {
    return SC.isArray(obj) ? obj : SC.A(obj);
  },

  /**
    Converts the passed object to an Array.  If the object appears to be
    array-like, a new array will be cloned from it.  Otherwise, a new array
    will be created with the item itself as the only item in the array.

    @param object {Object} any enumerable or array-like object.
    @returns {Array} Array of items
  */
  A: function(obj) {
    // null or undefined -- fast path
    if ( obj === null || obj === undefined ) return [] ;

    // primitive -- fast path
    if ( obj.slice instanceof Function ) {
      // do we have a string?
      if ( typeof(obj) === 'string' ) return [obj] ;
      else return obj.slice() ;
    }

    // enumerable -- fast path
    if (obj.toArray) return obj.toArray() ;

    // if not array-like, then just wrap in array.
    if (!SC.isArray(obj)) return [obj];

    // when all else fails, do a manual convert...
    var ret = [], len = obj.length;
    while(--len >= 0) ret[len] = obj[len];
    return ret ;
  },

  //
  // GUIDS & HASHES
  //

  guidKey: jQuery.expando,

  // Used for guid generation...
  _guidPrefixes: {"number": "nu", "string": "st"},
  _guidCaches:   {"number": {},   "string": {}},
  _numberGuids: [], _stringGuids: {}, _keyCache: {},

  /**"
    Returns a unique GUID for the object.  If the object does not yet have
    a guid, one will be assigned to it.  You can call this on any object,
    SC.Object-based or not, but be aware that it will add a _guid property.

    You can also use this method on DOM Element objects.

    @param obj {Object} any object, string, number, Element, or primitive
    @returns {String} the unique guid for this instance.
  */
  guidFor: function(obj) {

    // special cases where we don't want to add a key to object
    if (obj === undefined) return "(undefined)";
    if (obj === null) return "(null)";

    var type = typeof obj;

    // Don't allow prototype changes to String etc. to change the guidFor
    if (type === SC.T_NUMBER || type === SC.T_STRING) {
      cache = this._guidCaches[type];
      ret   = cache[obj];
      if(!ret) {
        ret        = "st" + (jQuery.uuid++);
        cache[obj] = ret;
      }
      return ret;
    } else if (type === SC.T_BOOL) {
      return (obj) ? "(true)" : "(false)"
    }

    var guidKey = this.guidKey;
    if (obj[guidKey]) return obj[guidKey];

    // More special cases; not as common, so we check for them after the cache
    // lookup
    if (obj === Object) return '(Object)';
    if (obj === Array) return '(Array)';

    var cache, ret;
    var type = typeof obj;

    return SC.generateGuid(obj, "sc");
  },

  /**
    Returns a key name that combines the named key + prefix.  This is more
    efficient than simply combining strings because it uses a cache
    internally for performance.

    @param {String} prefix the prefix to attach to the key
    @param {String} key key
    @returns {String} result
  */
  keyFor: function(prefix, key) {
    var ret, pcache = this._keyCache[prefix];
    if (!pcache) pcache = this._keyCache[prefix] = {}; // get cache for prefix
    ret = pcache[key];
    if (!ret) ret = pcache[key] = prefix + '_' + key ;
    return ret ;
  },

  /**
    Generates a new guid, optionally saving the guid to the object that you
    pass in.  You will rarely need to use this method.  Instead you should
    call SC.guidFor(obj), which return an existing guid if available.

    @param {Object} obj the object to assign the guid to
    @returns {String} the guid
  */
  generateGuid: function(obj, prefix) {
    var ret = (prefix + (jQuery.uuid++));
    if (obj) obj[this.guidKey] = ret ;
    return ret ;
  },

  /**
    Returns a unique hash code for the object. If the object implements
    a hash() method, the value of that method will be returned. Otherwise,
    this will return the same value as guidFor().

    If you pass multiple arguments, hashFor returns a string obtained by
    concatenating the hash code of each argument.

    Unlike guidFor(), this method allows you to implement logic in your
    code to cause two separate instances of the same object to be treated as
    if they were equal for comparisons and other functions.

    IMPORTANT: If you implement a hash() method, it MUST NOT return a
    number or a string that contains only a number. Typically hash codes
    are strings that begin with a "%".

    @param obj {Object} the object(s)
    @returns {String} the hash code for this instance.
  */
  hashFor: function() {
    var l = arguments.length,
        h = '',
        obj, f, i;

    for (i=0 ; i<l; ++i) {
      obj = arguments[i];
      h += (obj && (f = obj.hash) && (typeof f === SC.T_FUNCTION)) ? f.call(obj) : this.guidFor(obj);
    }

    return h === '' ? null : h;
  },

  /**
    This will compare the two object values using their hash codes.

    @param a {Object} first value to compare
    @param b {Object} the second value to compare
    @returns {Boolean} YES if the two have equal hash code values.

  */
  isEqual: function(a,b) {
    // QUESTION: is there a compelling performance reason to special-case
    // undefined here?
    return this.hashFor(a) === this.hashFor(b) ;
  },

  /**
   This will compare two javascript values of possibly different types.
   It will tell you which one is greater than the other by returning
   -1 if the first is smaller than the second,
    0 if both are equal,
    1 if the first is greater than the second.

   The order is calculated based on SC.ORDER_DEFINITION , if types are different.
   In case they have the same type an appropriate comparison for this type is made.

   @param v {Object} first value to compare
   @param w {Object} the second value to compare
   @returns {NUMBER} -1 if v < w, 0 if v = w and 1 if v > w.

  */
  compare: function (v, w) {
    // Doing a '===' check is very cheap, so in the case of equality, checking
    // this up-front is a big win.
    if (v === w) return 0;

    var type1 = SC.typeOf(v);
    var type2 = SC.typeOf(w);

    // If we haven't yet generated a reverse-mapping of SC.ORDER_DEFINITION,
    // do so now.
    var mapping = SC.ORDER_DEFINITION_MAPPING;
    if (!mapping) {
      var order = SC.ORDER_DEFINITION;
      mapping = SC.ORDER_DEFINITION_MAPPING = {};
      var idx, len;
      for (idx = 0, len = order.length;  idx < len;  ++idx) {
        mapping[order[idx]] = idx;
      }

      // We no longer need SC.ORDER_DEFINITION.
      delete SC.ORDER_DEFINITION;
    }

    var type1Index = mapping[type1];
    var type2Index = mapping[type2];

    if (type1Index < type2Index) return -1;
    if (type1Index > type2Index) return 1;

    // ok - types are equal - so we have to check values now
    switch (type1) {
      case SC.T_BOOL:
      case SC.T_NUMBER:
        if (v<w) return -1;
        if (v>w) return 1;
        return 0;

      case SC.T_STRING:
        var comp = v.localeCompare(w);
        if (comp<0) return -1;
        if (comp>0) return 1;
        return 0;

      case SC.T_ARRAY:
        var vLen = v.length;
        var wLen = w.length;
        var l = Math.min(vLen, wLen);
        var r = 0;
        var i = 0;
        var thisFunc = arguments.callee;
        while (r===0 && i < l) {
          r = thisFunc(v[i],w[i]);
          i++;
        }
        if (r !== 0) return r;

        // all elements are equal now
        // shorter array should be ordered first
        if (vLen < wLen) return -1;
        if (vLen > wLen) return 1;
        // arrays are equal now
        return 0;

      case SC.T_OBJECT:
        if (v.constructor.isComparable === YES) return v.constructor.compare(v, w);
        return 0;

      default:
        return 0;
    }
  },

  // ..........................................................
  // OBJECT MANAGEMENT
  //

  /**
    Empty function.  Useful for some operations.

    @returns {Object}
  */
  K: function() { return this; },

  /**
    Empty array.  Useful for some optimizations.

    @property {Array}
  */
  EMPTY_ARRAY: [],

  /**
    Empty hash.  Useful for some optimizations.

    @property {Hash}
  */
  EMPTY_HASH: {},

  /**
    Empty range. Useful for some optimizations.

    @property {Range}
  */
  EMPTY_RANGE: {start: 0, length: 0},

  /**
    Creates a new object with the passed object as its prototype.

    This method uses JavaScript's native inheritence method to create a new
    object.

    You cannot use beget() to create new SC.Object-based objects, but you
    can use it to beget Arrays, Hashes, Sets and objects you build yourself.
    Note that when you beget() a new object, this method will also call the
    didBeget() method on the object you passed in if it is defined.  You can
    use this method to perform any other setup needed.

    In general, you will not use beget() often as SC.Object is much more
    useful, but for certain rare algorithms, this method can be very useful.

    For more information on using beget(), see the section on beget() in
    Crockford's JavaScript: The Good Parts.

    @param obj {Object} the object to beget
    @returns {Object} the new object.
  */
  beget: function(obj) {
    if (obj === null || obj === undefined) return null ;
    var K = SC.K; K.prototype = obj ;
    var ret = new K();
    K.prototype = null ; // avoid leaks
    if (typeof obj.didBeget === "function") ret = obj.didBeget(ret);
    return ret ;
  },

  /**
    Creates a clone of the passed object.  This function can take just about
    any type of object and create a clone of it, including primitive values
    (which are not actually cloned because they are immutable).

    If the passed object implements the clone() method, then this function
    will simply call that method and return the result.

    @param object {Object} the object to clone
    @param deep {Boolean} if true, a deep copy of the object is made
    @returns {Object} the cloned object
  */
  copy: function(object, deep) {
    var ret = object, idx ;

    // fast paths
    if ( object ) {
      if ( object.isCopyable ) return object.copy( deep );
      if ( object.clone )      return object.clone();
    }

    switch ( jQuery.type(object) ) {
    case "array":
      ret = object.slice();

      if ( deep ) {
        idx = ret.length;
        while ( idx-- ) { ret[idx] = SC.copy( ret[idx], true ); }
        break ;
      }

    case "object":
      ret = {} ;
      for(var key in object) { ret[key] = deep ? SC.copy(object[key], true) : object[key] ; }
    }

    return ret ;
  },

  /**
    Returns a new object combining the values of all passed hashes.

    @param object {Object} one or more objects
    @returns {Object} new Object
  */
  merge: function() {
    var ret = {}, len = arguments.length, idx;
    for(idx=0; idx<len; idx++) SC.mixin(ret, arguments[idx]);
    return ret ;
  },

  /**
    Returns all of the keys defined on an object or hash.  This is useful
    when inspecting objects for debugging.

    @param {Object} obj
    @returns {Array} array of keys
  */
  keys: function(obj) {
    var ret = [];
    for(var key in obj) ret.push(key);
    return ret;
  },

  /**
    Convenience method to inspect an object.  This method will attempt to
    convert the object into a useful string description.
  */
  inspect: function(obj) {
    var v, ret = [] ;
    for(var key in obj) {
      v = obj[key] ;
      if (v === 'toString') continue ; // ignore useless items
      if (SC.typeOf(v) === SC.T_FUNCTION) v = "function() { ... }" ;
      ret.push(key + ": " + v) ;
    }
    return "{" + ret.join(" , ") + "}" ;
  },

  /**
    Returns a tuple containing the object and key for the specified property
    path.  If no object could be found to match the property path, then
    returns null.

    This is the standard method used throughout SproutCore to resolve property
    paths.

    @param path {String} the property path
    @param root {Object} optional parameter specifying the place to start
    @returns {Array} array with [object, property] if found or null
  */
  tupleForPropertyPath: function(path, root) {

    // if the passed path is itself a tuple, return it
    if (typeof path === "object" && (path instanceof Array)) return path ;

    // find the key.  It is the last . or first *
    var key ;
    var stopAt = path.indexOf('*') ;
    if (stopAt < 0) stopAt = path.lastIndexOf('.') ;
    key = (stopAt >= 0) ? path.slice(stopAt+1) : path ;

    // convert path to object.
    var obj = this.objectForPropertyPath(path, root, stopAt) ;
    return (obj && key) ? [obj,key] : null ;
  },

  /**
    Finds the object for the passed path or array of path components.  This is
    the standard method used in SproutCore to traverse object paths.

    @param path {String} the path
    @param root {Object} optional root object.  window is used otherwise
    @param stopAt {Integer} optional point to stop searching the path.
    @returns {Object} the found object or undefined.
  */
  objectForPropertyPath: function(path, root, stopAt) {

    var loc, nextDotAt, key, max ;

    if (!root) root = window ;

    // faster method for strings
    if (SC.typeOf(path) === SC.T_STRING) {
      if (stopAt === undefined) stopAt = path.length ;
      loc = 0 ;
      while((root) && (loc < stopAt)) {
        nextDotAt = path.indexOf('.', loc) ;
        if ((nextDotAt < 0) || (nextDotAt > stopAt)) nextDotAt = stopAt;
        key = path.slice(loc, nextDotAt);
        root = root.get ? root.get(key) : root[key] ;
        loc = nextDotAt+1;
      }
      if (loc < stopAt) root = undefined; // hit a dead end. :(

    // older method using an array
    } else {

      loc = 0; max = path.length; key = null;
      while((loc < max) && root) {
        key = path[loc++];
        if (key) root = (root.get) ? root.get(key) : root[key] ;
      }
      if (loc < max) root = undefined ;
    }

    return root ;
  },


  // ..........................................................
  // LOCALIZATION SUPPORT
  //

  /**
    Known loc strings

    @property {Hash}
  */
  STRINGS: {},

  /**
    This is a simplified handler for installing a bunch of strings.  This
    ignores the language name and simply applies the passed strings hash.

    @param {String} lang the language the strings are for
    @param {Hash} strings hash of strings
    @returns {SC} receiver
  */
  stringsFor: function(lang, strings) {
    SC.mixin(SC.STRINGS, strings);
    return this ;
  }


}); // end mixin

/** @private Aliasn for SC.clone() */
SC.clone = SC.copy ;

/** @private Alias for SC.A() */
SC.$A = SC.A;

/** @private Provided for compatibility with old HTML templates. */
SC.didLoad = SC.K ;

/** @private Used by SC.compare */
SC.ORDER_DEFINITION = [ SC.T_ERROR,
                        SC.T_UNDEFINED,
                        SC.T_NULL,
                        SC.T_BOOL,
                        SC.T_NUMBER,
                        SC.T_STRING,
                        SC.T_ARRAY,
                        SC.T_HASH,
                        SC.T_OBJECT,
                        SC.T_FUNCTION,
                        SC.T_CLASS ];


// ........................................
// FUNCTION ENHANCEMENTS
//

SC.Function = {
  property: function(fn, keys) {
    fn.dependentKeys = SC.$A(keys) ;
    var guid = SC.guidFor(fn) ;
    fn.cacheKey = "__cache__" + guid ;
    fn.lastSetValueKey = "__lastValue__" + guid ;
    fn.isProperty = true ;
    return fn ;
  },

  cacheable: function(fn, aFlag) {
    fn.isProperty = true ;  // also make a property just in case
    if (!fn.dependentKeys) fn.dependentKeys = [] ;
    fn.isCacheable = (aFlag === undefined) ? true : aFlag ;
    return fn ;
  },

  idempotent: function(fn, aFlag) {
    fn.isProperty = true;  // also make a property just in case
    if (!fn.dependentKeys) this.dependentKeys = [] ;
    fn.isVolatile = (aFlag === undefined) ? true : aFlag ;
    return fn ;
  },

  observes: function(fn, propertyPaths) {
    // sort property paths into local paths (i.e just a property name) and
    // full paths (i.e. those with a . or * in them)
    var loc = propertyPaths.length, local = null, paths = null ;
    while(--loc >= 0) {
      var path = propertyPaths[loc] ;
      // local
      if ((path.indexOf('.')<0) && (path.indexOf('*')<0)) {
        if (!local) local = fn.localPropertyPaths = [] ;
        local.push(path);

      // regular
      } else {
        if (!paths) paths = fn.propertyPaths = [] ;
        paths.push(path) ;
      }
    }
    return fn ;
  }

}

SC.mixin(Function.prototype,
/** @lends Function.prototype */ {

  /**
    Indicates that the function should be treated as a computed property.

    Computed properties are methods that you want to treat as if they were
    static properties.  When you use get() or set() on a computed property,
    the object will call the property method and return its value instead of
    returning the method itself.  This makes it easy to create "virtual
    properties" that are computed dynamically from other properties.

    Consider the following example:

    {{{
      contact = SC.Object.create({

        firstName: "Charles",
        lastName: "Jolley",

        // This is a computed property!
        fullName: function() {
          return this.getEach('firstName','lastName').compact().join(' ') ;
        }.property('firstName', 'lastName'),

        // this is not
        getFullName: function() {
          return this.getEach('firstName','lastName').compact().join(' ') ;
        }
      });

      contact.get('firstName') ;
      --> "Charles"

      contact.get('fullName') ;
      --> "Charles Jolley"

      contact.get('getFullName') ;
      --> function()
    }}}

    Note that when you get the fullName property, SproutCore will call the
    fullName() function and return its value whereas when you get() a property
    that contains a regular method (such as getFullName above), then the
    function itself will be returned instead.

    h2. Using Dependent Keys

    Computed properties are often computed dynamically from other member
    properties.  Whenever those properties change, you need to notify any
    object that is observing the computed property that the computed property
    has changed also.  We call these properties the computed property is based
    upon "dependent keys".

    For example, in the contact object above, the fullName property depends on
    the firstName and lastName property.  If either property value changes,
    any observer watching the fullName property will need to be notified as
    well.

    You inform SproutCore of these dependent keys by passing the key names
    as parameters to the property() function.  Whenever the value of any key
    you name here changes, the computed property will be marked as changed
    also.

    You should always register dependent keys for computed properties to
    ensure they update.

    h2. Using Computed Properties as Setters

    Computed properties can be used to modify the state of an object as well
    as to return a value.  Unlike many other key-value system, you use the
    same method to both get and set values on a computed property.  To
    write a setter, simply declare two extra parameters: key and value.

    Whenever your property function is called as a setter, the value
    parameter will be set.  Whenever your property is called as a getter the
    value parameter will be undefined.

    For example, the following object will split any full name that you set
    into a first name and last name components and save them.

    {{{
      contact = SC.Object.create({

        fullName: function(key, value) {
          if (value !== undefined) {
            var parts = value.split(' ') ;
            this.beginPropertyChanges()
              .set('firstName', parts[0])
              .set('lastName', parts[1])
            .endPropertyChanges() ;
          }
          return this.getEach('firstName', 'lastName').compact().join(' ');
        }.property('firstName','lastName')

      }) ;

    }}}

    h2. Why Use The Same Method for Getters and Setters?

    Most property-based frameworks expect you to write two methods for each
    property but SproutCore only uses one. We do this because most of the time
    when you write a setter is is basically a getter plus some extra work.
    There is little added benefit in writing both methods when you can
    conditionally exclude part of it. This helps to keep your code more
    compact and easier to maintain.

    @param dependentKeys {String...} optional set of dependent keys
    @returns {Function} the declared function instance
  */
  property: function() {
    return SC.Function.property(this, arguments)
  },

  /**
    You can call this method on a computed property to indicate that the
    property is cacheable (or not cacheable).  By default all computed
    properties are not cached.  Enabling this feature will allow SproutCore
    to cache the return value of your computed property and to use that
    value until one of your dependent properties changes or until you
    invoke propertyDidChange() and name the computed property itself.

    If you do not specify this option, computed properties are assumed to be
    not cacheable.

    @param {Boolean} aFlag optionally indicate cacheable or no, default YES
    @returns {Function} reciever
  */
  cacheable: function(aFlag) {
    return SC.Function.cacheable(this, aFlag);
  },

  /**
    Indicates that the computed property is volatile.  Normally SproutCore
    assumes that your computed property is idempotent.  That is, calling
    set() on your property more than once with the same value has the same
    effect as calling it only once.

    All non-computed properties are idempotent and normally you should make
    your computed properties behave the same way.  However, if you need to
    make your property change its return value everytime your method is
    called, you may chain this to your property to make it volatile.

    If you do not specify this option, properties are assumed to be
    non-volatile.

    @param {Boolean} aFlag optionally indicate state, default to YES
    @returns {Function} receiver
  */
  idempotent: function(aFlag) {
    return SC.Function.idempotent(this, aFlag)
  },

  /**
    Declare that a function should observe an object at the named path.  Note
    that the path is used only to construct the observation one time.

    @returns {Function} receiver
  */
  observes: function(propertyPaths) {
    return SC.Function.observes(this, arguments);
  }

});

SC.CoreString = {
  fmt: function(str, formats) {
    // first, replace any ORDERED replacements.
    var idx  = 0; // the current index for non-numerical replacements
    return str.replace(/%@([0-9]+)?/g, function(s, argIndex) {
      argIndex = (argIndex) ? parseInt(argIndex,0) - 1 : idx++ ;
      s = formats[argIndex];
      return ((s === null) ? '(null)' : (s === undefined) ? '' : s).toString();
    }) ;
  },
  loc: function(str, formats) {
    var str = SC.STRINGS[str] || str;
    return SC.String.fmt(str, arguments) ;
  },
  w: function(str) {
    var ary = [], ary2 = str.split(' '), len = ary2.length, string, idx=0;
    for (idx=0; idx<len; ++idx) {
      string = ary2[idx] ;
      if (string.length !== 0) ary.push(string) ; // skip empty strings
    }
    return ary ;
  }
}

SC.mixin(String.prototype,
/** @lends Function.prototype */ {

  // ..........................................................
  // STRING ENHANCEMENT
  //

  // Interpolate string. looks for %@ or %@1; to control the order of params.
  /**
    Apply formatting options to the string.  This will look for occurrences
    of %@ in your string and substitute them with the arguments you pass into
    this method.  If you want to control the specific order of replacement,
    you can add a number after the key as well to indicate which argument
    you want to insert.

    Ordered insertions are most useful when building loc strings where values
    you need to insert may appear in different orders.

    h3. Examples

    {{{
      "Hello %@ %@".fmt('John', 'Doe') => "Hello John Doe"
      "Hello %@2, %@1".fmt('John', 'Doe') => "Hello Doe, John"
    }}}

    @param args {Object...} optional arguments
    @returns {String} formatted string
  */
  fmt: function() {
    return SC.CoreString.fmt(this, arguments);
  },

  /**
    Localizes the string.  This will look up the reciever string as a key
    in the current Strings hash.  If the key matches, the loc'd value will be
    used.  The resulting string will also be passed through fmt() to insert
    any variables.

    @param args {Object...} optional arguments to interpolate also
    @returns {String} the localized and formatted string.
  */
  loc: function() {
    return SC.CoreString.loc(this, arguments);
  },



  /**
    Splits the string into words, separated by spaces. Empty strings are
    removed from the results.

    @returns {Array} an array of non-empty strings
  */
  w: function() {
    return SC.CoreString.w(this);
  }
});

//
// DATE ENHANCEMENT
//
if (!Date.now) {
  Date.now = function() {
    return new Date().getTime() ;
  };
}


/* >>>>>>>>>> BEGIN source/private/observer_set.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

// ........................................................................
// ObserverSet
//

/**
  @namespace

  This private class is used to store information about obversers on a
  particular key.  Note that this object is not observable.  You create new
  instances by calling SC.beget(SC.ObserverSet) ;

  @since SproutCore 1.0
*/
SC.ObserverSet = {

  /**
    Adds the named target/method observer to the set.  The method must be
    a function, not a string.

    Note that in debugging mode only, this method is overridden to also record
    the name of the object and function that resulted in the target/method
    being added.
  */
  add: function(target, method, context) {
    var targetGuid = SC.guidFor(target), methodGuid = SC.guidFor(method);
    var targets = this._members, members = this.members;

    // get the set of methods
    var indexes = targets[targetGuid];
    if ( !indexes ) indexes = targets[targetGuid] = {};

    if (indexes[methodGuid] === undefined) indexes[methodGuid] = members.length;
    else return;

    members.push([target, method, context]);
  },

  /**
    removes the named target/method observer from the set.  If this is the
    last method for the named target, then the number of targets will also
    be reduced.

    returns YES if the items was removed, NO if it was not found.
  */
  remove: function(target, method) {
    var targetGuid = SC.guidFor(target), methodGuid = SC.guidFor(method);
    var indexes = this._members[targetGuid], members = this.members;

    if( !indexes ) return false;

    var index = indexes[methodGuid];
    if ( index === undefined) return false;

    if (index !== members.length - 1) {
      var entry = (members[index] = members[members.length - 1]);
      this._members[SC.guidFor(entry[0])][SC.guidFor(entry[1])] = index;
    }

    members.pop();
    delete this._members[targetGuid][methodGuid];

    return true;
  },

  /**
    Invokes the target/method pairs in the receiver.  Used by SC.RunLoop
    Note: does not support context
  */
  invokeMethods: function() {
    var members = this.members, member;

    for( var i=0, l=members.length; i<l; i++ ) {
      member = members[i];

      // method.call(target);
      member[1].call(member[0]);
    }
  },

  /**
    Returns a new instance of the set with the contents cloned.
  */
  clone: function() {
    var newSet = SC.ObserverSet.create(), memberArray = this.members;

    newSet._members = SC.clone(this._members);
    var newMembers = newSet.members;

    for( var i=0, l=memberArray.length; i<l; i++ ) {
      newMembers[i] = SC.clone(memberArray[i]);
      newMembers[i].length = 3;
    }

    return newSet;
  },

  /**
    Creates a new instance of the observer set.
  */
  create: function() {
    return new SC.ObserverSet.constructor();
  },

  getMembers: function() {
    return this.members.slice(0);
  },

  constructor: function() {
    this._members = {};
    this.members = [];
  }

} ;
SC.ObserverSet.constructor.prototype = SC.ObserverSet;
SC.ObserverSet.slice = SC.ObserverSet.clone ;


/* >>>>>>>>>> BEGIN source/mixins/observable.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

require('private/observer_set') ;

/*globals logChange */

/**
  Set to YES to have all observing activity logged to the console.  This
  should be used for debugging only.

  @property {Boolean}
*/
SC.LOG_OBSERVERS = NO ;

/**
  @namespace

  Key-Value-Observing (KVO) simply allows one object to observe changes to a
  property on another object. It is one of the fundamental ways that models,
  controllers and views communicate with each other in a SproutCore
  application.  Any object that has this module applied to it can be used in
  KVO-operations.

  This module is applied automatically to all objects that inherit from
  SC.Object, which includes most objects bundled with the SproutCore
  framework.  You will not generally apply this module to classes yourself,
  but you will use the features provided by this module frequently, so it is
  important to understand how to use it.

  h2. Enabling Key Value Observing

  With KVO, you can write functions that will be called automatically whenever
  a property on a particular object changes.  You can use this feature to
  reduce the amount of "glue code" that you often write to tie the various
  parts of your application together.

  To use KVO, just use the KVO-aware methods get() and set() to access
  properties instead of accessing properties directly.  Instead of writing:

  {{{
    var aName = contact.firstName ;
    contact.firstName = 'Charles' ;
  }}}

  use:

  {{{
    var aName = contact.get('firstName') ;
    contact.set('firstName', 'Charles') ;
  }}}

  get() and set() work just like the normal "dot operators" provided by
  JavaScript but they provide you with much more power, including not only
  observing but computed properties as well.

  h2. Observing Property Changes

  You typically observe property changes simply by adding the observes()
  call to the end of your method declarations in classes that you write.  For
  example:

  {{{
    SC.Object.create({
      valueObserver: function() {
        // Executes whenever the "Value" property changes
      }.observes('value')
    }) ;
  }}}

  Although this is the most common way to add an observer, this capability is
  actually built into the SC.Object class on top of two methods defined in
  this mixin called addObserver() and removeObserver().  You can use these two
  methods to add and remove observers yourself if you need to do so at run
  time.

  To add an observer for a property, just call:

  {{{
    object.addObserver('propertyKey', targetObject, targetAction) ;
  }}}

  This will call the 'targetAction' method on the targetObject to be called
  whenever the value of the propertyKey changes.

  h2. Observer Parameters

  An observer function typically does not need to accept any parameters,
  however you can accept certain arguments when writing generic observers.
  An observer function can have the following arguments:

  {{{
    propertyObserver(target, key, value, revision) ;
  }}}

  - *target* - This is the object whose value changed.  Usually this.
  - *key* - The key of the value that changed
  - *value* - this property is no longer used.  It will always be null
  - *revision* - this is the revision of the target object

  h2. Implementing Manual Change Notifications

  Sometimes you may want to control the rate at which notifications for
  a property are delivered, for example by checking first to make sure
  that the value has changed.

  To do this, you need to implement a computed property for the property
  you want to change and override automaticallyNotifiesObserversFor().

  The example below will only notify if the "balance" property value actually
  changes:

  {{{

    automaticallyNotifiesObserversFor: function(key) {
      return (key === 'balance') ? NO : arguments.callee.base.apply(this,arguments) ;
    },

    balance: function(key, value) {
      var balance = this._balance ;
      if ((value !== undefined) && (balance !== value)) {
        this.propertyWillChange(key) ;
        balance = this._balance = value ;
        this.propertyDidChange(key) ;
      }
      return balance ;
    }

  }}}

  h1. Implementation Details

  Internally, SproutCore keeps track of observable information by adding a
  number of properties to the object adopting the observable.  All of these
  properties begin with "_kvo_" to separate them from the rest of your object.

  @static
  @since SproutCore 1.0
*/
SC.Observable = {

  /**
    Walk like that ol' duck

    @property {Boolean}
  */
  isObservable: YES,

  /**
    Determines whether observers should be automatically notified of changes
    to a key.

    If you are manually implementing change notifications for a property, you
    can override this method to return NO for properties you do not want the
    observing system to automatically notify for.

    The default implementation always returns YES.

    @param key {String} the key that is changing
    @returns {Boolean} YES if automatic notification should occur.
  */
  automaticallyNotifiesObserversFor: function(key) {
    return YES;
  },

  // ..........................................
  // PROPERTIES
  //
  // Use these methods to get/set properties.  This will handle observing
  // notifications as well as allowing you to define functions that can be
  // used as properties.

  /**
    Retrieves the value of key from the object.

    This method is generally very similar to using object[key] or object.key,
    however it supports both computed properties and the unknownProperty
    handler.

    *Computed Properties*

    Computed properties are methods defined with the property() modifier
    declared at the end, such as:

    {{{
      fullName: function() {
        return this.getEach('firstName', 'lastName').compact().join(' ');
      }.property('firstName', 'lastName')
    }}}

    When you call get() on a computed property, the property function will be
    called and the return value will be returned instead of the function
    itself.

    *Unknown Properties*

    Likewise, if you try to call get() on a property whose values is
    undefined, the unknownProperty() method will be called on the object.
    If this method reutrns any value other than undefined, it will be returned
    instead.  This allows you to implement "virtual" properties that are
    not defined upfront.

    @param key {String} the property to retrieve
    @returns {Object} the property value or undefined.

  */
  get: function(key) {
    var ret = this[key], cache ;
    if (ret === undefined) {
      return this.unknownProperty(key) ;
    } else if (ret && ret.isProperty) {
      if (ret.isCacheable) {
        cache = this._kvo_cache ;
        if (!cache) cache = this._kvo_cache = {};
        return (cache[ret.cacheKey] !== undefined) ? cache[ret.cacheKey] : (cache[ret.cacheKey] = ret.call(this,key)) ;
      } else return ret.call(this,key);
    } else return ret ;
  },

  /**
    Sets the key equal to value.

    This method is generally very similar to calling object[key] = value or
    object.key = value, except that it provides support for computed
    properties, the unknownProperty() method and property observers.

    *Computed Properties*

    If you try to set a value on a key that has a computed property handler
    defined (see the get() method for an example), then set() will call
    that method, passing both the value and key instead of simply changing
    the value itself.  This is useful for those times when you need to
    implement a property that is composed of one or more member
    properties.

    *Unknown Properties*

    If you try to set a value on a key that is undefined in the target
    object, then the unknownProperty() handler will be called instead.  This
    gives you an opportunity to implement complex "virtual" properties that
    are not predefined on the obejct.  If unknownProperty() returns
    undefined, then set() will simply set the value on the object.

    *Property Observers*

    In addition to changing the property, set() will also register a
    property change with the object.  Unless you have placed this call
    inside of a beginPropertyChanges() and endPropertyChanges(), any "local"
    observers (i.e. observer methods declared on the same object), will be
    called immediately.  Any "remote" observers (i.e. observer methods
    declared on another object) will be placed in a queue and called at a
    later time in a coelesced manner.

    *Chaining*

    In addition to property changes, set() returns the value of the object
    itself so you can do chaining like this:

    {{{
      record.set('firstName', 'Charles').set('lastName', 'Jolley');
    }}}

    @param key {String|Hash} the property to set
    @param value {Object} the value to set or null.
    @returns {SC.Observable}
  */
  set: function(key, value) {
    var func   = this[key],
        notify = this.automaticallyNotifiesObserversFor(key),
        ret    = value,
        cachedep, cache, idx, dfunc ;
    
    if(value === undefined && SC.typeOf(key) === SC.T_HASH) {
      var hash = key;
      
      for(key in hash) {
        if (!hash.hasOwnProperty(key)) continue;
        this.set(key, hash[key]);
      }
      
      return this;
    }
        
    // if there are any dependent keys and they use caching, then clear the
    // cache.  (If we're notifying, then propertyDidChange will do this for
    // us.)
    if (!notify && this._kvo_cacheable && (cache = this._kvo_cache)) {
      // lookup the cached dependents for this key.  if undefined, compute.
      // note that if cachdep is set to null is means we figure out it has no
      // cached dependencies already.  this is different from undefined.
      cachedep = this._kvo_cachedep;
      if (!cachedep || (cachedep = cachedep[key])===undefined) {
        cachedep = this._kvo_computeCachedDependentsFor(key);
      }

      if (cachedep) {
        idx = cachedep.length;
        while(--idx>=0) {
          dfunc = cachedep[idx];
          cache[dfunc.cacheKey] = cache[dfunc.lastSetValueKey] = undefined;
        }
      }
    }

    // set the value.
    if (func && func.isProperty) {
      cache = this._kvo_cache;
      if (func.isVolatile || !cache || (cache[func.lastSetValueKey] !== value)) {
        if (!cache) cache = this._kvo_cache = {};

        cache[func.lastSetValueKey] = value ;
        if (notify) this.propertyWillChange(key) ;
        ret = func.call(this,key,value) ;

        // update cached value
        if (func.isCacheable) cache[func.cacheKey] = ret ;
        if (notify) this.propertyDidChange(key, ret, YES) ;
      }

    } else if (func === undefined) {
      if (notify) this.propertyWillChange(key) ;
      this.unknownProperty(key,value) ;
      if (notify) this.propertyDidChange(key, ret) ;

    } else {
      if (this[key] !== value) {
        if (notify) this.propertyWillChange(key) ;
        ret = this[key] = value ;
        if (notify) this.propertyDidChange(key, ret) ;
      }
    }

    return this ;
  },

  /**
    Called whenever you try to get or set an undefined property.

    This is a generic property handler.  If you define it, it will be called
    when the named property is not yet set in the object.  The default does
    nothing.

    @param key {String} the key that was requested
    @param value {Object} The value if called as a setter, undefined if called as a getter.
    @returns {Object} The new value for key.
  */
  unknownProperty: function(key,value) {
    if (!(value === undefined)) { this[key] = value; }
    return value ;
  },

  /**
    Begins a grouping of property changes.

    You can use this method to group property changes so that notifications
    will not be sent until the changes are finished.  If you plan to make a
    large number of changes to an object at one time, you should call this
    method at the beginning of the changes to suspend change notifications.
    When you are done making changes, all endPropertyChanges() to allow
    notification to resume.

    @returns {SC.Observable}
  */
  beginPropertyChanges: function() {
    this._kvo_changeLevel = (this._kvo_changeLevel || 0) + 1;
    return this;
  },

  /**
    Ends a grouping of property changes.

    You can use this method to group property changes so that notifications
    will not be sent until the changes are finished.  If you plan to make a
    large number of changes to an object at one time, you should call
    beginPropertyChanges() at the beginning of the changes to suspend change
    notifications. When you are done making changes, call this method to allow
    notification to resume.

    @returns {SC.Observable}
  */
  endPropertyChanges: function() {
    this._kvo_changeLevel = (this._kvo_changeLevel || 1) - 1 ;
    var level = this._kvo_changeLevel, changes = this._kvo_changes;
    if ((level<=0) && changes && (changes.length>0) && !SC.Observers.isObservingSuspended) {
      this._notifyPropertyObservers() ;
    }
    return this ;
  },

  /**
    Notify the observer system that a property is about to change.

    Sometimes you need to change a value directly or indirectly without
    actually calling get() or set() on it.  In this case, you can use this
    method and propertyDidChange() instead.  Calling these two methods
    together will notify all observers that the property has potentially
    changed value.

    Note that you must always call propertyWillChange and propertyDidChange as
    a pair.  If you do not, it may get the property change groups out of order
    and cause notifications to be delivered more often than you would like.

    @param key {String} The property key that is about to change.
    @returns {SC.Observable}
  */
  propertyWillChange: function(key) {
    return this ;
  },

  /**
    Notify the observer system that a property has just changed.

    Sometimes you need to change a value directly or indirectly without
    actually calling get() or set() on it.  In this case, you can use this
    method and propertyWillChange() instead.  Calling these two methods
    together will notify all observers that the property has potentially
    changed value.

    Note that you must always call propertyWillChange and propertyDidChange as
    a pair. If you do not, it may get the property change groups out of order
    and cause notifications to be delivered more often than you would like.

    @param key {String} The property key that has just changed.
    @param value {Object} The new value of the key.  May be null.
    @returns {SC.Observable}
  */
  propertyDidChange: function(key,value, _keepCache) {
    this._kvo_revision = (this._kvo_revision || 0) + 1;
    var level = this._kvo_changeLevel || 0,
        cachedep, idx, dfunc, cache, func,
        log = SC.LOG_OBSERVERS && !(this.LOG_OBSERVING===NO);

    if (cache = this._kvo_cache) {

      // clear any cached value
      if (!_keepCache) {
        func = this[key] ;
        if (func && func.isProperty) {
          cache[func.cacheKey] = cache[func.lastSetValueKey] = undefined ;
        }
      }

      if (this._kvo_cacheable) {
        // if there are any dependent keys and they use caching, then clear the
        // cache.  This is the same code as is in set.  It is inlined for perf.
        cachedep = this._kvo_cachedep;
        if (!cachedep || (cachedep = cachedep[key])===undefined) {
          cachedep = this._kvo_computeCachedDependentsFor(key);
        }

        if (cachedep) {
          idx = cachedep.length;
          while(--idx>=0) {
            dfunc = cachedep[idx];
            cache[dfunc.cacheKey] = cache[dfunc.lastSetValueKey] = undefined;
          }
        }
      }
    }

    // save in the change set if queuing changes
    var suspended = SC.Observers.isObservingSuspended;
    if ((level > 0) || suspended) {
      var changes = this._kvo_changes ;
      if (!changes) changes = this._kvo_changes = SC.CoreSet.create() ;
      changes.add(key) ;

      if (suspended) {
        if (log) console.log("%@%@: will not notify observers because observing is suspended".fmt(SC.KVO_SPACES,this));
        SC.Observers.objectHasPendingChanges(this) ;
      }

    // otherwise notify property observers immediately
    } else this._notifyPropertyObservers(key) ;

    return this ;
  },

  // ..........................................
  // DEPENDENT KEYS
  //

  /**
    Use this to indicate that one key changes if other keys it depends on
    change.  Pass the key that is dependent and additional keys it depends
    upon.  You can either pass the additional keys inline as arguments or
    in a single array.

    You generally do not call this method, but instead pass dependent keys to
    your property() method when you declare a computed property.

    You can call this method during your init to register the keys that should
    trigger a change notification for your computed properties.

    @param {String} key the dependent key
    @param {Array|String} dependentKeys one or more dependent keys
    @returns {Object} this
  */
  registerDependentKey: function(key, dependentKeys) {
    var dependents = this._kvo_dependents,
        func       = this[key],
        keys, idx, lim, dep, queue;

    // normalize input.
    if (typeof dependentKeys === "object" && (dependentKeys instanceof Array)) {
      keys = dependentKeys;
      lim  = 0;
    } else {
      keys = arguments;
      lim  = 1;
    }
    idx  = keys.length;

    // define dependents if not defined already.
    if (!dependents) this._kvo_dependents = dependents = {} ;

    // for each key, build array of dependents, add this key...
    // note that we ignore the first argument since it is the key...
    while(--idx >= lim) {
      dep = keys[idx] ;

      // add dependent key to dependents array of key it depends on
      queue = dependents[dep] ;
      if (!queue) queue = dependents[dep] = [] ;
      queue.push(key) ;
    }
  },

  /** @private

    Helper method used by computeCachedDependents.  Just loops over the
    array of dependent keys.  If the passed function is cacheable, it will
    be added to the queue.  Also, recursively call on each keys dependent
    keys.

    @param {Array} queue the queue to add functions to
    @param {Array} keys the array of dependent keys for this key
    @param {Hash} dependents the _kvo_dependents cache
    @param {SC.Set} seen already seen keys
    @returns {void}
  */
  _kvo_addCachedDependents: function(queue, keys, dependents, seen) {
    var idx = keys.length,
        func, key, deps ;

    while(--idx >= 0) {
      key  = keys[idx];
      seen.add(key);

      // if the value for this key is a computed property, then add it to the
      // set if it is cacheable, and process any of its dependent keys also.
      func = this[key];
      if (func && (func instanceof Function) && func.isProperty) {
        if (func.isCacheable) queue.push(func); // handle this func
        if ((deps = dependents[key]) && deps.length>0) { // and any dependents
          this._kvo_addCachedDependents(queue, deps, dependents, seen);
        }
      }
    }

  },

  /** @private

    Called by set() whenever it needs to determine which cached dependent
    keys to clear.  Recursively searches dependent keys to determine all
    cached property direcly or indirectly affected.

    The return value is also saved for future reference

    @param {String} key the key to compute
    @returns {Array}
  */
  _kvo_computeCachedDependentsFor: function(key) {
    var cached     = this._kvo_cachedep,
        dependents = this._kvo_dependents,
        keys       = dependents ? dependents[key] : null,
        queue, seen ;
    if (!cached) cached = this._kvo_cachedep = {};

    // if there are no dependent keys, then just set and return null to avoid
    // this mess again.
    if (!keys || keys.length===0) return cached[key] = null;

    // there are dependent keys, so we need to do the work to find out if
    // any of them or their dependent keys are cached.
    queue = cached[key] = [];
    seen  = SC._TMP_SEEN_SET = (SC._TMP_SEEN_SET || SC.CoreSet.create());
    seen.add(key);
    this._kvo_addCachedDependents(queue, keys, dependents, seen);
    seen.clear(); // reset

    if (queue.length === 0) queue = cached[key] = null ; // turns out nothing
    return queue ;
  },

  // ..........................................
  // OBSERVERS
  //

  _kvo_for: function(kvoKey, type) {
    var ret = this[kvoKey] ;

    if (!this._kvo_cloned) this._kvo_cloned = {} ;

    // if the item does not exist, create it.  Unless type is passed,
    // assume array.
    if (!ret) {
      ret = this[kvoKey] = (type === undefined) ? [] : type.create();
      this._kvo_cloned[kvoKey] = YES ;

    // if item does exist but has not been cloned, then clone it.  Note
    // that all types must implement copy().0
    } else if (!this._kvo_cloned[kvoKey]) {
      ret = this[kvoKey] = ret.copy();
      this._kvo_cloned[kvoKey] = YES;
    }

    return ret ;
  },

  /**
    Adds an observer on a property.

    This is the core method used to register an observer for a property.

    Once you call this method, anytime the key's value is set, your observer
    will be notified.  Note that the observers are triggered anytime the
    value is set, regardless of whether it has actually changed.  Your
    observer should be prepared to handle that.

    You can also pass an optional context parameter to this method.  The
    context will be passed to your observer method whenever it is triggered.
    Note that if you add the same target/method pair on a key multiple times
    with different context parameters, your observer will only be called once
    with the last context you passed.

    h2. Observer Methods

    Observer methods you pass should generally have the following signature if
    you do not pass a "context" parameter:

    {{{
      fooDidChange: function(sender, key, value, rev);
    }}}

    The sender is the object that changed.  The key is the property that
    changes.  The value property is currently reserved and unused.  The rev
    is the last property revision of the object when it changed, which you can
    use to detect if the key value has really changed or not.

    If you pass a "context" parameter, the context will be passed before the
    revision like so:

    {{{
      fooDidChange: function(sender, key, value, context, rev);
    }}}

    Usually you will not need the value, context or revision parameters at
    the end.  In this case, it is common to write observer methods that take
    only a sender and key value as parameters or, if you aren't interested in
    any of these values, to write an observer that has no parameters at all.

    @param key {String} the key to observer
    @param target {Object} the target object to invoke
    @param method {String|Function} the method to invoke.
    @param context {Object} optional context
    @returns {SC.Object} self
  */
  addObserver: function(key, target, method, context) {
    var kvoKey, chain, chains, observers;

    // normalize.  if a function is passed to target, make it the method.
    if (method === undefined) {
      method = target; target = this ;
    }
    if (!target) target = this ;

    if (typeof method === "string") method = target[method] ;
    if (!method) throw "You must pass a method to addObserver()" ;

    // Normalize key...
    key = key.toString() ;
    if (key.indexOf('.') >= 0) {

      // create the chain and save it for later so we can tear it down if
      // needed.
      chain = SC._ChainObserver.createChain(this, key, target, method, context);
      chain.masterTarget = target;
      chain.masterMethod = method ;

      // Save in set for chain observers.
      this._kvo_for(SC.keyFor('_kvo_chains', key)).push(chain);

    // Create observers if needed...
    } else {

      // Special case to support reduced properties.  If the property
      // key begins with '@' and its value is unknown, then try to get its
      // value.  This will configure the dependent keys if needed.
      if ((this[key] === undefined) && (key.indexOf('@') === 0)) {
        this.get(key) ;
      }

      if (target === this) target = null ; // use null for observers only.
      kvoKey = SC.keyFor('_kvo_observers', key);
      this._kvo_for(kvoKey, SC.ObserverSet).add(target, method, context);
      this._kvo_for('_kvo_observed_keys', SC.CoreSet).add(key) ;
    }

    if (this.didAddObserver) this.didAddObserver(key, target, method);
    return this;
  },

  /**
    Remove an observer you have previously registered on this object.  Pass
    the same key, target, and method you passed to addObserver() and your
    target will no longer receive notifications.

    @returns {SC.Observable} reciever
  */
  removeObserver: function(key, target, method) {

    var kvoKey, chains, chain, observers, idx ;

    // normalize.  if a function is passed to target, make it the method.
    if (method === undefined) {
      method = target; target = this ;
    }
    if (!target) target = this ;

    if (typeof method === "string") method = target[method] ;
    if (!method) throw "You must pass a method to removeObserver()" ;

    // if the key contains a '.', this is a chained observer.
    key = key.toString() ;
    if (key.indexOf('.') >= 0) {

      // try to find matching chains
      kvoKey = SC.keyFor('_kvo_chains', key);
      if (chains = this[kvoKey]) {

        // if chains have not been cloned yet, do so now.
        chains = this._kvo_for(kvoKey) ;

        // remove any chains
        idx = chains.length;
        while(--idx >= 0) {
          chain = chains[idx];
          if (chain && (chain.masterTarget===target) && (chain.masterMethod===method)) {
            chains[idx] = chain.destroyChain() ;
          }
        }
      }

    // otherwise, just like a normal observer.
    } else {
      if (target === this) target = null ; // use null for observers only.
      kvoKey = SC.keyFor('_kvo_observers', key) ;
      if (observers = this[kvoKey]) {
        // if observers have not been cloned yet, do so now
        observers = this._kvo_for(kvoKey) ;
        observers.remove(target, method) ;
        if (observers.getMembers().length === 0) {
          this._kvo_for('_kvo_observed_keys', SC.CoreSet).remove(key);
        }
      }
    }

    if (this.didRemoveObserver) this.didRemoveObserver(key, target, method);
    return this;
  },

  /**
    Returns YES if the object currently has observers registered for a
    particular key.  You can use this method to potentially defer performing
    an expensive action until someone begins observing a particular property
    on the object.

    @param {String} key key to check
    @returns {Boolean}
  */
  hasObserverFor: function(key) {
    SC.Observers.flush(this) ; // hookup as many observers as possible.

    var observers = this[SC.keyFor('_kvo_observers', key)],
        locals    = this[SC.keyFor('_kvo_local', key)],
        members ;

    if (locals && locals.length>0) return YES ;
    if (observers && observers.getMembers().length > 0) return YES ;
    return NO ;
  },

  /**
    This method will register any observers and computed properties saved on
    the object.  Normally you do not need to call this method youself.  It
    is invoked automatically just before property notifications are sent and
    from the init() method of SC.Object.  You may choose to call this
    from your own initialization method if you are using SC.Observable in
    a non-SC.Object-based object.

    This method looks for several private variables, which you can setup,
    to initialize:

      - _observers: this should contain an array of key names for observers
        you need to configure.

      - _bindings: this should contain an array of key names that configure
        bindings.

      - _properties: this should contain an array of key names for computed
        properties.

    @returns {Object} this
  */
  initObservable: function() {
    if (this._observableInited) return ;
    this._observableInited = YES ;

    var loc, keys, key, value, observer, propertyPaths, propertyPathsLength,
        len, ploc, path, dotIndex, root, propertyKey, keysLen;

    // Loop through observer functions and register them
    if (keys = this._observers) {
      len = keys.length ;
      for(loc=0;loc<len;loc++) {
        key = keys[loc]; observer = this[key] ;
        propertyPaths = observer.propertyPaths ;
        propertyPathsLength = (propertyPaths) ? propertyPaths.length : 0 ;
        for(ploc=0;ploc<propertyPathsLength;ploc++) {
          path = propertyPaths[ploc] ;
          dotIndex = path.indexOf('.') ;
          // handle most common case, observing a local property
          if (dotIndex < 0) {
            this.addObserver(path, this, observer) ;

          // next most common case, use a chained observer
          } else if (path.indexOf('*') === 0) {
            this.addObserver(path.slice(1), this, observer) ;

          // otherwise register the observer in the observers queue.  This
          // will add the observer now or later when the named path becomes
          // available.
          } else {
            root = null ;

            // handle special cases for observers that look to the local root
            if (dotIndex === 0) {
              root = this; path = path.slice(1) ;
            } else if (dotIndex===4 && path.slice(0,5) === 'this.') {
              root = this; path = path.slice(5) ;
            } else if (dotIndex<0 && path.length===4 && path === 'this') {
              root = this; path = '';
            }

            SC.Observers.addObserver(path, this, observer, root);
          }
        }
      }
    }

    // Add Bindings
    this.bindings = []; // will be filled in by the bind() method.
    if (keys = this._bindings) {
      for(loc=0, keysLen = keys.length; loc < keysLen;loc++) {
        // get propertyKey
        key = keys[loc] ; value = this[key] ;
        propertyKey = key.slice(0,-7) ; // contentBinding => content
        this[key] = this.bind(propertyKey, value) ;
      }
    }

    // Add Properties
    if (keys = this._properties) {
      for(loc=0, keysLen = keys.length; loc<keysLen;loc++) {
        key = keys[loc];
        if (value = this[key]) {

          // activate cacheable only if needed for perf reasons
          if (value.isCacheable) this._kvo_cacheable = YES;

          // register dependent keys
          if (value.dependentKeys && (value.dependentKeys.length>0)) {
            this.registerDependentKey(key, value.dependentKeys) ;
          }
        }
      }
    }

  },

  // ..........................................
  // NOTIFICATION
  //

  /**
    Returns an array with all of the observers registered for the specified
    key.  This is intended for debugging purposes only.  You generally do not
    want to rely on this method for production code.

    @params key {String} the key to evaluate
    @returns {Array} array of Observer objects, describing the observer.
  */
  observersForKey: function(key) {
    var observers = this._kvo_for('_kvo_observers', key) ;
    return observers.getMembers() ;
  },

  // this private method actually notifies the observers for any keys in the
  // observer queue.  If you pass a key it will be added to the queue.
  _notifyPropertyObservers: function(key) {
    if (!this._observableInited) this.initObservable() ;

    SC.Observers.flush(this) ; // hookup as many observers as possible.

    var log = SC.LOG_OBSERVERS && !(this.LOG_OBSERVING===NO),
        observers, changes, dependents, starObservers, idx, keys, rev,
        members, membersLength, member, memberLoc, target, method, loc, func,
        context, spaces, cache ;

    if (log) {
      spaces = SC.KVO_SPACES = (SC.KVO_SPACES || '') + '  ';
      console.log('%@%@: notifying observers after change to key "%@"'.fmt(spaces, this, key));
    }

    // Get any starObservers -- they will be notified of all changes.
    starObservers =  this['_kvo_observers_*'] ;

    // prevent notifications from being sent until complete
    this._kvo_changeLevel = (this._kvo_changeLevel || 0) + 1;

    // keep sending notifications as long as there are changes
    while(((changes = this._kvo_changes) && (changes.length > 0)) || key) {

      // increment revision
      rev = ++this.propertyRevision ;

      // save the current set of changes and swap out the kvo_changes so that
      // any set() calls by observers will be saved in a new set.
      if (!changes) changes = SC.CoreSet.create() ;
      this._kvo_changes = null ;

      // Add the passed key to the changes set.  If a '*' was passed, then
      // add all keys in the observers to the set...
      // once finished, clear the key so the loop will end.
      if (key === '*') {
        changes.add('*') ;
        changes.addEach(this._kvo_for('_kvo_observed_keys', SC.CoreSet));

      } else if (key) changes.add(key) ;

      // Now go through the set and add all dependent keys...
      if (dependents = this._kvo_dependents) {

        // NOTE: each time we loop, we check the changes length, this
        // way any dependent keys added to the set will also be evaluated...
        for(idx=0;idx<changes.length;idx++) {
          key = changes[idx] ;
          keys = dependents[key] ;

          // for each dependent key, add to set of changes.  Also, if key
          // value is a cacheable property, clear the cached value...
          if (keys && (loc = keys.length)) {
            if (log) {
              console.log("%@...including dependent keys for %@: %@".fmt(spaces, key, keys));
            }
            cache = this._kvo_cache;
            if (!cache) cache = this._kvo_cache = {};
            while(--loc >= 0) {
              changes.add(key = keys[loc]);
              if (func = this[key]) {
                this[func.cacheKey] = undefined;
                cache[func.cacheKey] = cache[func.lastSetValueKey] = undefined;
              } // if (func=)
            } // while (--loc)
          } // if (keys &&
        } // for(idx...
      } // if (dependents...)

      // now iterate through all changed keys and notify observers.
      while(changes.length > 0) {
        key = changes.pop() ; // the changed key

        // find any observers and notify them...
        observers = this[SC.keyFor('_kvo_observers', key)];

        if (observers) {
          // We need to clone the 'members' structure here in case any of the
          // observers we're about to notify happen to remove observers for
          // this key, which would mutate the structure underneath us.
          // (Cloning it rather than mutating gives us a clear policy:  if you
          // were registered as an observer at the time notification begins,
          // you will be notified, regardless of whether you're removed as an
          // observer during that round of notification.  Similarly, if you're
          // added as an observer during the notification round by another
          // observer, you will not be notified until the next time.)
          members = SC.clone(observers.getMembers()) ;
          membersLength = members.length ;
          for(memberLoc=0;memberLoc < membersLength; memberLoc++) {
            member = members[memberLoc] ;

            if (member[3] === rev) continue ; // skip notified items.

            if(!member[1]) console.log(member);

            target = member[0] || this;
            method = member[1] ;
            context = member[2];
            member[3] = rev;

            if (log) console.log('%@...firing observer on %@ for key "%@"'.fmt(spaces, target, key));
            if (context !== undefined) {
              method.call(target, this, key, null, context, rev);
            } else {
              method.call(target, this, key, null, rev) ;
            }
          }
        }

        // look for local observers.  Local observers are added by SC.Object
        // as an optimization to avoid having to add observers for every
        // instance when you are just observing your local object.
        members = this[SC.keyFor('_kvo_local', key)];
        if (members) {
          // Note:  Since, unlike above, we don't expect local observers to be
          //        removed in general, we will not clone 'members'.
          membersLength = members.length ;
          for(memberLoc=0;memberLoc<membersLength;memberLoc++) {
            member = members[memberLoc];
            method = this[member] ; // try to find observer function
            if (method) {
              if (log) console.log('%@...firing local observer %@.%@ for key "%@"'.fmt(spaces, this, member, key));
              method.call(this, this, key, null, rev);
            }
          }
        }

        // if there are starObservers, do the same thing for them
        if (starObservers && key !== '*') {
          // We clone the structure per the justification, above, for regular
          // observers.
          members = SC.clone(starObservers.getMembers()) ;
          membersLength = members.length ;
          for(memberLoc=0;memberLoc < membersLength; memberLoc++) {
            member = members[memberLoc] ;
            target = member[0] || this;
            method = member[1] ;
            context = member[2] ;

            if (log) console.log('%@...firing * observer on %@ for key "%@"'.fmt(spaces, target, key));
            if (context !== undefined) {
              method.call(target, this, key, null, context, rev);
            } else {
              method.call(target, this, key, null, rev) ;
            }
          }
        }

        // if there is a default property observer, call that also
        if (this.propertyObserver) {
          if (log) console.log('%@...firing %@.propertyObserver for key "%@"'.fmt(spaces, this, key));
          this.propertyObserver(this, key, null, rev);
        }
      } // while(changes.length>0)

      // changes set should be empty. release it for reuse
      if (changes) changes.destroy() ;

      // key is no longer needed; clear it to avoid infinite loops
      key = null ;

    } // while (changes)

    // done with loop, reduce change level so that future sets can resume
    this._kvo_changeLevel = (this._kvo_changeLevel || 1) - 1;

    if (log) SC.KVO_SPACES = spaces.slice(0, -2);

    return YES ; // finished successfully
  },

  // ..........................................
  // BINDINGS
  //

  /**
    Manually add a new binding to an object.  This is the same as doing
    the more familiar propertyBinding: 'property.path' approach.

    @param {String} toKey the key to bind to
    @param {Object} target target or property path to bind from
    @param {String|Function} method method for target to bind from
    @returns {SC.Binding} new binding instance
  */
  bind: function(toKey, target, method) {

    var binding , pathType;

    // normalize...
    if (method !== undefined) target = [target, method];

    // if a string or array (i.e. tuple) is passed, convert this into a
    // binding.  If a binding default was provided, use that.
    pathType = typeof target;

    if (pathType === "string" || (pathType === "object" && (target instanceof Array))) {
      binding = this[toKey + 'BindingDefault'] || SC.Binding;
      binding = binding.beget().from(target) ;
    } else binding = target ;

    // finish configuring the binding and then connect it.
    binding = binding.to(toKey, this).connect() ;
    this.bindings.push(binding) ;

    return binding ;
  },

  /**
    didChangeFor allows you to determine if a property has changed since the
    last time the method was called. You must pass a unique context as the
    first parameter (so didChangeFor can identify which method is calling it),
    followed by a list of keys that should be checked for changes.

    For example, in your render method you might pass the following context:
    if (this.didChangeFor('render','height','width')) {
       // Only render if changed
    }

    In your view's update method, you might instead pass 'update':

    if (this.didChangeFor('update', 'height', 'width')) {
      // Only update height and width properties
    }

    This method works by comparing property revision counts. Every time a
    property changes, an internal counter is incremented. When didChangeFor is
    invoked, the current revision count of the property is compared to the
    revision count from the last time this method was called.

    @param {String|Object} context a unique identifier
    @param {String…} propertyNames one or more property names
  */
  didChangeFor: function(context) {
    var valueCache, revisionCache, seenValues, seenRevisions, ret,
        currentRevision, idx, key, value;
    context = SC.hashFor(context) ; // get a hash key we can use in caches.

    // setup caches...
    valueCache = this._kvo_didChange_valueCache ;
    if (!valueCache) valueCache = this._kvo_didChange_valueCache = {};
    revisionCache = this._kvo_didChange_revisionCache;
    if (!revisionCache) revisionCache=this._kvo_didChange_revisionCache={};

    // get the cache of values and revisions already seen in this context
    seenValues = valueCache[context] || {} ;
    seenRevisions = revisionCache[context] || {} ;

    // prepare too loop!
    ret = false ;
    currentRevision = this._kvo_revision || 0  ;
    idx = arguments.length ;
    while(--idx >= 1) {  // NB: loop only to 1 to ignore context arg.
      key = arguments[idx];

      // has the kvo revision changed since the last time we did this?
      if (seenRevisions[key] != currentRevision) {
        // yes, check the value with the last seen value
        value = this.get(key) ;
        if (seenValues[key] !== value) {
          ret = true ; // did change!
          seenValues[key] = value;
        }
      }
      seenRevisions[key] = currentRevision;
    }

    valueCache[context] = seenValues ;
    revisionCache[context] = seenRevisions ;
    return ret ;
  },

  /**
    Sets the property only if the passed value is different from the
    current value.  Depending on how expensive a get() is on this property,
    this may be more efficient.

    NOTE: By default, the set() method will not set the value unless it has
    changed. However, this check can skipped by setting .property().idempotent(NO)
    setIfChanged() may be useful in this case.

    @param key {String|Hash} the key to change
    @param value {Object} the value to change
    @returns {SC.Observable}
  */
  setIfChanged: function(key, value) {
    if(value === undefined && SC.typeOf(key) === SC.T_HASH) {
      var hash = key;
      
      for(key in hash) {
        if (!hash.hasOwnProperty(key)) continue;
        this.setIfChanged(key, hash[key]);
      }
      
      return this;
    }
    
    return (this.get(key) !== value) ? this.set(key, value) : this ;
  },

  /**
    Navigates the property path, returning the value at that point.

    If any object in the path is undefined, returns undefined.
  */
  getPath: function(path) {
    var tuple = SC.tupleForPropertyPath(path, this) ;
    if (tuple === null || tuple[0] === null) return undefined ;
    return tuple[0].get(tuple[1]) ;
  },

  /**
    Navigates the property path, finally setting the value.

    @param path {String} the property path to set
    @param value {Object} the value to set
    @returns {SC.Observable}
  */
  setPath: function(path, value) {
    if (path.indexOf('.') >= 0) {
      var tuple = SC.tupleForPropertyPath(path, this) ;
      if (!tuple || !tuple[0]) return null ;
      tuple[0].set(tuple[1], value) ;
    } else this.set(path, value) ; // shortcut
    return this;
  },

  /**
    Navigates the property path, finally setting the value but only if
    the value does not match the current value.  This will avoid sending
    unecessary change notifications.

    @param path {String} the property path to set
    @param value {Object} the value to set
    @returns {Object} this
  */
  setPathIfChanged: function(path, value) {
    if (path.indexOf('.') >= 0) {
      var tuple = SC.tupleForPropertyPath(path, this) ;
      if (!tuple || !tuple[0]) return null ;
      if (tuple[0].get(tuple[1]) !== value) {
        tuple[0].set(tuple[1], value) ;
      }
    } else this.setIfChanged(path, value) ; // shortcut
    return this;
  },

  /**
    Convenience method to get an array of properties.

    Pass in multiple property keys or an array of property keys.  This
    method uses getPath() so you can also pass key paths.

    @returns {Array} Values of property keys.
  */
  getEach: function() {
    var keys = SC.A(arguments),
        ret = [], idx, idxLen;
    for(idx=0, idxLen = keys.length; idx < idxLen;idx++) {
      ret[ret.length] = this.getPath(keys[idx]);
    }
    return ret ;
  },


  /**
    Increments the value of a property.

    @param key {String} property name
    @param increment {Number} the amount to increment (optional)
    @returns {Number} new value of property
  */
  incrementProperty: function(key,increment) {
    if (!increment) increment = 1;
    this.set(key,(this.get(key) || 0)+increment);
    return this.get(key) ;
  },

  /**
    Decrements the value of a property.

    @param key {String} property name
    @param increment {Number} the amount to decrement (optional)
    @returns {Number} new value of property
  */
  decrementProperty: function(key,increment) {
    if (!increment) increment = 1;
    this.set(key,(this.get(key) || 0) - increment) ;
    return this.get(key) ;
  },

  /**
    Inverts a property.  Property should be a bool.

    @param key {String} property name
    @param value {Object} optional parameter for "true" value
    @param alt {Object} optional parameter for "false" value
    @returns {Object} new value
  */
  toggleProperty: function(key,value,alt) {
    if (value === undefined) value = true ;
    if (alt === undefined) alt = false ;
    value = (this.get(key) == value) ? alt : value ;
    this.set(key,value);
    return this.get(key) ;
  },

  /**
    Convenience method to call propertyWillChange/propertyDidChange.

    Sometimes you need to notify observers that a property has changed value
    without actually changing this value.  In those cases, you can use this
    method as a convenience instead of calling propertyWillChange() and
    propertyDidChange().

    @param key {String} The property key that has just changed.
    @param value {Object} The new value of the key.  May be null.
    @returns {SC.Observable}
  */
  notifyPropertyChange: function(key, value) {
    this.propertyWillChange(key) ;
    this.propertyDidChange(key, value) ;
    return this;
  },

  /**
    Notifies all of observers of a property changes.

    Sometimes when you make a major update to your object, it is cheaper to
    simply notify all observers that their property might have changed than
    to figure out specifically which properties actually did change.

    In those cases, you can simply call this method to notify all property
    observers immediately.  Note that this ignores property groups.

    @returns {SC.Observable}
  */
  allPropertiesDidChange: function() {
    this._kvo_cache = null; //clear cached props
    this._notifyPropertyObservers('*') ;
    return this ;
  },

  addProbe: function(key) { this.addObserver(key,SC.logChange); },
  removeProbe: function(key) { this.removeObserver(key,SC.logChange); },

  /**
    Logs the named properties to the console.

    @param {String...} propertyNames one or more property names
  */
  logProperty: function() {
    var props = SC.$A(arguments),
        prop, propsLen, idx;
    for(idx=0, propsLen = props.length; idx<propsLen; idx++) {
      prop = props[idx] ;
      console.log('%@:%@: '.fmt(SC.guidFor(this), prop), this.get(prop)) ;
    }
  },

  propertyRevision: 1

} ;

/** @private used by addProbe/removeProbe */
SC.logChange = function logChange(target, key, value) {
  console.log("CHANGE: %@[%@] => %@".fmt(target, key, target.get(key)));
};

/**
  Retrieves a property from an object, using get() if the
  object implements SC.Observable.

  @param  {Object}  object  the object to query
  @param  {String}  key the property to retrieve
*/
SC.mixin(SC, {
  get: function(object, key) {
    if (!object) return undefined;
    if (key === undefined) return this[object];
    if (object.get) return object.get(key);
    return object[key];
  }
});

// Make all Array's observable
SC.mixin(Array.prototype, SC.Observable) ;

/* >>>>>>>>>> BEGIN source/system/enumerator.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @class

  An object that iterates over all of the values in an object.

  An instance of this object is returned everytime you call the
  enumerator() method on an object that implements the SC.Enumerable mixin.

  Once you create an enumerator instance, you can call nextObject() on it
  until you can iterated through the entire collection.  Once you have
  exhausted the enumerator, you can reuse it if you want by calling reset().

  @since SproutCore 1.0
*/
SC.Enumerator = function(enumerableObject) {
  this.enumerable = enumerableObject ;
  this.reset() ;
  return this ;
} ;

SC.Enumerator.prototype = {

  /**
    Returns the next object in the enumeration or undefined when complete.

    @returns {Object} the next object or undefined
  */
  nextObject: function() {
    var index = this._index ;
    var len = this._length;
    if (index >= len) return undefined ; // nothing to do

    // get the value
    var ret = this.enumerable.nextObject(index, this._previousObject, this._context) ;
    this._previousObject = ret ;
    this._index = index + 1 ;

    if (index >= len) {
      this._context = SC.Enumerator._pushContext(this._context);
    }

    return ret ;
  },

  /**
    Resets the enumerator to the beginning.  This is a nice way to reuse
    an existing enumerator.

    @returns {Object} this
  */
  reset: function() {
    var e = this.enumerable ;
    if (!e) throw SC.$error("Enumerator has been destroyed");
    this._length = e.get ? e.get('length') : e.length ;
    var len = this._length;
    this._index = 0;
    this._previousObject = null ;
    this._context = (len > 0) ? SC.Enumerator._popContext() : null;
  },

  /**
    Releases the enumerators enumerable object.  You cannot use this object
    anymore.  This is not often needed but it is useful when you need to
    make sure memory gets cleared.

    @returns {Object} null
  */
  destroy: function() {
    this.enumerable = this._length = this._index = this._previousObject = this._context = null;
  }

} ;

/**
  Use this method to manually create a new Enumerator object.  Usually you
  will not access this method directly but instead call enumerator() on the
  item you want to enumerate.

  @param {SC.Enumerable}  enumerableObject enumerable object.
  @returns {SC.Enumerator} the enumerator
*/
SC.Enumerator.create = function(enumerableObject) {
  return new SC.Enumerator(enumerableObject) ;
};

// Private context caching methods.  This avoids recreating lots of context
// objects.

SC.Enumerator._popContext = function() {
  var ret = this._contextCache ? this._contextCache.pop() : null ;
  return ret || {} ;
} ;

SC.Enumerator._pushContext = function(context) {
  this._contextCache = this._contextCache || [] ;
  var cache = this._contextCache;
  cache.push(context);
  return null ;
};


/* >>>>>>>>>> BEGIN source/mixins/enumerable.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

require('core') ;
require('system/enumerator');

/*globals Prototype */

/**
  @namespace

  This mixin defines the common interface implemented by enumerable objects
  in SproutCore.  Most of these methods follow the standard Array iteration
  API defined up to JavaScript 1.8 (excluding language-specific features that
  cannot be emulated in older versions of JavaScript).

  This mixin is applied automatically to the Array class on page load, so you
  can use any of these methods on simple arrays.  If Array already implements
  one of these methods, the mixin will not override them.

  h3. Writing Your Own Enumerable

  To make your own custom class enumerable, you need two items:

  1. You must have a length property.  This property should change whenever
     the number of items in your enumerable object changes.  If you using this
     with an SC.Object subclass, you should be sure to change the length
     property using set().

  2. If you must implement nextObject().  See documentation.

  Once you have these two methods implement, apply the SC.Enumerable mixin
  to your class and you will be able to enumerate the contents of your object
  like any other collection.

  h3. Using SproutCore Enumeration with Other Libraries

  Many other libraries provide some kind of iterator or enumeration like
  facility.  This is often where the most common API conflicts occur.
  SproutCore's API is designed to be as friendly as possible with other
  libraries by implementing only methods that mostly correspond to the
  JavaScript 1.8 API.

  @since SproutCore 1.0
*/
SC.Enumerable = {

  /**
    Walk like a duck.

    @property {Boolean}
  */
  isEnumerable: YES,

  /**
    Implement this method to make your class enumerable.

    This method will be call repeatedly during enumeration.  The index value
    will always begin with 0 and increment monotonically.  You don't have to
    rely on the index value to determine what object to return, but you should
    always check the value and start from the beginning when you see the
    requested index is 0.

    The previousObject is the object that was returned from the last call
    to nextObject for the current iteration.  This is a useful way to
    manage iteration if you are tracing a linked list, for example.

    Finally the context paramter will always contain a hash you can use as
    a "scratchpad" to maintain any other state you need in order to iterate
    properly.  The context object is reused and is not reset between
    iterations so make sure you setup the context with a fresh state whenever
    the index parameter is 0.

    Generally iterators will continue to call nextObject until the index
    reaches the your current length-1.  If you run out of data before this
    time for some reason, you should simply return undefined.

    The default impementation of this method simply looks up the index.
    This works great on any Array-like objects.

    @param index {Number} the current index of the iteration
    @param previousObject {Object} the value returned by the last call to nextObject.
    @param context {Object} a context object you can use to maintain state.
    @returns {Object} the next object in the iteration or undefined
  */
  nextObject: function(index, previousObject, context) {
    return this.objectAt ? this.objectAt(index) : this[index] ;
  },

  /**
    Helper method returns the first object from a collection.  This is usually
    used by bindings and other parts of the framework to extract a single
    object if the enumerable contains only one item.

    If you override this method, you should implement it so that it will
    always return the same value each time it is called.  If your enumerable
    contains only one object, this method should always return that object.
    If your enumerable is empty, this method should return undefined.

    @returns {Object} the object or undefined
  */
  firstObject: function() {
    if (this.get('length')===0) return undefined ;
    if (this.objectAt) return this.objectAt(0); // support arrays out of box

    // handle generic enumerables
    var context = SC.Enumerator._popContext(), ret;
    ret = this.nextObject(0, null, context);
    context = SC.Enumerator._pushContext(context);
    return ret ;
  }.property(),

  /**
    Helper method returns the last object from a collection.

    @returns {Object} the object or undefined
  */
  lastObject: function() {
    var len = this.get('length');
    if (len===0) return undefined ;
    if (this.objectAt) return this.objectAt(len-1); // support arrays out of box
  }.property(),

  /**
    Returns a new enumerator for this object.  See SC.Enumerator for
    documentation on how to use this object.  Enumeration is an alternative
    to using one of the other iterators described here.

    @returns {SC.Enumerator} an enumerator for the receiver
  */
  enumerator: function() { return SC.Enumerator.create(this); },

  /**
    Iterates through the enumerable, calling the passed function on each
    item.  This method corresponds to the forEach() method defined in
    JavaScript 1.6.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Object} this
  */
  forEach: function(callback, target) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;
      callback.call(target, next, idx, this);
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return this ;
  },

  /**
    Retrieves the named value on each member object.  This is more efficient
    than using one of the wrapper methods defined here.  Objects that
    implement SC.Observable will use the get() method, otherwise the property
    will be accessed directly.

    @param {String} key the key to retrieve
    @returns {Array} extracted values
  */
  getEach: function(key) {
    return this.map(function(next) {
      return next ? (next.get ? next.get(key) : next[key]) : null;
    }, this);
  },

  /**
    Sets the value on the named property for each member.  This is more
    efficient than using other methods defined on this helper.  If the object
    implements SC.Observable, the value will be changed to set(), otherwise
    it will be set directly.  null objects are skipped.

    @param {String} key the key to set
    @param {Object} value the object to set
    @returns {Object} receiver
  */
  setEach: function(key, value) {
    this.forEach(function(next) {
      if (next) {
        if (next.set) next.set(key, value) ;
        else next[key] = value ;
      }
    }, this);
    return this ;
  },

  /**
    Maps all of the items in the enumeration to another value, returning
    a new array.  This method corresponds to map() defined in JavaScript 1.6.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    It should return the mapped value.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Array} The mapped array.
  */
  map: function(callback, target) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var ret  = [];
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;
      ret[idx] = callback.call(target, next, idx, this) ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Similar to map, this specialized function returns the value of the named
    property on all items in the enumeration.

    @params key {String} name of the property
    @returns {Array} The mapped array.
  */
  mapProperty: function(key) {
    return this.map(function(next) {
      return next ? (next.get ? next.get(key) : next[key]) : null;
    });
  },

  /**
    Returns an array with all of the items in the enumeration that the passed
    function returns YES for. This method corresponds to filter() defined in
    JavaScript 1.6.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    It should return the YES to include the item in the results, NO otherwise.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Array} A filtered array.
  */
  filter: function(callback, target) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var ret  = [];
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;
      if(callback.call(target, next, idx, this)) ret.push(next) ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns an array sorted by the value of the passed key parameters.
    null objects will be sorted first.  You can pass either an array of keys
    or multiple parameters which will act as key names

    @param {String} key one or more key names
    @returns {Array}
  */
  sortProperty: function(key) {
    var keys = (typeof key === SC.T_STRING) ? arguments : key,
        len  = keys.length,
        src;

    // get the src array to sort
    if (this instanceof Array) src = this;
    else {
      src = [];
      this.forEach(function(i) { src.push(i); });
    }

    if (!src) return [];
    return src.sort(function(a,b) {
      var idx, key, aValue, bValue, ret = 0;

      for(idx=0;ret===0 && idx<len;idx++) {
        key = keys[idx];
        aValue = a ? (a.get ? a.get(key) : a[key]) : null;
        bValue = b ? (b.get ? b.get(key) : b[key]) : null;
        ret = SC.compare(aValue, bValue);
      }
      return ret ;
    });
  },


  /**
    Returns an array with just the items with the matched property.  You
    can pass an optional second argument with the target value.  Otherwise
    this will match any property that evaluates to true.

    @params key {String} the property to test
    @param value {String} optional value to test against.
    @returns {Array} filtered array
  */
  filterProperty: function(key, value) {
    var len = this.get ? this.get('length') : this.length ;
    var ret  = [];
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;
      var cur = next ? (next.get ? next.get(key) : next[key]) : null;
      var matched = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      if (matched) ret.push(next) ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns the first item in the array for which the callback returns YES.
    This method works similar to the filter() method defined in JavaScript 1.6
    except that it will stop working on the array once a match is found.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    It should return the YES to include the item in the results, NO otherwise.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Object} Found item or null.
  */
  find: function(callback, target) {
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var last = null, next, found = NO, ret = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len && !found;idx++) {
      next = this.nextObject(idx, last, context) ;
      if (found = callback.call(target, next, idx, this)) ret = next ;
      last = next ;
    }
    next = last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns an the first item with a property matching the passed value.  You
    can pass an optional second argument with the target value.  Otherwise
    this will match any property that evaluates to true.

    This method works much like the more generic find() method.

    @params key {String} the property to test
    @param value {String} optional value to test against.
    @returns {Object} found item or null
  */
  findProperty: function(key, value) {
    var len = this.get ? this.get('length') : this.length ;
    var found = NO, ret = null, last = null, next, cur ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len && !found;idx++) {
      next = this.nextObject(idx, last, context) ;
      cur = next ? (next.get ? next.get(key) : next[key]) : null;
      found = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      if (found) ret = next ;
      last = next ;
    }
    last = next = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns YES if the passed function returns YES for every item in the
    enumeration.  This corresponds with the every() method in JavaScript 1.6.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    It should return the YES or NO.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    h4. Example Usage

    {{{
      if (people.every(isEngineer)) { Paychecks.addBigBonus(); }
    }}}

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Boolean}
  */
  every: function(callback, target) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var ret  = YES;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;ret && (idx<len);idx++) {
      var next = this.nextObject(idx, last, context) ;
      if(!callback.call(target, next, idx, this)) ret = NO ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns YES if the passed property resolves to true for all items in the
    enumerable.  This method is often simpler/faster than using a callback.

    @params key {String} the property to test
    @param value {String} optional value to test against.
    @returns {Array} filtered array
  */
  everyProperty: function(key, value) {
    var len = this.get ? this.get('length') : this.length ;
    var ret  = YES;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;ret && (idx<len);idx++) {
      var next = this.nextObject(idx, last, context) ;
      var cur = next ? (next.get ? next.get(key) : next[key]) : null;
      ret = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },


  /**
    Returns YES if the passed function returns true for any item in the
    enumeration. This corresponds with the every() method in JavaScript 1.6.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    It should return the YES to include the item in the results, NO otherwise.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    h4. Usage Example

    {{{
      if (people.some(isManager)) { Paychecks.addBiggerBonus(); }
    }}}

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Array} A filtered array.
  */
  some: function(callback, target) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var ret  = NO;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;(!ret) && (idx<len);idx++) {
      var next = this.nextObject(idx, last, context) ;
      if(callback.call(target, next, idx, this)) ret = YES ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns YES if the passed property resolves to true for any item in the
    enumerable.  This method is often simpler/faster than using a callback.

    @params key {String} the property to test
    @param value {String} optional value to test against.
    @returns {Boolean} YES
  */
  someProperty: function(key, value) {
    var len = this.get ? this.get('length') : this.length ;
    var ret  = NO;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0; !ret && (idx<len); idx++) {
      var next = this.nextObject(idx, last, context) ;
      var cur = next ? (next.get ? next.get(key) : next[key]) : null;
      ret = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;  // return the invert
  },

  /**
    This will combine the values of the enumerator into a single value. It
    is a useful way to collect a summary value from an enumeration.  This
    corresponds to the reduce() method defined in JavaScript 1.8.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(previousValue, item, index, enumerable) ;
    }}}

    - *previousValue* is the value returned by the last call to the iterator.
    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    Return the new cumulative value.

    In addition to the callback you can also pass an initialValue.  An error
    will be raised if you do not pass an initial value and the enumerator is
    empty.

    Note that unlike the other methods, this method does not allow you to
    pass a target object to set as this for the callback.  It's part of the
    spec. Sorry.

    @params callback {Function} the callback to execute
    @params initialValue {Object} initial value for the reduce
    @params reducerProperty {String} internal use only.  May not be available.
    @returns {Array} A filtered array.
  */
  reduce: function(callback, initialValue, reducerProperty) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;

    // no value to return if no initial value & empty
    if (len===0 && initialValue === undefined) throw new TypeError();

    var ret  = initialValue;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;

      // while ret is still undefined, just set the first value we get as ret.
      // this is not the ideal behavior actually but it matches the FireFox
      // implementation... :(
      if (next !== null) {
        if (ret === undefined) {
          ret = next ;
        } else {
          ret = callback.call(null, ret, next, idx, this, reducerProperty);
        }
      }
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);

    // uh oh...we never found a value!
    if (ret === undefined) throw new TypeError() ;
    return ret ;
  },

  /**
    Invokes the named method on every object in the receiver that
    implements it.  This method corresponds to the implementation in
    Prototype 1.6.

    @param methodName {String} the name of the method
    @param args {Object...} optional arguments to pass as well.
    @returns {Array} return values from calling invoke.
  */
  invoke: function(methodName) {
    var len = this.get ? this.get('length') : this.length ;
    if (len <= 0) return [] ; // nothing to invoke....

    var idx;

    // collect the arguments
    var args = [] ;
    var alen = arguments.length ;
    if (alen > 1) {
      for(idx=1;idx<alen;idx++) args.push(arguments[idx]) ;
    }

    // call invoke
    var ret = [] ;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;
      var method = next ? next[methodName] : null ;
      if (method) ret[idx] = method.apply(next, args) ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Invokes the passed method and optional arguments on the receiver elements
    as long as the methods return value matches the target value.  This is
    a useful way to attempt to apply changes to a collection of objects unless
    or until one fails.

    @param targetValue {Object} the target return value
    @param methodName {String} the name of the method
    @param args {Object...} optional arguments to pass as well.
    @returns {Array} return values from calling invoke.
  */
  invokeWhile: function(targetValue, methodName) {
    var len = this.get ? this.get('length') : this.length ;
    if (len <= 0) return null; // nothing to invoke....

    var idx;

    // collect the arguments
    var args = [] ;
    var alen = arguments.length ;
    if (alen > 2) {
      for(idx=2;idx<alen;idx++) args.push(arguments[idx]) ;
    }

    // call invoke
    var ret = targetValue ;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(idx=0;(ret === targetValue) && (idx<len);idx++) {
      var next = this.nextObject(idx, last, context) ;
      var method = next ? next[methodName] : null ;
      if (method) ret = method.apply(next, args) ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Simply converts the enumerable into a genuine array.  The order, of
    course, is not gauranteed.  Corresponds to the method implemented by
    Prototype.

    @returns {Array} the enumerable as an array.
  */
  toArray: function() {
    var ret = [];
    this.forEach(function(o) { ret.push(o); }, this);
    return ret ;
  },

  /**
    Converts an enumerable into a matrix, with inner arrays grouped based
    on a particular property of the elements of the enumerable.

    @params key {String} the property to test
    @returns {Array} matrix of arrays
  */
  groupBy: function(key){
    var len = this.get ? this.get('length') : this.length,
        ret = [],
        last = null,
        context = SC.Enumerator._popContext(),
        grouped = [], 
        keyValues = [],
        idx, next, cur;
    
    for(idx=0;idx<len;idx++) {
      next = this.nextObject(idx, last, context) ;
      cur = next ? (next.get ? next.get(key) : next[key]) : null;
      if(SC.none(grouped[cur])) { 
        grouped[cur] = []; keyValues.push(cur);
      }
      grouped[cur].push(next);
      last = next;
    }
    last = null;
    context = SC.Enumerator._pushContext(context);
    
    for(idx=0,len=keyValues.length; idx < len; idx++){
      ret.push(grouped[keyValues[idx]]);        
    }
    return ret ;
  }

} ;

// Build in a separate function to avoid unintential leaks through closures...
SC._buildReducerFor = function(reducerKey, reducerProperty) {
  return function(key, value) {
    var reducer = this[reducerKey] ;
    if (SC.typeOf(reducer) !== SC.T_FUNCTION) {
      return this.unknownProperty ? this.unknownProperty(key, value) : null;
    } else {
      // Invoke the reduce method defined in enumerable instead of using the
      // one implemented in the receiver.  The receiver might be a native
      // implementation that does not support reducerProperty.
      var ret = SC.Enumerable.reduce.call(this, reducer, null, reducerProperty) ;
      return ret ;
    }
  }.property('[]') ;
};

SC.Reducers = /** @lends SC.Enumerable */ {
  /**
    This property will trigger anytime the enumerable's content changes.
    You can observe this property to be notified of changes to the enumerables
    content.

    For plain enumerables, this property is read only.  SC.Array overrides
    this method.

    @property {SC.Array}
  */
  '[]': function(key, value) { return this ; }.property(),

  /**
    Invoke this method when the contents of your enumerable has changed.
    This will notify any observers watching for content changes.  If your are
    implementing an ordered enumerable (such as an array), also pass the
    start and end values where the content changed so that it can be used to
    notify range observers.

    @param {Number} start optional start offset for the content change
    @param {Number} length optional length of change
    @returns {Object} receiver
  */
  enumerableContentDidChange: function(start, length) {
    this.notifyPropertyChange('[]') ;
    return this ;
  },

  /**
    Call this method from your unknownProperty() handler to implement
    automatic reduced properties.  A reduced property is a property that
    collects its contents dynamically from your array contents.  Reduced
    properties always begin with "@".  Getting this property will call
    reduce() on your array with the function matching the key name as the
    processor.

    The return value of this will be either the return value from the
    reduced property or undefined, which means this key is not a reduced
    property.  You can call this at the top of your unknownProperty handler
    like so:

    {{{
      unknownProperty: function(key, value) {
        var ret = this.handleReduceProperty(key, value) ;
        if (ret === undefined) {
          // process like normal
        }
      }
    }}}

    @param {String} key
      the reduce property key

    @param {Object} value
      a value or undefined.

    @param {Boolean} generateProperty
      only set to false if you do not want an optimized computed property
      handler generated for this.  Not common.

    @returns {Object} the reduced property or undefined
  */
  reducedProperty: function(key, value, generateProperty) {

    if (!key || key.charAt(0) !== '@') return undefined ; // not a reduced property

    // get the reducer key and the reducer
    var matches = key.match(/^@([^(]*)(\(([^)]*)\))?$/) ;
    if (!matches || matches.length < 2) return undefined ; // no match

    var reducerKey = matches[1]; // = 'max' if key = '@max(balance)'
    var reducerProperty = matches[3] ; // = 'balance' if key = '@max(balance)'
    reducerKey = "reduce" + reducerKey.slice(0,1).toUpperCase() + reducerKey.slice(1);
    var reducer = this[reducerKey] ;

    // if there is no reduce function defined for this key, then we can't
    // build a reducer for it.
    if (SC.typeOf(reducer) !== SC.T_FUNCTION) return undefined;

    // if we can't generate the property, just run reduce
    if (generateProperty === NO) {
      return SC.Enumerable.reduce.call(this, reducer, null, reducerProperty) ;
    }

    // ok, found the reducer.  Let's build the computed property and install
    var func = SC._buildReducerFor(reducerKey, reducerProperty);
    var p = this.constructor.prototype ;

    if (p) {
      p[key] = func ;

      // add the function to the properties array so that new instances
      // will have their dependent key registered.
      var props = p._properties || [] ;
      props.push(key) ;
      p._properties = props ;
      this.registerDependentKey(key, '[]') ;
    }

    // and reduce anyway...
    return SC.Enumerable.reduce.call(this, reducer, null, reducerProperty) ;
  },

  /**
    Reducer for @max reduced property.
  */
  reduceMax: function(previousValue, item, index, e, reducerProperty) {
    if (reducerProperty && item) {
      item = item.get ? item.get(reducerProperty) : item[reducerProperty];
    }
    if (previousValue === null) return item ;
    return (item > previousValue) ? item : previousValue ;
  },

  /**
    Reducer for @maxObject reduced property.
  */
  reduceMaxObject: function(previousItem, item, index, e, reducerProperty) {

    // get the value for both the previous and current item.  If no
    // reducerProperty was supplied, use the items themselves.
    var previousValue = previousItem, itemValue = item ;
    if (reducerProperty) {
      if (item) {
        itemValue = item.get ? item.get(reducerProperty) : item[reducerProperty] ;
      }

      if (previousItem) {
        previousValue = previousItem.get ? previousItem.get(reducerProperty) : previousItem[reducerProperty] ;
      }
    }
    if (previousValue === null) return item ;
    return (itemValue > previousValue) ? item : previousItem ;
  },

  /**
    Reducer for @min reduced property.
  */
  reduceMin: function(previousValue, item, index, e, reducerProperty) {
    if (reducerProperty && item) {
      item = item.get ? item.get(reducerProperty) : item[reducerProperty];
    }
    if (previousValue === null) return item ;
    return (item < previousValue) ? item : previousValue ;
  },

  /**
    Reducer for @maxObject reduced property.
  */
  reduceMinObject: function(previousItem, item, index, e, reducerProperty) {

    // get the value for both the previous and current item.  If no
    // reducerProperty was supplied, use the items themselves.
    var previousValue = previousItem, itemValue = item ;
    if (reducerProperty) {
      if (item) {
        itemValue = item.get ? item.get(reducerProperty) : item[reducerProperty] ;
      }

      if (previousItem) {
        previousValue = previousItem.get ? previousItem.get(reducerProperty) : previousItem[reducerProperty] ;
      }
    }
    if (previousValue === null) return item ;
    return (itemValue < previousValue) ? item : previousItem ;
  },

  /**
    Reducer for @average reduced property.
  */
  reduceAverage: function(previousValue, item, index, e, reducerProperty) {
    if (reducerProperty && item) {
      item = item.get ? item.get(reducerProperty) : item[reducerProperty];
    }
    var ret = (previousValue || 0) + item ;
    var len = e.get ? e.get('length') : e.length;
    if (index >= len-1) ret = ret / len; //avg after last item.
    return ret ;
  },

  /**
    Reducer for @sum reduced property.
  */
  reduceSum: function(previousValue, item, index, e, reducerProperty) {
    if (reducerProperty && item) {
      item = item.get ? item.get(reducerProperty) : item[reducerProperty];
    }
    return (previousValue === null) ? item : previousValue + item ;
  }
} ;

// Apply reducers...
SC.mixin(SC.Enumerable, SC.Reducers) ;
SC.mixin(Array.prototype, SC.Reducers) ;
Array.prototype.isEnumerable = YES ;

// ......................................................
// ARRAY SUPPORT
//

// Implement the same enhancements on Array.  We use specialized methods
// because working with arrays are so common.
(function() {

  // These methods will be applied even if they already exist b/c we do it
  // better.
  var alwaysMixin = {

    // this is supported so you can get an enumerator.  The rest of the
    // methods do not use this just to squeeze every last ounce of perf as
    // possible.
    nextObject: SC.Enumerable.nextObject,
    enumerator: SC.Enumerable.enumerator,
    firstObject: SC.Enumerable.firstObject,
    lastObject: SC.Enumerable.lastObject,
    sortProperty: SC.Enumerable.sortProperty,

    // see above...
    mapProperty: function(key) {
      var len = this.length ;
      var ret  = [];
      for(var idx=0;idx<len;idx++) {
        var next = this[idx] ;
        ret[idx] = next ? (next.get ? next.get(key) : next[key]) : null;
      }
      return ret ;
    },

    filterProperty: function(key, value) {
      var len = this.length ;
      var ret  = [];
      for(var idx=0;idx<len;idx++) {
        var next = this[idx] ;
        var cur = next ? (next.get ? next.get(key) : next[key]) : null;
        var matched = (value === undefined) ? !!cur : SC.isEqual(cur, value);
        if (matched) ret.push(next) ;
      }
      return ret ;
    },

    //returns a matrix
    groupBy: function(key) {
      var len = this.length,
          ret = [],
          grouped = [], 
          keyValues = [],
          idx, next, cur;
      
      for(idx=0;idx<len;idx++) {
        next = this[idx] ;
        cur = next ? (next.get ? next.get(key) : next[key]) : null;
        if(SC.none(grouped[cur])){ grouped[cur] = []; keyValues.push(cur); }
        grouped[cur].push(next);
      }
      
      for(idx=0,len=keyValues.length; idx < len; idx++){
        ret.push(grouped[keyValues[idx]]);        
      }
      return ret ;
    },
    
    find: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;
      var len = this.length ;
      if (target === undefined) target = null;

      var next, ret = null, found = NO;
      for(var idx=0;idx<len && !found;idx++) {
        next = this[idx] ;
        if(found = callback.call(target, next, idx, this)) ret = next ;
      }
      next = null;
      return ret ;
    },

    findProperty: function(key, value) {
      var len = this.length ;
      var next, cur, found=NO, ret=null;
      for(var idx=0;idx<len && !found;idx++) {
        cur = (next=this[idx]) ? (next.get ? next.get(key): next[key]):null;
        found = (value === undefined) ? !!cur : SC.isEqual(cur, value);
        if (found) ret = next ;
      }
      next=null;
      return ret ;
    },

    everyProperty: function(key, value) {
      var len = this.length ;
      var ret  = YES;
      for(var idx=0;ret && (idx<len);idx++) {
        var next = this[idx] ;
        var cur = next ? (next.get ? next.get(key) : next[key]) : null;
        ret = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      }
      return ret ;
    },

    someProperty: function(key, value) {
      var len = this.length ;
      var ret  = NO;
      for(var idx=0; !ret && (idx<len); idx++) {
        var next = this[idx] ;
        var cur = next ? (next.get ? next.get(key) : next[key]) : null;
        ret = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      }
      return ret ;  // return the invert
    },

    invoke: function(methodName) {
      var len = this.length ;
      if (len <= 0) return [] ; // nothing to invoke....

      var idx;

      // collect the arguments
      var args = [] ;
      var alen = arguments.length ;
      if (alen > 1) {
        for(idx=1;idx<alen;idx++) args.push(arguments[idx]) ;
      }

      // call invoke
      var ret = [] ;
      for(idx=0;idx<len;idx++) {
        var next = this[idx] ;
        var method = next ? next[methodName] : null ;
        if (method) ret[idx] = method.apply(next, args) ;
      }
      return ret ;
    },

    invokeWhile: function(targetValue, methodName) {
      var len = this.length ;
      if (len <= 0) return null ; // nothing to invoke....

      var idx;

      // collect the arguments
      var args = [] ;
      var alen = arguments.length ;
      if (alen > 2) {
        for(idx=2;idx<alen;idx++) args.push(arguments[idx]) ;
      }

      // call invoke
      var ret = targetValue ;
      for(idx=0;(ret === targetValue) && (idx<len);idx++) {
        var next = this[idx] ;
        var method = next ? next[methodName] : null ;
        if (method) ret = method.apply(next, args) ;
      }
      return ret ;
    },

    toArray: function() {
      var len = this.length ;
      if (len <= 0) return [] ; // nothing to invoke....

      // call invoke
      var ret = [] ;
      for(var idx=0;idx<len;idx++) {
        var next = this[idx] ;
        ret.push(next) ;
      }
      return ret ;
    },

    getEach: function(key) {
      var ret = [];
      var len = this.length ;
      for(var idx=0;idx<len;idx++) {
        var obj = this[idx];
        ret[idx] = obj ? (obj.get ? obj.get(key) : obj[key]) : null;
      }
      return ret ;
    },

    setEach: function(key, value) {
      var len = this.length;
      for(var idx=0;idx<len;idx++) {
        var obj = this[idx];
        if (obj) {
          if (obj.set) {
            obj.set(key, value);
          } else obj[key] = value ;
        }
      }
      return this ;
    }

  };

  // These methods will only be applied if they are not already defined b/c
  // the browser is probably getting it.
  var mixinIfMissing = {

    // QUESTION: The lack of DRY is burning my eyes [YK]
    forEach: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;

      // QUESTION: Is this necessary?
      if (target === undefined) target = null;

      for(var i=0, l=this.length; i<l; i++) {
        var next = this[i] ;
        callback.call(target, next, i, this);
      }
      return this ;
    },

    map: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;

      if (target === undefined) target = null;

      var ret  = [];
      for(var i=0, l=this.length; i<l; i++) {
        var next = this[i] ;
        ret[i] = callback.call(target, next, i, this) ;
      }
      return ret ;
    },

    filter: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;

      if (target === undefined) target = null;

      var ret  = [];
      for(var i=0, l=this.length; i<l; i++) {
        var next = this[i] ;
        if(callback.call(target, next, i, this)) ret.push(next) ;
      }
      return ret ;
    },

    every: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;
      var len = this.length ;
      if (target === undefined) target = null;

      var ret  = YES;
      for(var idx=0;ret && (idx<len);idx++) {
        var next = this[idx] ;
        if(!callback.call(target, next, idx, this)) ret = NO ;
      }
      return ret ;
    },

    some: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;
      var len = this.length ;
      if (target === undefined) target = null;

      var ret  = NO;
      for(var idx=0;(!ret) && (idx<len);idx++) {
        var next = this[idx] ;
        if(callback.call(target, next, idx, this)) ret = YES ;
      }
      return ret ;
    },

    reduce: function(callback, initialValue, reducerProperty) {
      if (typeof callback !== "function") throw new TypeError() ;
      var len = this.length ;

      // no value to return if no initial value & empty
      if (len===0 && initialValue === undefined) throw new TypeError();

      var ret  = initialValue;
      for(var idx=0;idx<len;idx++) {
        var next = this[idx] ;

        // while ret is still undefined, just set the first value we get as
        // ret. this is not the ideal behavior actually but it matches the
        // FireFox implementation... :(
        if (next !== null) {
          if (ret === undefined) {
            ret = next ;
          } else {
            ret = callback.call(null, ret, next, idx, this, reducerProperty);
          }
        }
      }

      // uh oh...we never found a value!
      if (ret === undefined) throw new TypeError() ;
      return ret ;
    }
  };

  // Apply methods if missing...
  for(var key in mixinIfMissing) {
    if (!mixinIfMissing.hasOwnProperty(key)) continue ;

    // The mixinIfMissing methods should be applied if they are not defined.
    // If Prototype 1.6 is included, some of these methods will be defined
    // already, but we want to override them anyway in this special case
    // because our version is faster and functionally identitical.
    if (!Array.prototype[key] || ((typeof Prototype === 'object') && Prototype.Version.match(/^1\.6/))) {
      Array.prototype[key] = mixinIfMissing[key] ;
    }
  }

  // Apply other methods...
  SC.mixin(Array.prototype, alwaysMixin) ;

})() ;


/* >>>>>>>>>> BEGIN source/system/range_observer.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


/** @class

  A RangeObserver is used by Arrays to automatically observe all of the
  objects in a particular range on the array.  Whenever any property on one
  of those objects changes, it will notify its delegate.  Likewise, whenever
  the contents of the array itself changes, it will notify its delegate and
  possibly update its own registration.

  This implementation uses only SC.Array methods.  It can be used on any
  object that complies with SC.Array.  You may, however, choose to subclass
  this object in a way that is more optimized for your particular design.

  @since SproutCore 1.0
*/
SC.RangeObserver = {

  /**
    Walk like a duck.

    @property {Boolean}
  */
  isRangeObserver: YES,

  /** @private */
  toString: function() {
    var base = this.indexes ? this.indexes.toString() : "SC.IndexSet<..>";
    return base.replace('IndexSet', 'RangeObserver(%@)'.fmt(SC.guidFor(this)));
  },

  /**
    Creates a new range observer owned by the source.  The indexSet you pass
    must identify the indexes you are interested in observing.  The passed
    target/method will be invoked whenever the observed range changes.

    Note that changes to a range are buffered until the end of a run loop
    unless a property on the record itself changes.

    @param {SC.Array} source the source array
    @param {SC.IndexSet} indexSet set of indexes to observer
    @param {Object} target the target
    @param {Function|String} method the method to invoke
    @param {Object} context optional context to include in callback
    @param {Boolean} isDeep if YES, observe property changes as well
    @returns {SC.RangeObserver} instance
  */
  create: function(source, indexSet, target, method, context, isDeep) {
    var ret = SC.beget(this);
    ret.source = source;
    ret.indexes = indexSet ? indexSet.frozenCopy() : null;
    ret.target = target;
    ret.method = method;
    ret.context = context ;
    ret.isDeep  = isDeep || false ;
    ret.beginObserving();
    return ret ;
  },

  /**
    Create subclasses for the RangeObserver.  Pass one or more attribute
    hashes.  Use this to create customized RangeObservers if needed for your
    classes.

    @param {Hash} attrs one or more attribute hashes
    @returns {SC.RangeObserver} extended range observer class
  */
  extend: function(attrs) {
    var ret = SC.beget(this), args = arguments;
    for(var i=0, l=args.length; i<l; i++) { SC.mixin(ret, args[i]); }
    return ret ;
  },

  /**
    Destroys an active ranger observer, cleaning up first.

    @param {SC.Array} source the source array
    @returns {SC.RangeObserver} receiver
  */
  destroy: function(source) {
    this.endObserving();
    return this;
  },

  /**
    Updates the set of indexes the range observer applies to.  This will
    stop observing the old objects for changes and start observing the
    new objects instead.

    @param {SC.Array} source the source array
    @returns {SC.RangeObserver} receiver
  */
  update: function(source, indexSet) {
    if (this.indexes && this.indexes.isEqual(indexSet)) { return this ; }

    this.indexes = indexSet ? indexSet.frozenCopy() : null ;
    this.endObserving().beginObserving();
    return this;
  },

  /**
    Configures observing for each item in the current range.  Should update
    the observing array with the list of observed objects so they can be
    torn down later

    @returns {SC.RangeObserver} receiver
  */
  beginObserving: function() {
    if ( !this.isDeep ) { return this; } // nothing to do

    var observing = this.observing = this.observing || SC.CoreSet.create();

    // cache iterator function to keep things fast
    var func = this._beginObservingForEach, source = this.source;

    if( !func ) {
      func = this._beginObservingForEach = function(idx) {
        var obj = source.objectAt(idx);
        if (obj && obj.addObserver) {
          observing.push(obj);
          obj._kvo_needsRangeObserver = true ;
        }
      };
    }

    this.indexes.forEach(func);

    // add to pending range observers queue so that if any of these objects
    // change we will have a chance to setup observing on them.
    this.isObserving = false ;
    SC.Observers.addPendingRangeObserver(this);

    return this;
  },

  /** @private
    Called when an object that appears to need range observers has changed.
    Check to see if the range observer contains this object in its list.  If
    it does, go ahead and setup observers on all objects and remove ourself
    from the queue.
  */
  setupPending: function(object) {
    var observing = this.observing ;

    if ( this.isObserving || !observing || (observing.get('length')===0) ) {
      return true ;
    }

    if (observing.contains(object)) {
      this.isObserving = true ;

      // cache iterator function to keep things fast
      var func = this._setupPendingForEach;
      if (!func) {
        var source = this.source,
            method = this.objectPropertyDidChange,
            self   = this;

        func = this._setupPendingForEach = function(idx) {
          var obj = source.objectAt(idx),
              guid = SC.guidFor(obj),
              key ;

          if (obj && obj.addObserver) {
            observing.push(obj);
            obj.addObserver('*', self, method);

            // also save idx of object on range observer itself.  If there is
            // more than one idx, convert to IndexSet.
            key = self[guid];
            if ( key == null ) {
              self[guid] = idx ;
            } else if (key.isIndexSet) {
              key.add(idx);
            } else {
              self[guid] = SC.IndexSet.create(key).add(idx);
            }

          }
        };
      }
      this.indexes.forEach(func);
      return true ;
    } else {
      return false ;
    }
  },

  /**
    Remove observers for any objects currently begin observed.  This is
    called whenever the observed range changes due to an array change or
    due to destroying the observer.

    @returns {SC.RangeObserver} receiver
  */
  endObserving: function() {
    if ( !this.isDeep ) return this; // nothing to do

    var observing = this.observing;

    if (this.isObserving) {
      var meth      = this.objectPropertyDidChange,
          source    = this.source,
          idx, lim, obj;

      if (observing) {
        lim = observing.length;
        for(idx=0;idx<lim;idx++) {
          obj = observing[idx];
          obj.removeObserver('*', this, meth);
          this[SC.guidFor(obj)] = null;
        }
        observing.length = 0 ; // reset
      }

      this.isObserving = false ;
    }

    if (observing) { observing.clear(); } // empty set.
    return this ;
  },

  /**
    Whenever the actual objects in the range changes, notify the delegate
    then begin observing again.  Usually this method will be passed an
    IndexSet with the changed indexes.  The range observer will only notify
    its delegate if the changed indexes include some of all of the indexes
    this range observer is monitoring.

    @param {SC.IndexSet} changes optional set of changed indexes
    @returns {SC.RangeObserver} receiver
  */
  rangeDidChange: function(changes) {
    var indexes = this.indexes;
    if ( !changes || !indexes || indexes.intersects(changes) ) {
      this.endObserving(); // remove old observers
      this.method.call(this.target, this.source, null, '[]', changes, this.context);
      this.beginObserving(); // setup new ones
    }
    return this ;
  },

  /**
    Whenever an object changes, notify the delegate

    @param {Object} the object that changed
    @param {String} key the property that changed
    @returns {SC.RangeObserver} receiver
  */
  objectPropertyDidChange: function(object, key, value, rev) {
    var context = this.context,
        method  = this.method,
        guid    = SC.guidFor(object),
        index   = this[guid];

    // lazily convert index to IndexSet.
    if ( index && !index.isIndexSet ) {
      index = this[guid] = SC.IndexSet.create(index).freeze();
    }

    method.call(this.target, this.source, object, key, index, context || rev, rev);
  }

};

/* >>>>>>>>>> BEGIN source/mixins/array.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

// note: SC.Observable also enhances array.  make sure we are called after
// SC.Observable so our version of unknownProperty wins.
sc_require('mixins/observable');
sc_require('mixins/enumerable');
sc_require('system/range_observer');

SC.OUT_OF_RANGE_EXCEPTION = "Index out of range" ;

/**
  @namespace

  This module implements Observer-friendly Array-like behavior.  This mixin is
  picked up by the Array class as well as other controllers, etc. that want to
  appear to be arrays.

  Unlike SC.Enumerable, this mixin defines methods specifically for
  collections that provide index-ordered access to their contents.  When you
  are designing code that needs to accept any kind of Array-like object, you
  should use these methods instead of Array primitives because these will
  properly notify observers of changes to the array.

  Although these methods are efficient, they do add a layer of indirection to
  your application so it is a good idea to use them only when you need the
  flexibility of using both true JavaScript arrays and "virtual" arrays such
  as controllers and collections.

  You can use the methods defined in this module to access and modify array
  contents in a KVO-friendly way.  You can also be notified whenever the
  membership if an array changes by changing the syntax of the property to
  .observes('*myProperty.[]') .

  To support SC.Array in your own class, you must override two
  primitives to use it: replace() and objectAt().

  Note that the SC.Array mixin also incorporates the SC.Enumerable mixin.  All
  SC.Array-like objects are also enumerable.

  @extends SC.Enumerable
  @since SproutCore 0.9.0
*/
SC.Array = {

  /**
    Walk like a duck - use isSCArray to avoid conflicts
  */
  isSCArray: YES,

  /**
    @field {Number} length

    Your array must support the length property.  Your replace methods should
    set this property whenever it changes.
  */
  // length: 0,

  /**
    This is one of the primitves you must implement to support SC.Array.  You
    should replace amt objects started at idx with the objects in the passed
    array.  You should also call this.enumerableContentDidChange() ;

    @param {Number} idx
      Starting index in the array to replace.  If idx >= length, then append to
      the end of the array.

    @param {Number} amt
      Number of elements that should be removed from the array, starting at
      *idx*.

    @param {Array} objects
      An array of zero or more objects that should be inserted into the array at
      *idx*
  */
  replace: function(idx, amt, objects) {
    throw "replace() must be implemented to support SC.Array" ;
  },

  /**
    This is one of the primitives you must implement to support SC.Array.
    Returns the object at the named index.  If your object supports retrieving
    the value of an array item using get() (i.e. myArray.get(0)), then you do
    not need to implement this method yourself.

    @param {Number} idx
      The index of the item to return.  If idx exceeds the current length,
      return null.
  */
  objectAt: function(idx) {
    if (idx < 0) return undefined ;
    if (idx >= this.get('length')) return undefined;
    return this.get(idx);
  },

  /**
    @field []

    This is the handler for the special array content property.  If you get
    this property, it will return this.  If you set this property it a new
    array, it will replace the current content.

    This property overrides the default property defined in SC.Enumerable.
  */
  '[]': function(key, value) {
    if (value !== undefined) {
      this.replace(0, this.get('length'), value) ;
    }
    return this ;
  }.property(),

  /**
    This will use the primitive replace() method to insert an object at the
    specified index.

    @param {Number} idx index of insert the object at.
    @param {Object} object object to insert
  */
  insertAt: function(idx, object) {
    if (idx > this.get('length')) throw SC.OUT_OF_RANGE_EXCEPTION ;
    this.replace(idx,0,[object]) ;
    return this ;
  },

  /**
    Remove an object at the specified index using the replace() primitive
    method.  You can pass either a single index, a start and a length or an
    index set.

    If you pass a single index or a start and length that is beyond the
    length this method will throw an SC.OUT_OF_RANGE_EXCEPTION

    @param {Number|SC.IndexSet} start index, start of range, or index set
    @param {Number} length length of passing range
    @returns {Object} receiver
  */
  removeAt: function(start, length) {

    var delta = 0, // used to shift range
        empty = [];

    if (typeof start === SC.T_NUMBER) {

      if ((start < 0) || (start >= this.get('length'))) {
        throw SC.OUT_OF_RANGE_EXCEPTION;
      }

      // fast case
      if (length === undefined) {
        this.replace(start,1,empty);
        return this ;
      } else {
        start = SC.IndexSet.create(start, length);
      }
    }

    this.beginPropertyChanges();
    start.forEachRange(function(start, length) {
      start -= delta ;
      delta += length ;
      this.replace(start, length, empty); // remove!
    }, this);
    this.endPropertyChanges();

    return this ;
  },

  /**
    Search the array of this object, removing any occurrences of it.
    @param {object} obj object to remove
  */
  removeObject: function(obj) {
    var loc = this.get('length') || 0;
    while(--loc >= 0) {
      var curObject = this.objectAt(loc) ;
      if (curObject == obj) this.removeAt(loc) ;
    }
    return this ;
  },

  /**
    Search the array for the passed set of objects and remove any occurrences
    of the.

    @param {SC.Enumerable} objects the objects to remove
    @returns {SC.Array} receiver
  */
  removeObjects: function(objects) {
    this.beginPropertyChanges();
    objects.forEach(function(obj) { this.removeObject(obj); }, this);
    this.endPropertyChanges();
    return this;
  },

  /**
    Push the object onto the end of the array.  Works just like push() but it
    is KVO-compliant.
  */
  pushObject: function(obj) {
    this.insertAt(this.get('length'), obj) ;
    return obj ;
  },


  /**
    Add the objects in the passed numerable to the end of the array.  Defers
    notifying observers of the change until all objects are added.

    @param {SC.Enumerable} objects the objects to add
    @returns {SC.Array} receiver
  */
  pushObjects: function(objects) {
    this.beginPropertyChanges();
    objects.forEach(function(obj) { this.pushObject(obj); }, this);
    this.endPropertyChanges();
    return this;
  },

  /**
    Pop object from array or nil if none are left.  Works just like pop() but
    it is KVO-compliant.
  */
  popObject: function() {
    var len = this.get('length') ;
    if (len === 0) return null ;

    var ret = this.objectAt(len-1) ;
    this.removeAt(len-1) ;
    return ret ;
  },

  /**
    Shift an object from start of array or nil if none are left.  Works just
    like shift() but it is KVO-compliant.
  */
  shiftObject: function() {
    if (this.get('length') === 0) return null ;
    var ret = this.objectAt(0) ;
    this.removeAt(0) ;
    return ret ;
  },

  /**
    Unshift an object to start of array.  Works just like unshift() but it is
    KVO-compliant.
  */
  unshiftObject: function(obj) {
    this.insertAt(0, obj) ;
    return obj ;
  },


  /**
    Adds the named objects to the beginning of the array.  Defers notifying
    observers until all objects have been added.

    @param {SC.Enumerable} objects the objects to add
    @returns {SC.Array} receiver
  */
  unshiftObjects: function(objects) {
    this.beginPropertyChanges();
    objects.forEach(function(obj) { this.unshiftObject(obj); }, this);
    this.endPropertyChanges();
    return this;
  },

  /**
    Compares each item in the array.  Returns true if they are equal.
  */
  isEqual: function(ary) {
    if (!ary) return false ;
    if (ary == this) return true;

    var loc = ary.get('length') ;
    if (loc != this.get('length')) return false ;

    while(--loc >= 0) {
      if (!SC.isEqual(ary.objectAt(loc), this.objectAt(loc))) return false ;
    }
    return true ;
  },

  /**
    Generates a new array with the contents of the old array, sans any null
    values.

    @returns {Array}
  */
  compact: function() { return this.without(null); },

  /**
    Generates a new array with the contents of the old array, sans the passed
    value.

    @param {Object} value
    @returns {Array}
  */
  without: function(value) {
    if (this.indexOf(value)<0) return this; // value not present.
    var ret = [] ;
    this.forEach(function(k) {
      if (k !== value) ret[ret.length] = k;
    }) ;
    return ret ;
  },

  /**
    Generates a new array with only unique values from the contents of the
    old array.

    @returns {Array}
  */
  uniq: function() {
    var ret = [] ;
    this.forEach(function(k){
      if (ret.indexOf(k)<0) ret[ret.length] = k;
    });
    return ret ;
  },

  /**
    Returns the largest Number in an array of Numbers. Make sure the array
    only contains values of type Number to get expected result.

    Note: This only works for dense arrays.

    @returns {Number}
  */
  max: function() {
    return Math.max.apply(Math, this);
  },

  /**
    Returns the smallest Number in an array of Numbers. Make sure the array
    only contains values of type Number to get expected result.

    Note: This only works for dense arrays.

    @returns {Number}
  */
  min: function() {
    return Math.min.apply(Math, this);
  },

  rangeObserverClass: SC.RangeObserver,

  /**
    Returns YES if object is in the array

    @param {Object} object to look for
    @returns {Boolean}
  */
  contains: function(obj){
    return this.indexOf(obj) >= 0;
  },

  /**
    Creates a new range observer on the receiver.  The target/method callback
    you provide will be invoked anytime any property on the objects in the
    specified range changes.  It will also be invoked if the objects in the
    range itself changes also.

    The callback for a range observer should have the signature:

    {{{
      function rangePropertyDidChange(array, objects, key, indexes, conext)
    }}}

    If the passed key is '[]' it means that the object itself changed.

    The return value from this method is an opaque reference to the
    range observer object.  You can use this reference to destroy the
    range observer when you are done with it or to update its range.

    @param {SC.IndexSet} indexes indexes to observe
    @param {Object} target object to invoke on change
    @param {String|Function} method the method to invoke
    @param {Object} context optional context
    @returns {SC.RangeObserver} range observer
  */
  addRangeObserver: function(indexes, target, method, context) {
    var rangeob = this._array_rangeObservers;
    if (!rangeob) rangeob = this._array_rangeObservers = SC.CoreSet.create() ;

    // The first time a range observer is added, cache the current length so
    // we can properly notify observers the first time through
    if (this._array_oldLength===undefined) {
      this._array_oldLength = this.get('length') ;
    }

    var C = this.rangeObserverClass ;
    var isDeep = NO; //disable this feature for now
    var ret = C.create(this, indexes, target, method, context, isDeep) ;
    rangeob.add(ret);

    // first time a range observer is added, begin observing the [] property
    if (!this._array_isNotifyingRangeObservers) {
      this._array_isNotifyingRangeObservers = YES ;
      this.addObserver('[]', this, this._array_notifyRangeObservers);
    }

    return ret ;
  },

  /**
    Moves a range observer so that it observes a new range of objects on the
    array.  You must have an existing range observer object from a call to
    addRangeObserver().

    The return value should replace the old range observer object that you
    pass in.

    @param {SC.RangeObserver} rangeObserver the range observer
    @param {SC.IndexSet} indexes new indexes to observe
    @returns {SC.RangeObserver} the range observer (or a new one)
  */
  updateRangeObserver: function(rangeObserver, indexes) {
    return rangeObserver.update(this, indexes);
  },
  
  /**
    Removes a range observer from the receiver.  The range observer must
    already be active on the array.

    The return value should replace the old range observer object.  It will
    usually be null.

    @param {SC.RangeObserver} rangeObserver the range observer
    @returns {SC.RangeObserver} updated range observer or null
  */
  removeRangeObserver: function(rangeObserver) {
    var ret = rangeObserver.destroy(this);
    var rangeob = this._array_rangeObservers;
    if (rangeob) rangeob.remove(rangeObserver) ; // clear
    return ret ;
  },

  /**
    Updates observers with content change.  To support range observers,
    you must pass three change parameters to this method.  Otherwise this
    method will assume the entire range has changed.

    This also assumes you have already updated the length property.
    @param {Number} start the starting index of the change
    @param {Number} amt the final range of objects changed
    @param {Number} delta if you added or removed objects, the delta change
    @returns {SC.Array} receiver
  */
  enumerableContentDidChange: function(start, amt, delta) {
    var rangeob = this._array_rangeObservers,
        oldlen  = this._array_oldLength,
        newlen, length, changes ;

    this.beginPropertyChanges();
    this.notifyPropertyChange('length'); // flush caches

    // schedule info for range observers
    if (rangeob && rangeob.length>0) {

      // if no oldLength has been cached, just assume 0
      if (oldlen === undefined) oldlen = 0;
      this._array_oldLength = newlen = this.get('length');

      // normalize input parameters
      // if delta was not passed, assume it is the different between the
      // new and old length.
      if (start === undefined) start = 0;
      if (delta === undefined) delta = newlen - oldlen ;
      if (delta !== 0 || amt === undefined) {
        length = newlen - start ;
        if (delta<0) length -= delta; // cover removed range as well
      } else {
        length = amt ;
      }

      changes = this._array_rangeChanges;
      if (!changes) changes = this._array_rangeChanges = SC.IndexSet.create();
      changes.add(start, length);
    }

    this.notifyPropertyChange('[]') ;
    this.endPropertyChanges();

    return this ;
  },

  /**  @private
    Observer fires whenever the '[]' property changes.  If there are
    range observers, will notify observers of change.
  */
  _array_notifyRangeObservers: function() {
    var rangeob = this._array_rangeObservers,
        changes = this._array_rangeChanges,
        len     = rangeob ? rangeob.length : 0,
        idx, cur;

    if (len > 0 && changes && changes.length > 0) {
      for(idx=0;idx<len;idx++) rangeob[idx].rangeDidChange(changes);
      changes.clear(); // reset for later notifications
    }
  }

} ;

// Add SC.Array to the built-in array before we add SC.Enumerable to SC.Array
// since built-in Array's are already enumerable.
SC.mixin(Array.prototype, SC.Array) ;
SC.Array = SC.mixin({}, SC.Enumerable, SC.Array) ;

// Add any extra methods to SC.Array that are native to the built-in Array.
/**
  Returns a new array that is a slice of the receiver.  This implementation
  uses the observable array methods to retrieve the objects for the new
  slice.

  @param beginIndex {Integer} (Optional) index to begin slicing from.
  @param endIndex {Integer} (Optional) index to end the slice at.
  @returns {Array} New array with specified slice
*/
SC.Array.slice = function(beginIndex, endIndex) {
  var ret = [];
  var length = this.get('length') ;
  if (SC.none(beginIndex)) beginIndex = 0 ;
  if (SC.none(endIndex) || (endIndex > length)) endIndex = length ;
  while(beginIndex < endIndex) ret[ret.length] = this.objectAt(beginIndex++) ;
  return ret ;
}  ;

/**
  Returns the index for a particular object in the index.

  @param {Object} object the item to search for
  @param {NUmber} startAt optional starting location to search, default 0
  @returns {Number} index of -1 if not found
*/
SC.Array.indexOf = function(object, startAt) {
  var idx, len = this.get('length');

  if (startAt === undefined) startAt = 0;
  else startAt = (startAt < 0) ? Math.ceil(startAt) : Math.floor(startAt);
  if (startAt < 0) startAt += len;

  for(idx=startAt;idx<len;idx++) {
    if (this.objectAt(idx, YES) === object) return idx ;
  }
  return -1;
};

// Some browsers do not support indexOf natively.  Patch if needed
if (!Array.prototype.indexOf) Array.prototype.indexOf = SC.Array.indexOf;

/**
  Returns the last index for a particular object in the index.

  @param {Object} object the item to search for
  @param {NUmber} startAt optional starting location to search, default 0
  @returns {Number} index of -1 if not found
*/
SC.Array.lastIndexOf = function(object, startAt) {
  var idx, len = this.get('length');

  if (startAt === undefined) startAt = len-1;
  else startAt = (startAt < 0) ? Math.ceil(startAt) : Math.floor(startAt);
  if (startAt < 0) startAt += len;

  for(idx=startAt;idx>=0;idx--) {
    if (this.objectAt(idx) === object) return idx ;
  }
  return -1;
};

// Some browsers do not support lastIndexOf natively.  Patch if needed
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = SC.Array.lastIndexOf;
}

// ......................................................
// ARRAY SUPPORT
//
// Implement the same enhancements on Array.  We use specialized methods
// because working with arrays are so common.
(function() {
  SC.mixin(Array.prototype, {

    // primitive for array support.
    replace: function(idx, amt, objects) {
      if (this.isFrozen) throw SC.FROZEN_ERROR ;
      if (!objects || objects.length === 0) {
        this.splice(idx, amt) ;
      } else {
        var args = [idx, amt].concat(objects) ;
        this.splice.apply(this,args) ;
      }

      // if we replaced exactly the same number of items, then pass only the
      // replaced range.  Otherwise, pass the full remaining array length
      // since everything has shifted
      var len = objects ? (objects.get ? objects.get('length') : objects.length) : 0;
      this.enumerableContentDidChange(idx, amt, len - amt) ;
      return this ;
    },

    // If you ask for an unknown property, then try to collect the value
    // from member items.
    unknownProperty: function(key, value) {
      var ret = this.reducedProperty(key, value) ;
      if ((value !== undefined) && ret === undefined) {
        ret = this[key] = value;
      }
      return ret ;
    }

  });

  // If browser did not implement indexOf natively, then override with
  // specialized version
  var indexOf = Array.prototype.indexOf;
  if (!indexOf || (indexOf === SC.Array.indexOf)) {
    Array.prototype.indexOf = function(object, startAt) {
      var idx, len = this.length;

      if (startAt === undefined) startAt = 0;
      else startAt = (startAt < 0) ? Math.ceil(startAt) : Math.floor(startAt);
      if (startAt < 0) startAt += len;

      for(idx=startAt;idx<len;idx++) {
        if (this[idx] === object) return idx ;
      }
      return -1;
    } ;
  }

  var lastIndexOf = Array.prototype.lastIndexOf ;
  if (!lastIndexOf || (lastIndexOf === SC.Array.lastIndexOf)) {
    Array.prototype.lastIndexOf = function(object, startAt) {
      var idx, len = this.length;

      if (startAt === undefined) startAt = len-1;
      else startAt = (startAt < 0) ? Math.ceil(startAt) : Math.floor(startAt);
      if (startAt < 0) startAt += len;

      for(idx=startAt;idx>=0;idx--) {
        if (this[idx] === object) return idx ;
      }
      return -1;
    };
  }

})();

/* >>>>>>>>>> BEGIN source/mixins/comparable.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @namespace

  Implements some standard methods for comparing objects. Add this mixin to
  any class you create that can compare its instances.

  You should implement the compare() method.

  @since SproutCore 1.0
*/
SC.Comparable = {

  /**
    walk like a duck. Indicates that the object can be compared.

    @type Boolean
  */
  isComparable: YES,

  /**
    Override to return the result of the comparison of the two parameters. The
    compare method should return
      -1 if a < b
       0 if a == b
       1 if a > b

    Default implementation raises
    an exception.

    @param a {Object} the first object to compare
    @param b {Object} the second object to compare
    @returns {Integer} the result of the comparison
  */
  compare: function(a, b) {
    throw "%@.compare() is not implemented".fmt(this.toString());
  }

};

/* >>>>>>>>>> BEGIN source/mixins/copyable.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @namespace

  Impelements some standard methods for copying an object.  Add this mixin to
  any object you create that can create a copy of itself.  This mixin is
  added automatically to the built-in array.

  You should generally implement the copy() method to return a copy of the
  receiver.

  Note that frozenCopy() will only work if you also implement SC.Freezable.

  @since SproutCore 1.0
*/
SC.Copyable = {

  /**
    Walk like a duck.  Indicates that the object can be copied.

    @type Boolean
  */
  isCopyable: YES,

  /**
    Override to return a copy of the receiver.  Default implementation raises
    an exception.

    @param deep {Boolean} if true, a deep copy of the object should be made
    @returns {Object} copy of receiver
  */
  copy: function(deep) {
    throw "%@.copy() is not implemented";
  },

  /**
    If the object implements SC.Freezable, then this will return a new copy
    if the object is not frozen and the receiver if the object is frozen.

    Raises an exception if you try to call this method on a object that does
    not support freezing.

    You should use this method whenever you want a copy of a freezable object
    since a freezable object can simply return itself without actually
    consuming more memory.

    @returns {Object} copy of receiver or receiver
  */
  frozenCopy: function() {
    var isFrozen = this.get ? this.get('isFrozen') : this.isFrozen;
    if (isFrozen === YES) return this;
    else if (isFrozen === undefined) throw "%@ does not support freezing".fmt(this);
    else return this.copy().freeze();
  }
};

// Make Array copyable
SC.mixin(Array.prototype, SC.Copyable);
Array.prototype.copy = function(deep) {
	var ret = this.slice(), idx;
	if (deep) {
      idx = ret.length;
	  while (idx--) ret[idx] = SC.copy(ret[idx], true);
	}
	return ret;
}

/* >>>>>>>>>> BEGIN source/mixins/freezable.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


/**
  Standard Error that should be raised when you try to modify a frozen object.

  @property {Error}
*/
SC.FROZEN_ERROR = new Error("Cannot modify a frozen object");

/**
  @namespace

  The SC.Freezable mixin implements some basic methods for marking an object
  as frozen.  Once an object is frozen it should be read only.  No changes
  may be made the internal state of the object.

  h2. Enforcement

  To fully support freezing in your subclass, you must include this mixin and
  override any method that might alter any property on the object to instead
  raise an exception.  You can check the state of an object by checking the
  isFrozen property.

  Although future versions of JavaScript may support language-level freezing
  object objects, that is not the case today.  Even if an object is freezable,
  it is still technically possible to modify the object, even though it could
  break other parts of your application that do not expect a frozen object to
  change.  It is, therefore, very important that you always respect the
  isFrozen property on all freezable objects.

  h2. Example

  The example below shows a simple object that implement the SC.Freezable
  protocol.

  {{{
    Contact = SC.Object.extend(SC.Freezable, {

      firstName: null,

      lastName: null,

      // swaps the names
      swapNames: function() {
        if (this.get('isFrozen')) throw SC.FROZEN_ERROR;
        var tmp = this.get('firstName');
        this.set('firstName', this.get('lastName'));
        this.set('lastName', tmp);
        return this;
      }

    });

    c = Context.create({ firstName: "John", lastName: "Doe" });
    c.swapNames();  => returns c
    c.freeze();
    c.swapNames();  => EXCEPTION

  }}}

  h2. Copying

  Usually the SC.Freezable protocol is implemented in cooperation with the
  SC.Copyable protocol, which defines a frozenCopy() method that will return
  a frozen object, if the object implements this method as well.

*/
SC.Freezable = {

  /**
    Walk like a duck.

    @property {Boolean}
  */
  isFreezable: YES,

  /**
    Set to YES when the object is frozen.  Use this property to detect whether
    your object is frozen or not.

    @property {Boolean}
  */
  isFrozen: NO,

  /**
    Freezes the object.  Once this method has been called the object should
    no longer allow any properties to be edited.

    @returns {Object} reciever
  */
  freeze: function() {
    // NOTE: Once someone actually implements Object.freeze() in the browser,
    // add a call to that here also.

    if (this.set) this.set('isFrozen', YES);
    else this.isFrozen = YES;
    return this;
  }

};


// Add to Array
SC.mixin(Array.prototype, SC.Freezable);

/* >>>>>>>>>> BEGIN source/system/set.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('mixins/enumerable') ;
sc_require('mixins/observable') ;
sc_require('mixins/freezable');
sc_require('mixins/copyable');

// IMPORTANT NOTE:  This file actually defines two classes:
// SC.Set is a fully observable set class documented below.
// SC._CoreSet is just like SC.Set but is not observable.  This is required
// because SC.Observable is built on using sets and requires sets without
// observability.
//
// We use pointer swizzling below to swap around the actual definitions so
// that the documentation will turn out right.  (The docs should only
// define SC.Set - not SC._CoreSet)

/**
  @class

  An unordered collection of objects.

  A Set works a bit like an array except that its items are not ordered.
  You can create a set to efficiently test for membership for an object. You
  can also iterate through a set just like an array, even accessing objects
  by index, however there is no gaurantee as to their order.

  Whether or not property observing is enabled, sets offer very powerful
  notifications of items being added and removed, through the
  `#js:addSetObserver` and `#js:removeSetObserver` methods; this can be
  very useful, for instance, for filtering or mapping sets.

  Note that SC.Set is a primitive object, like an array.  It does implement
  limited key-value observing support, but it does not extend from SC.Object
  so you should not subclass it.

  Creating a Set
  --------------
  You can create a set like you would most objects using SC.Set.create().
  Most new sets you create will be empty, but you can also initialize the set
  with some content by passing an array or other enumerable of objects to the
  constructor.

  Finally, you can pass in an existing set and the set will be copied.  You
  can also create a copy of a set by calling SC.Set#clone().

      #js
      // creates a new empty set
      var foundNames = SC.Set.create();

      // creates a set with four names in it.
      var names = SC.Set.create(["Charles", "Tom", "Juan", "Alex"]) ; // :P

      // creates a copy of the names set.
      var namesCopy = SC.Set.create(names);

      // same as above.
      var anotherNamesCopy = names.clone();

  Adding/Removing Objects
  -----------------------
  You generally add or remove objects from a set using add() or remove().
  You can add any type of object including primitives such as numbers,
  strings, and booleans.

  Note that objects can only exist one time in a set.  If you call add() on
  a set with the same object multiple times, the object will only be added
  once.  Likewise, calling remove() with the same object multiple times will
  remove the object the first time and have no effect on future calls until
  you add the object to the set again.

  Note that you cannot add/remove null or undefined to a set.  Any attempt to
  do so will be ignored.

  In addition to add/remove you can also call push()/pop().  Push behaves just
  like add() but pop(), unlike remove() will pick an arbitrary object, remove
  it and return it.  This is a good way to use a set as a job queue when you
  don't care which order the jobs are executed in.

  Testing for an Object
  ---------------------
  To test for an object's presence in a set you simply call SC.Set#contains().
  This method tests for the object's hash, which is generally the same as the
  object's guid; however, if you implement the hash() method on the object, it will
  use the return value from that method instead.

  Observing changes
  -----------------
  When using `#js:SC.Set` (rather than `#js:SC.CoreSet`), you can observe the
  `#js:"[]"` property to be alerted whenever the content changes.

  This is often unhelpful. If you are filtering sets of objects, for instance,
  it is very inefficient to re-filter all of the items each time the set changes.
  It would be better if you could just adjust the filtered set based on what
  was changed on the original set. The same issue applies to merging sets,
  as well.

  `#js:SC.Set` and `#js:SC.CoreSet` both offer another method of being observed:
  `#js:addSetObserver` and `#js:removeSetObserver`. These take a single parameter:
  an object which implements `#js:didAddItem(set, item)` and
  `#js:didRemoveItem(set, item)`.

  Whenever an item is added or removed from the set, all objects in the set
  (a SC.CoreSet, actually) of observing objects will be alerted appropriately.

  BIG WARNING
  ===========
  SetObservers are not intended to be used "_creatively_"; for instance, do
  not expect to be alerted immediately to any changes. **While the notifications
  are currently sent out immediately, if we find a fast way to send them at end
  of run loop, we most likely will do so.**

  @extends SC.Enumerable
  @extends SC.Observable
  @extends SC.Copyable
  @extends SC.Freezable

  @since SproutCore 1.0
*/
SC.Set = SC.mixin({},
  SC.Enumerable,
  SC.Observable,
  SC.Freezable,
/** @scope SC.Set.prototype */ {

  /**
    Creates a new set, with the optional array of items included in the
    return set.

    @param {SC.Enumerable} items items to add
    @return {SC.Set}
  */
  create: function(items) {
    var ret, idx, pool = SC.Set._pool, isObservable = this.isObservable, len;
    if (!isObservable && items===undefined && pool.length>0) {
      return pool.pop();
    } else {
      ret = SC.beget(this);
      if (isObservable) ret.initObservable();

      if (items && items.isEnumerable && items.get('length') > 0) {

        ret.isObservable = NO; // suspend change notifications

        // arrays and sets get special treatment to make them a bit faster
        if (items.isSCArray) {
          len = items.get('length');
          for(idx = 0; idx < len; idx++) ret.add(items.objectAt(idx));

        } else if (items.isSet) {
          len = items.length;
          for(idx = 0; idx < len; idx++) ret.add(items[idx]);

        // otherwise use standard SC.Enumerable API
        } else {
          items.forEach(function(i) { ret.add(i); }, this);
        }

        ret.isObservable = isObservable;
      }
    }
    return ret ;
  },

  /**
    Walk like a duck

    @property {Boolean}
  */
  isSet: YES,

  /**
    This property will change as the number of objects in the set changes.

    @property {Number}
  */
  length: 0,

  /**
    Returns the first object in the set or null if the set is empty

    @property {Object}
  */
  firstObject: function() {
    return (this.length > 0) ? this[0] : undefined ;
  }.property(),

  /**
    Clears the set

    @returns {SC.Set}
  */
  clear: function() {
    if (this.isFrozen) throw SC.FROZEN_ERROR;
    this.length = 0;
    return this ;
  },

  /**
    Call this method to test for membership.

    @returns {Boolean}
  */
  contains: function(obj) {

    // because of the way a set is "reset", the guid for an object may
    // still be stored as a key, but points to an index that is beyond the
    // length.  Therefore the found idx must both be defined and less than
    // the current length.
    if (obj === null) return NO ;
    var idx = this[SC.hashFor(obj)] ;
    return (!SC.none(idx) && (idx < this.length) && (this[idx]===obj)) ;
  },

  /**
    Returns YES if the passed object is also a set that contains the same
    objects as the receiver.

    @param {SC.Set} obj the other object
    @returns {Boolean}
  */
  isEqual: function(obj) {
    // fail fast
    if (!obj || !obj.isSet || (obj.get('length') !== this.get('length'))) {
      return NO ;
    }

    var loc = this.get('length');
    while(--loc>=0) {
      if (!obj.contains(this[loc])) return NO ;
    }

    return YES;
  },

  /**
    Adds a set observers. Set observers must implement two methods:

    - didAddItem(set, item)
    - didRemoveItem(set, item)

    Set observers are, in fact, stored in another set (a CoreSet).
  */
  addSetObserver: function(setObserver) {
    // create set observer set if needed
    if (!this.setObservers) {
      this.setObservers = SC.CoreSet.create();
    }

    // add
    this.setObservers.add(setObserver);
  },

  /**
    Removes a set observer.
  */
  removeSetObserver: function(setObserver) {
    // if there is no set, there can be no currently observing set observers
    if (!this.setObservers) return;

    // remove the set observer. Pretty simple, if you think about it. I mean,
    // honestly.
    this.setObservers.remove(setObserver);
  },

  /**
    Call this method to add an object. performs a basic add.

    If the object is already in the set it will not be added again.

    @param obj {Object} the object to add
    @returns {SC.Set} receiver
  */
  add: function(obj) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;

    // cannot add null to a set.
    if (SC.none(obj)) return this;

    // Implementation note:  SC.hashFor() is inlined because sets are
    // fundamental in SproutCore, and the inlined code is ~ 25% faster than
    // calling SC.hashFor() in IE8.
    var hashFunc,
        guid = ((hashFunc = obj.hash) && (typeof hashFunc === "function")) ? hashFunc.call(obj) : SC.guidFor(obj),
        idx  = this[guid],
        len  = this.length;
    if ((idx >= len) || (this[idx] !== obj)) {
      this[len] = obj;
      this[guid] = len;
      this.length = len + 1;
      if (this.setObservers) this.didAddItem(obj);
    }

    if (this.isObservable) this.enumerableContentDidChange();

    return this ;
  },

  /**
    Add all the items in the passed array or enumerable

    @returns {SC.Set} receiver
  */
  addEach: function(objects) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;
    if (!objects || !objects.isEnumerable) {
      throw "%@.addEach must pass enumerable".fmt(this);
    }

    var idx, isObservable = this.isObservable ;

    if (isObservable) this.beginPropertyChanges();
    if (objects.isSCArray) {
      idx = objects.get('length');
      while(--idx >= 0) this.add(objects.objectAt(idx)) ;
    } else if (objects.isSet) {
      idx = objects.length;
      while(--idx>=0) this.add(objects[idx]);

    } else objects.forEach(function(i) { this.add(i); }, this);
    if (isObservable) this.endPropertyChanges();

    return this ;
  },

  /**
    Removes the object from the set if it is found.

    If the object is not in the set, nothing will be changed.

    @param obj {Object} the object to remove
    @returns {SC.Set} receiver
  */
  remove: function(obj) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;

    // Implementation note:  SC.none() and SC.hashFor() are inlined because
    // sets are fundamental in SproutCore, and the inlined code is ~ 25%
    // faster than calling them "normally" in IE8.
    if (obj === null || obj === undefined) return this ;

    var hashFunc,
        guid = (obj && (hashFunc = obj.hash) && (typeof hashFunc === SC.T_FUNCTION)) ? hashFunc.call(obj) : SC.guidFor(obj),
        idx  = this[guid],
        len  = this.length,
        tmp;

    // not in set.
    // (SC.none is inlined for the reasons given above)
    if ((idx === null || idx === undefined) || (idx >= len) || (this[idx] !== obj)) return this;

    // clear the guid key
    delete this[guid];

    // to clear the index, we will swap the object stored in the last index.
    // if this is the last object, just reduce the length.
    if (idx < (len-1)) {
      // we need to keep a reference to "obj" so we can alert others below;
      // so, no changing it. Instead, create a temporary variable.
      tmp = this[idx] = this[len-1];
      guid = (tmp && (hashFunc = tmp.hash) && (typeof hashFunc === SC.T_FUNCTION)) ? hashFunc.call(tmp) : SC.guidFor(tmp);
      this[guid] = idx;
    }

    // reduce the length
    this.length = len-1;
    if (this.isObservable) this.enumerableContentDidChange();
    if (this.setObservers) this.didRemoveItem(obj);
    return this ;
  },

  /**
    Removes an arbitrary object from the set and returns it.

    @returns {Object} an object from the set or null
  */
  pop: function() {
    if (this.isFrozen) throw SC.FROZEN_ERROR;
    var obj = (this.length > 0) ? this[this.length-1] : null ;
    this.remove(obj) ;
    return obj ;
  },

  /**
    Removes all the items in the passed array.

    @returns {SC.Set} receiver
  */
  removeEach: function(objects) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;
    if (!objects || !objects.isEnumerable) {
      throw "%@.addEach must pass enumerable".fmt(this);
    }

    var idx, isObservable = this.isObservable ;

    if (isObservable) this.beginPropertyChanges();
    if (objects.isSCArray) {
      idx = objects.get('length');
      while(--idx >= 0) this.remove(objects.objectAt(idx)) ;
    } else if (objects.isSet) {
      idx = objects.length;
      while(--idx>=0) this.remove(objects[idx]);
    } else objects.forEach(function(i) { this.remove(i); }, this);
    if (isObservable) this.endPropertyChanges();

    return this ;
  },

  /**
   Clones the set into a new set.

    @returns {SC.Set} new copy
  */
  copy: function() {
    return this.constructor.create(this);
  },

  /**
    Return a set to the pool for reallocation.

    @returns {SC.Set} receiver
  */
  destroy: function() {
    this.isFrozen = NO ; // unfreeze to return to pool
    if (!this.isObservable) SC.Set._pool.push(this.clear());
    return this;
  },

  // .......................................
  // PRIVATE
  //

  /** @private - optimized */
  forEach: function(iterator, target) {
    var len = this.length;
    if (!target) target = this ;
    for(var idx=0;idx<len;idx++) iterator.call(target, this[idx], idx, this);
    return this ;
  },

  /** @private */
  toString: function() {
    var len = this.length, idx, ary = [];
    for(idx=0;idx<len;idx++) ary[idx] = this[idx];
    return "SC.Set<%@>".fmt(ary.join(',')) ;
  },

  /**
    @private
    Alerts set observers that an item has been added.
  */
  didAddItem: function(item) {
    // get the set observers
    var o = this.setObservers;

    // return if there aren't any
    if (!o) return;

    // loop through and call didAddItem.
    var len = o.length, idx;
    for (idx = 0; idx < len; idx++) o[idx].didAddItem(this, item);
  },

  /**
    @private
    Alerts set observers that an item has been removed.
  */
  didRemoveItem: function(item) {
    // get the set observers
    var o = this.setObservers;

    // return if there aren't any
    if (!o) return;

    // loop through and call didAddItem.
    var len = o.length, idx;
    for (idx = 0; idx < len; idx++) o[idx].didRemoveItem(this, item);
  },

  // the pool used for non-observable sets
  _pool: [],

  /** @private */
  isObservable: YES

}) ;

SC.Set.constructor = SC.Set;

// Make SC.Set look a bit more like other enumerables

/** @private */
SC.Set.clone = SC.Set.copy ;

/** @private */
SC.Set.push = SC.Set.unshift = SC.Set.add ;

/** @private */
SC.Set.shift = SC.Set.pop ;

// add generic add/remove enumerable support

/** @private */
SC.Set.addObject = SC.Set.add ;

/** @private */
SC.Set.removeObject = SC.Set.remove;

SC.Set._pool = [];

// ..........................................................
// CORE SET
//

/** @class

  CoreSet is just like set but not observable.  If you want to use the set
  as a simple data structure with no observing, CoreSet is slightly faster
  and more memory efficient.

  @extends SC.Set
  @since SproutCore 1.0
*/
SC.CoreSet = SC.beget(SC.Set);

/** @private */
SC.CoreSet.isObservable = NO ;

/** @private */
SC.CoreSet.constructor = SC.CoreSet;

/* >>>>>>>>>> BEGIN source/private/observer_queue.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('mixins/observable');
sc_require('system/set');

// ........................................................................
// OBSERVER QUEUE
//
// This queue is used to hold observers when the object you tried to observe
// does not exist yet.  This queue is flushed just before any property
// notification is sent.

/**
  @namespace

  The private ObserverQueue is used to maintain a set of pending observers.
  This allows you to setup an observer on an object before the object exists.

  Whenever the observer fires, the queue will be flushed to connect any
  pending observers.

  @since SproutCore 1.0
*/
SC.Observers = {

  queue: [],

  /**
   @private

   Attempt to add the named observer.  If the observer cannot be found, put
   it into a queue for later.
  */
  addObserver: function(propertyPath, target, method, pathRoot) {
    var tuple ;

    // try to get the tuple for this.
    if (typeof propertyPath === "string") {
      tuple = SC.tupleForPropertyPath(propertyPath, pathRoot) ;
    } else {
      tuple = propertyPath;
    }

    // if a tuple was found, add the observer immediately...
    if (tuple) {
      tuple[0].addObserver(tuple[1],target, method) ;

    // otherwise, save this in the queue.
    } else {
      this.queue.push([propertyPath, target, method, pathRoot]) ;
    }
  },

  /**
    @private

    Remove the observer.  If it is already in the queue, remove it.  Also
    if already found on the object, remove that.
  */
  removeObserver: function(propertyPath, target, method, pathRoot) {
    var idx, queue, tuple, item;

    tuple = SC.tupleForPropertyPath(propertyPath, pathRoot) ;
    if (tuple) {
      tuple[0].removeObserver(tuple[1], target, method) ;
    }

    idx = this.queue.length; queue = this.queue ;
    while(--idx >= 0) {
      item = queue[idx] ;
      if ((item[0] === propertyPath) && (item[1] === target) && (item[2] == method) && (item[3] === pathRoot)) queue[idx] = null ;
    }
  },

  /**
    @private

    Range Observers register here to indicate that they may potentially
    need to start observing.
  */
  addPendingRangeObserver: function(observer) {
    var ro = this.rangeObservers;
    if (!ro) ro = this.rangeObservers = SC.CoreSet.create();
    ro.add(observer);
    return this ;
  },

  _TMP_OUT: [],

  /**
    Flush the queue.  Attempt to add any saved observers.
  */
  flush: function(object) {

    // flush any observers that we tried to setup but didn't have a path yet
    var oldQueue = this.queue ;
    if (oldQueue && oldQueue.length > 0) {
      var newQueue = (this.queue = []) ;

      for ( var i=0,l=oldQueue.length; i<l; i++ ) {
        var item = oldQueue[i];
        if ( !item ) continue;

        var tuple = SC.tupleForPropertyPath( item[0], item[3] );
        if( tuple ) {
          tuple[0].addObserver( tuple[1], item[1], item[2] );
        } else {
          newQueue.push( item );
        }
      }
    }

    // if this object needsRangeObserver then see if any pending range
    // observers need it.
    if ( object._kvo_needsRangeObserver ) {
      var set = this.rangeObservers,
          len = set ? set.get('length') : 0,
          out = this._TMP_OUT,
          ro;

      for ( var i=0; i<len; i++ ) {
        ro = set[i]; // get the range observer
        if ( ro.setupPending(object) ) {
          out.push(ro); // save to remove later
        }
      }

      // remove any that have setup
      if ( out.length > 0 ) set.removeEach(out);
      out.length = 0; // reset
      object._kvo_needsRangeObserver = false ;
    }

  },

  /** @private */
  isObservingSuspended: 0,

  _pending: SC.CoreSet.create(),

  /** @private */
  objectHasPendingChanges: function(obj) {
    this._pending.add(obj) ; // save for later
  },

  /** @private */
  // temporarily suspends all property change notifications.
  suspendPropertyObserving: function() {
    this.isObservingSuspended++ ;
  },

  // resume change notifications.  This will call notifications to be
  // delivered for all pending objects.
  /** @private */
  resumePropertyObserving: function() {
    var pending ;
    if(--this.isObservingSuspended <= 0) {
      pending = this._pending ;
      this._pending = SC.CoreSet.create() ;

      var idx, len = pending.length;
      for(idx=0;idx<len;idx++) {
        pending[idx]._notifyPropertyObservers() ;
      }
      pending.clear();
      pending = null ;
    }
  }

} ;

/* >>>>>>>>>> BEGIN source/system/object.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('core') ;
sc_require('mixins/observable') ;
sc_require('private/observer_queue');
sc_require('mixins/array') ;
sc_require('system/set');

/*globals $$sel */

SC.BENCHMARK_OBJECTS = NO;

// ..........................................................
// PRIVATE HELPER METHODS
//
// Private helper methods.  These are not kept as part of the class
// definition because SC.Object is copied frequently and we want to keep the
// number of class methods to a minimum.

/** @private
  Augments a base object by copying the properties from the extended hash.
  In addition to simply copying properties, this method also performs a
  number of optimizations that can make init'ing a new object much faster
  including:

  - concatenating concatenatedProperties
  - prepping a list of bindings, observers, and dependent keys
  - caching local observers so they don't need to be manually constructed.

  @param {Hash} base hash
  @param {Hash} extension
  @returns {Hash} base hash
*/
SC._object_extend = function _object_extend(base, ext) {
  if (!ext) throw "SC.Object.extend expects a non-null value.  Did you forget to 'sc_require' something?  Or were you passing a Protocol to extend() as if it were a mixin?";

  // set _kvo_cloned for later use
  base._kvo_cloned = null;

  // get some common vars
  var key, idx, len, cur, cprops = base.concatenatedProperties, K = SC.K ;
  var p1,p2;

  // first, save any concat props.  use old or new array or concat
  idx = (cprops) ? cprops.length : 0 ;
  var concats = (idx>0) ? {} : null;
  while(--idx>=0) {
    key = cprops[idx]; p1 = base[key]; p2 = ext[key];

    if (p1) {
      if (!(p1 instanceof Array)) p1 = SC.$A(p1);
      concats[key] = (p2) ? p1.concat(p2) : p2 ;
    } else {
      if (!(p2 instanceof Array)) p2 = SC.$A(p2);
      concats[key] = p2 ;
    }
  }

  // setup arrays for bindings, observers, and properties.  Normally, just
  // save the arrays from the base.  If these need to be changed during
  // processing, then they will be cloned first.
  var bindings = base._bindings, clonedBindings = NO;
  var observers = base._observers, clonedObservers = NO;
  var properties = base._properties, clonedProperties = NO;
  var paths, pathLoc, local ;

  // outlets are treated a little differently because you can manually
  // name outlets in the passed in hash. If this is the case, then clone
  // the array first.
  var outlets = base.outlets, clonedOutlets = NO ;
  if (ext.outlets) {
    outlets = (outlets || SC.EMPTY_ARRAY).concat(ext.outlets);
    clonedOutlets = YES ;
  }

  // now copy properties, add superclass to func.
  for(key in ext) {

    if (key === '_kvo_cloned') continue; // do not copy

    // avoid copying builtin methods
    if (!ext.hasOwnProperty(key)) continue ;

    // get the value.  use concats if defined
    var value = (concats.hasOwnProperty(key) ? concats[key] : null) || ext[key];

    // Possibly add to a bindings.
    if (key.length > 7 && key.slice(-7) === "Binding") {
      if (!clonedBindings) {
        bindings = (bindings || SC.EMPTY_ARRAY).slice() ;
        clonedBindings = YES ;
      }

      if (bindings === null) bindings = (base._bindings || SC.EMPTY_ARRAY).slice();
      bindings[bindings.length] = key ;

    // Also add observers, outlets, and properties for functions...
    } else if (value && (value instanceof Function)) {

      // add super to funcs.  Be sure not to set the base of a func to
      // itself to avoid infinite loops.
      if (!value.superclass && (value !== (cur=base[key]))) {
        value.superclass = value.base = cur || K;
      }

      // handle regular observers
      if (value.propertyPaths) {
        if (!clonedObservers) {
          observers = (observers || SC.EMPTY_ARRAY).slice() ;
          clonedObservers = YES ;
        }
        observers[observers.length] = key ;

      // handle local properties
      }

      if (paths = value.localPropertyPaths) {
        pathLoc = paths.length;
        while(--pathLoc >= 0) {
          local = base._kvo_for(SC.keyFor('_kvo_local', paths[pathLoc]), SC.CoreSet);
          local.add(key);
          base._kvo_for('_kvo_observed_keys', SC.CoreSet).add(paths[pathLoc]);
        }

      // handle computed properties
      }

      if (value.dependentKeys) {
        if (!clonedProperties) {
          properties = (properties || SC.EMPTY_ARRAY).slice() ;
          clonedProperties = YES ;
        }
        properties[properties.length] = key ;

      // handle outlets
      }

      if (value.autoconfiguredOutlet) {
        if (!clonedOutlets) {
          outlets = (outlets || SC.EMPTY_ARRAY).slice();
          clonedOutlets = YES ;
        }
        outlets[outlets.length] = key ;
      }
    }

    // copy property
    base[key] = value ;
  }

  // Manually set base on toString() because some JS engines (such as IE8) do
  // not enumerate it
  if (ext.hasOwnProperty('toString')) {
    key = 'toString';
    // get the value.  use concats if defined
    value = (concats.hasOwnProperty(key) ? concats[key] : null) || ext[key] ;
    if (!value.superclass && (value !== (cur=base[key]))) {
      value.superclass = value.base = cur || K ;
    }
    // copy property
    base[key] = value ;
  }


  // copy bindings, observers, and properties
  base._bindings = bindings || [];
  base._observers = observers || [] ;
  base._properties = properties || [] ;
  base.outlets = outlets || [];

  return base ;
} ;

/** @class

  Root object for the SproutCore framework.  SC.Object is the root class for
  most classes defined by SproutCore.  It builds on top of the native object
  support provided by JavaScript to provide support for class-like
  inheritance, automatic bindings, properties observers, and more.

  Most of the classes you define in your application should inherit from
  SC.Object or one of its subclasses.  If you are writing objects of your
  own, you should read this documentation to learn some of the details of
  how SC.Object's behave and how they differ from other frameworks.

  h2. About SproutCore Classes

  JavaScript is not a class-based language.  Instead it uses a type of
  inheritence inspired by self called "prototypical" inheritance.
  ...

  h2. Using SproutCore objects with other JavaScript object.

  You can create a SproutCore object just like any other object...
  obj = new SC.Object() ;

  @extends SC.Observable
  @since SproutCore 1.0
*/
SC.Object = function(props) { return this._object_init(props); };

SC.mixin(SC.Object, /** @scope SC.Object */ {

  /**
    Adds the passed properties to the object's class definition.  You can
    pass as many hashes as you want, including Mixins, and they will be
    added in the order they are passed.

    This is a shorthand for calling SC.mixin(MyClass, props...);

    @params {Hash} props the properties you want to add.
    @returns {Object} receiver
  */
  mixin: function(props) {
    var len = arguments.length, loc ;
    for(loc =0;loc<len;loc++) SC.mixin(this, arguments[loc]);
    return this ;
  },

  // ..........................................
  // CREATING CLASSES AND INSTANCES
  //

  /**
    Points to the superclass for this class.  You can use this to trace a
    class hierarchy.

    @property {SC.Object}
  */
  superclass: null,

  /**
    Creates a new subclass of the receiver, adding any passed properties to
    the instance definition of the new class.  You should use this method
    when you plan to create several objects based on a class with similar
    properties.

    h2. Init

    If you define an init() method, it will be called when you create
    instances of your new class.  Since SproutCore uses the init() method to
    do important setup, you must be sure to always call arguments.callee.base.apply(this,arguments) somewhere
    in your init() to allow the normal setup to proceed.

    @params {Hash} props the methods of properties you want to add
    @returns {Class} A new object class
  */
  extend: function(props) {
    var bench = SC.BENCHMARK_OBJECTS ;
    if (bench) SC.Benchmark.start('SC.Object.extend') ;

    // build a new constructor and copy class methods.  Do this before
    // adding any other properties so they are not overwritten by the copy.
    var prop, ret = function(props) { return this._object_init(props); } ;
    for(prop in this) {
      if (!this.hasOwnProperty(prop)) continue ;
      ret[prop] = this[prop];
    }

    // manually copy toString() because some JS engines do not enumerate it
    if (this.hasOwnProperty('toString')) ret.toString = this.toString;

    // now setup superclass, guid
    ret.superclass = this ;
    SC.generateGuid(ret, "sc"); // setup guid

    ret.subclasses = SC.Set.create();
    this.subclasses.add(ret); // now we can walk a class hierarchy

    // setup new prototype and add properties to it
    var base = (ret.prototype = SC.beget(this.prototype));
    var idx, len = arguments.length;
    for(idx=0;idx<len;idx++) SC._object_extend(base, arguments[idx]) ;
    base.constructor = ret; // save constructor

    if (bench) SC.Benchmark.end('SC.Object.extend') ;
    return ret ;
  },

  reopen: function(props) {
    return SC._object_extend(this.prototype, props);
  },

  /**
    Creates a new instance of the class.

    Unlike most frameworks, you do not pass parameters to the init function
    for an object.  Instead, you pass a hash of additional properties you
    want to have assigned to the object when it is first created.  This is
    functionally like creating an anonymous subclass of the receiver and then
    instantiating it, but more efficient.

    You can use create() like you would a normal constructor in a
    class-based system, or you can use it to create highly customized
    singleton objects such as controllers or app-level objects.  This is
    often more efficient than creating subclasses and then instantiating
    them.

    You can pass any hash of properties to this method, including mixins.

    @param {Hash} props
      optional hash of method or properties to add to the instance.

    @returns {SC.Object} new instance of the receiver class.
  */
  create: function() {
    var C=this, ret = new C(arguments);
    if (SC.ObjectDesigner) {
      SC.ObjectDesigner.didCreateObject(ret, SC.$A(arguments));
    }
    return ret ;
  },
  /**
    Walk like a duck.  You can use this to quickly test classes.

    @property {Boolean}
  */
  isClass: YES,

  /**
    Set of subclasses that extend from this class.  You can observe this
    array if you want to be notified when the object is extended.

    @property {SC.Set}
  */
  subclasses: SC.Set.create(),

  /** @private */
  toString: function() { return SC._object_className(this); },

  // ..........................................
  // PROPERTY SUPPORT METHODS
  //

  /**
    Returns YES if the receiver is a subclass of the named class.  If the
    receiver is the class passed, this will return NO since the class is not
    a subclass of itself.  See also kindOf().

    h2. Example

    {{{
      ClassA = SC.Object.extend();
      ClassB = ClassA.extend();

      ClassB.subclassOf(ClassA) => YES
      ClassA.subclassOf(ClassA) => NO
    }}}

    @param {Class} scClass class to compare
    @returns {Boolean}
  */
  subclassOf: function(scClass) {
    if (this === scClass) return NO ;
    var t = this ;
    while(t = t.superclass) if (t === scClass) return YES ;
    return NO ;
  },

  /**
    Returns YES if the passed object is a subclass of the receiver.  This is
    the inverse of subclassOf() which you call on the class you want to test.

    @param {Class} scClass class to compare
    @returns {Boolean}
  */
  hasSubclass: function(scClass) {
    return (scClass && scClass.subclassOf) ? scClass.subclassOf(this) : NO;
  },

  /**
    Returns YES if the receiver is the passed class or is a subclass of the
    passed class.  Unlike subclassOf(), this method will return YES if you
    pass the receiver itself, since class is a kind of itself.  See also
    subclassOf().

    h2. Example

    {{{
      ClassA = SC.Object.extend();
      ClassB = ClassA.extend();

      ClassB.kindOf(ClassA) => YES
      ClassA.kindOf(ClassA) => YES
    }}}

    @param {Class} scClass class to compare
    @returns {Boolean}
  */
  kindOf: function(scClass) {
    return (this === scClass) || this.subclassOf(scClass) ;
  },

  // ..........................................................
  // Designers
  //
  /**
    This method works just like extend() except that it will also preserve
    the passed attributes.

    @param {Hash} attrs Attributes to add to view
    @returns {Class} SC.Object subclass to create
    @function
  */
  design: function() {
    if (this.isDesign) return this; // only run design one time
    var ret = this.extend.apply(this, arguments);
    ret.isDesign = YES ;
    if (SC.ObjectDesigner) {
      SC.ObjectDesigner.didLoadDesign(ret, this, SC.A(arguments));
    }
    return ret ;
  }
}) ;

// ..........................................
// DEFAULT OBJECT INSTANCE
//
SC.Object.prototype = {

  _kvo_enabled: YES,

  /** @private
    This is the first method invoked on a new instance.  It will first apply
    any added properties to the new instance and then calls the real init()
    method.

    @param {Array} extensions an array-like object with hashes to apply.
    @returns {Object} receiver
  */
  _object_init: function(extensions) {
    // apply any new properties
    var idx, len = (extensions) ? extensions.length : 0;
    for(idx=0;idx<len;idx++) SC._object_extend(this, extensions[idx]) ;
    SC.generateGuid(this, "sc") ; // add guid
    this.init() ; // call real init

    // Call 'initMixin' methods to automatically setup modules.
    var inits = this.initMixin; len = (inits) ? inits.length : 0 ;
    for(idx=0;idx < len; idx++) inits[idx].call(this);

    return this ; // done!
  },

  /**
    You can call this method on an object to mixin one or more hashes of
    properties on the receiver object.  In addition to simply copying
    properties, this method will also prepare the properties for use in
    bindings, computed properties, etc.

    If you plan to use this method, you should call it before you call
    the inherited init method from SC.Object or else your instance may not
    function properly.

    h2. Example

    {{{
      // dynamically apply a mixin specified in an object property
      var MyClass = SC.Object.extend({
         extraMixin: null,

         init: function() {
           this.mixin(this.extraMixin);
           arguments.callee.base.apply(this,arguments);
         }
      });

      var ExampleMixin = { foo: "bar" };

      var instance = MyClass.create({ extraMixin: ExampleMixin }) ;

      instance.get('foo') => "bar"
    }}}

    @param {Hash} ext a hash to copy.  Only one.
    @returns {Object} receiver
  */
  mixin: function() {
    var idx, len = arguments.length;
    for(idx=0;idx<len;idx++) SC.mixin(this, arguments[idx]) ;

    // call initMixin
    for(idx=0;idx<len;idx++) {
      var init = arguments[idx].initMixin ;
      if (init) init.call(this) ;
    }
    return this ;
  },

  /**
    This method is invoked automatically whenever a new object is
    instantiated.  You can override this method as you like to setup your
    new object.

    Within your object, be sure to call arguments.callee.base.apply(this,arguments) to ensure that the
    built-in init method is also called or your observers and computed
    properties may not be configured.

    Although the default init() method returns the receiver, the return
    value is ignored.

    @returns {void}
  */
  init: function() {
    this.initObservable();
    return this ;
  },

  /**
    Set to NO once this object has been destroyed.

    @property {Boolean}
  */
  isDestroyed: NO,

  /**
    Call this method when you are finished with an object to teardown its
    contents.  Because JavaScript is garbage collected, you do not usually
    need to call this method.  However, you may choose to do so for certain
    objects, especially views, in order to let them reclaim memory they
    consume immediately.

    If you would like to perform additional cleanup when an object is
    finished, you may override this method.  Be sure to call arguments.callee.base.apply(this,arguments).

    @returns {SC.Object} receiver
  */
  destroy: function() {
    if (this.get('isDestroyed')) return this; // nothing to do
    this.set('isDestroyed', YES);

    // destroy any mixins
    var idx, inits = this.destroyMixin, len = (inits) ? inits.length : 0 ;
    for(idx=0;idx < len; idx++) inits[idx].call(this);

    // disconnect all bindings
    this.bindings.invoke('disconnect');
    this.bindings = null;

    return this ;
  },

  /**
    Walk like a duck. Always YES since this is an object and not a class.

    @property {Boolean}
  */
  isObject: true,

  /**
    Returns YES if the named value is an executable function.

    @param methodName {String} the property name to check
    @returns {Boolean}
  */
  respondsTo: function( methodName ) {
    return !!(this[methodName] instanceof Function);
  },

  /**
    Attemps to invoke the named method, passing the included two arguments.
    Returns NO if the method is either not implemented or if the handler
    returns NO (indicating that it did not handle the event).  This method
    is invoked to deliver actions from menu items and to deliver events.
    You can override this method to provide additional handling if you
    prefer.

    @param {String} methodName
    @param {Object} arg1
    @param {Object} arg2
    @returns {Boolean} YES if handled, NO if not handled
  */
  tryToPerform: function(methodName, arg1, arg2) {
    return this.respondsTo(methodName) && (this[methodName](arg1, arg2) !== NO);
  },

  /**
    EXPERIMENTAL:  You can use this to invoke a superclass implementation in
    any method.  This does not work in Safari 2 or earlier.  If you need to
    target these methods, you should use one of the alternatives below:

    - *With Build Tools:* arguments.callee.base.apply(this,arguments);
    - *Without Build Tools:* arguments.callee.base.apply(this, arguments);

    h2. Example

    All of the following methods will call the superclass implementation of
    your method:

    {{{
      SC.Object.create({

        // DOES NOT WORK IN SAFARI 2 OR EARLIER
        method1: function() {
          this.superclass();
        },

        // REQUIRES SC-BUILD TOOLS
        method2: function() {
          arguments.callee.base.apply(this,arguments);
        },

        // WORKS ANYTIME
        method3: function() {
          arguments.callee.base.apply(this, arguments);
        }
      });
    }}}

    @params args {*args} any arguments you want to pass along.
    @returns {Object} return value from super
  */
  superclass: function(args) {
    var caller = arguments.callee.caller;
    if (!caller) throw "superclass cannot determine the caller method" ;
    return caller.superclass ? caller.superclass.apply(this, arguments) : null;
  },

  /**
    returns YES if the receiver is an instance of the named class.  See also
    kindOf().

    h2. Example

    {{{
      var ClassA = SC.Object.extend();
      var ClassB = SC.Object.extend();

      var instA = ClassA.create();
      var instB = ClassB.create();

      instA.instanceOf(ClassA) => YES
      instB.instanceOf(ClassA) => NO
    }}}

    @param {Class} scClass the class
    @returns {Boolean}
  */
  instanceOf: function(scClass) {
    return this.constructor === scClass ;
  },

  /**
    Returns true if the receiver is an instance of the named class or any
    subclass of the named class.  See also instanceOf().

    h2. Example

    {{{
      var ClassA = SC.Object.extend();
      var ClassB = SC.Object.extend();

      var instA = ClassA.create();
      var instB = ClassB.create();

      instA.kindOf(ClassA) => YES
      instB.kindOf(ClassA) => YES
    }}}

    @param scClass {Class} the class
    @returns {Boolean}
  */
  kindOf: function(scClass) { return this.constructor.kindOf(scClass); },

  /** @private */
  toString: function() {
    if (!this._object_toString) {
      // only cache the string if the klass name is available
      var klassName = SC._object_className(this.constructor) ;
      var string = "%@:%@".fmt(klassName, SC.guidFor(this));
      if (klassName) this._object_toString = string ;
      else return string ;
    }
    return this._object_toString ;
  },

  /**
    Activates any outlet connections in object and syncs any bindings.  This
    method is called automatically for view classes but may be used for any
    object.

    @returns {void}
  */
  awake: function(key) {
    var outlets = this.outlets,
        i, len, outlet;
    for (i = 0, len = outlets.length;  i < len;  ++i) {
      outlet = outlets[i];
      this.get(outlet);
    }
    this.bindings.invoke('sync');
  },

  /**
    Invokes the passed method or method name one time during the runloop.  You
    can use this method to schedule methods that need to execute but may be
    too expensive to execute more than once, such as methods that update the
    DOM.

    Note that in development mode only, the object and method that call this
    method will be recorded, for help in debugging scheduled code.

    @param {Function|String} method method or method name
    @returns {SC.Object} receiver
  */
  invokeOnce: function(method) {
    SC.RunLoop.currentRunLoop.invokeOnce(this, method) ;
    return this ;
  },

  /**
    Invokes the passed method once at the beginning of the next runloop,
    before any other methods (including events) are processed. This is useful
    for situations where you know you need to update something, but due to
    the way the run loop works, you can't actually do the update until the
    run loop has completed.

    A simple example is setting the selection on a collection controller to a
    newly created object. Because the collection controller won't have its
    content collection updated until later in the run loop, setting the
    selection immediately will have no effect. In this situation, you could do
    this instead:

    {{{
      // Creates a new MyRecord object and sets the selection of the
      // myRecord collection controller to the new object.
      createObjectAction: function(sender, evt) {
        // create a new record and add it to the store
        var obj = MyRecord.newRecord() ;

        // update the collection controller's selection
        MyApp.myRecordCollectionController.invokeLast( function() {
          this.set('selection', [obj]) ;
        });
      }
    }}}

    You can call invokeLast as many times as you like and the method will
    only be invoked once.

    Note that in development mode only, the object and method that call this
    method will be recorded, for help in debugging scheduled code.

    @param {Function|String} method method or method name
    @returns {SC.Object} receiver
  */
  invokeLast: function(method) {
    SC.RunLoop.currentRunLoop.invokeLast(this, method) ;
    return this ;
  },

  /**
    The properties named in this array will be concatenated in subclasses
    instead of replaced.  This allows you to name special properties that
    should contain any values you specify plus values specified by parents.

    It is used by SproutCore and is available for your use, though you
    should limit the number of properties you include in this list as it
    adds a slight overhead to new class and instance creation.

    @property {Array}
  */
  concatenatedProperties: ['concatenatedProperties', 'initMixin', 'destroyMixin']

} ;

// bootstrap the constructor for SC.Object.
SC.Object.prototype.constructor = SC.Object;

// Add observable to mixin
SC.mixin(SC.Object.prototype, SC.Observable) ;

// ..........................................................
// CLASS NAME SUPPORT
//

/** @private
  This is a way of performing brute-force introspection.  This searches
  through all the top-level properties looking for classes.  When it finds
  one, it saves the class path name.
*/
function findClassNames() {

  if (SC._object_foundObjectClassNames) return ;
  SC._object_foundObjectClassNames = true ;

  var seen = [] ;
  var detectedSC = false;
  var searchObject = function(root, object, levels) {
    levels-- ;

    // not the fastest, but safe
    if (seen.indexOf(object) >= 0) return ;
    seen.push(object) ;

    for(var key in object) {
      if (key == '__scope__') continue ;
      if (key == 'superclass') continue ;
      if (key == '__SC__') key = 'SC' ;
      if (!key.match(/^[A-Z0-9]/)) continue ;
      if (key == 'SC') {
        if (detectedSC) continue;
        detectedSC = true;
      }

      var path = (root) ? [root,key].join('.') : key ;
      var value = object[key] ;

      try {
        var type = SC.typeOf(value);
      } catch (e) {
        // Firefox gives security errors when trying to run typeOf on certain objects
        break;
      }

      switch(type) {
      case SC.T_CLASS:
        if (!value._object_className) value._object_className = path;
        if (levels>=0) searchObject(path, value, levels) ;
        break ;

      case SC.T_OBJECT:
        if (levels>=0) searchObject(path, value, levels) ;
        break ;

      case SC.T_HASH:
        if (((root) || (path==='SC')) && (levels>=0)) searchObject(path, value, levels) ;
        break ;

      default:
        break;
      }
    }
  } ;

  // Fix for IE 7 and 8 in order to detect the SC global variable. When you create
  // a global variable in IE, it is not added to the window object like in other
  // browsers. Therefore the searchObject method will not pick it up. So we have to
  // update the window object to have a reference to the global variable. And
  // doing window['SC'] does not work since the global variable already exists. For
  // any object that you create that is used act as a namespace, be sure to create it
  // like so:
  //
  //   window.MyApp = window.MyApp || SC.Object.create({ ... })
  //
  window['__SC__'] = SC;
  searchObject(null, window, 2) ;
}

/**
  Same as the instance method, but lets you check instanceOf without
  having to first check if instanceOf exists as a method.

  @param {Object} scObject the object to check instance of
  @param {Class} scClass the class
  @returns {Boolean} if object1 is instance of class
*/
SC.instanceOf = function(scObject, scClass) {
  return !!(scObject && scObject.constructor === scClass) ;
} ;

/**
  Same as the instance method, but lets you check kindOf without having to
  first check if kindOf exists as a method.

  @param {Object} scObject object to check kind of
  @param {Class} scClass the class to check
  @returns {Boolean} if object is an instance of class or subclass
*/
SC.kindOf = function(scObject, scClass) {
  if (scObject && !scObject.isClass) scObject = scObject.constructor;
  return !!(scObject && scObject.kindOf && scObject.kindOf(scClass));
};

/** @private
  Returns the name of this class.  If the name is not known, triggers
  a search.  This can be expensive the first time it is called.

  This method is used to allow classes to determine their own name.
*/
SC._object_className = function(obj) {
  if (SC.isReady === NO) return ''; // class names are not available until ready
  if (!obj._object_className) findClassNames() ;
  if (obj._object_className) return obj._object_className ;

  // if no direct classname was found, walk up class chain looking for a
  // match.
  var ret = obj ;
  while(ret && !ret._object_className) ret = ret.superclass;
  return (ret && ret._object_className) ? ret._object_className : 'Anonymous';
} ;


/* >>>>>>>>>> BEGIN source/private/chain_observer.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

require('system/object');

// ........................................................................
// CHAIN OBSERVER
//

// This is a private class used by the observable mixin to support chained
// properties.

// ChainObservers are used to automatically monitor a property several
// layers deep.
// org.plan.name = SC._ChainObserver.create({
//    target: this, property: 'org',
//    next: SC._ChainObserver.create({
//      property: 'plan',
//      next: SC._ChainObserver.create({
//        property: 'name', func: myFunc
//      })
//    })
//  })
//
SC._ChainObserver = function(property) {
  this.property = property ;
} ;

// This is the primary entry point.  Configures the chain.
SC._ChainObserver.createChain = function(rootObject, path, target, method, context) {

  // First we create the chain.
  var parts = path.split('.'),
      root  = new SC._ChainObserver(parts[0]),
      tail  = root;

  for(var i=1, l=parts.length; i<l; i++) {
    tail = tail.next = new SC._ChainObserver(parts[i]) ;
  }

  // Now root has the first observer and tail has the last one.
  // Feed the rootObject into the front to setup the chain...
  // do this BEFORE we set the target/method so they will not be triggered.
  root.objectDidChange(rootObject);

  // Finally, set the target/method on the tail so that future changes will
  // trigger.
  tail.target = target; tail.method = method ; tail.context = context ;

  // and return the root to save
  return root ;
};

SC._ChainObserver.prototype = {
  isChainObserver: true,

  // the object this instance is observing
  object: null,

  // the property on the object this link is observing.
  property: null,

  // if not null, this is the next link in the chain.  Whenever the
  // current property changes, the next observer will be notified.
  next: null,

  // if not null, this is the final target observer.
  target: null,

  // if not null, this is the final target method
  method: null,

  // invoked when the source object changes.  removes observer on old
  // object, sets up new observer, if needed.
  objectDidChange: function(newObject) {
    if (newObject === this.object) return; // nothing to do.

    // if an old object, remove observer on it.
    if (this.object && this.object.removeObserver) {
      this.object.removeObserver(this.property, this, this.propertyDidChange);
    }

    // if a new object, add observer on it...
    this.object = newObject ;
    if (this.object && this.object.addObserver) {
      this.object.addObserver(this.property, this, this.propertyDidChange);
    }

    // now, notify myself that my property value has probably changed.
    this.propertyDidChange() ;
  },

  // the observer method invoked when the observed property changes.
  propertyDidChange: function() {

    // get the new value
    var object = this.object ;
    var property = this.property ;
    var value = (object && object.get) ? object.get(property) : null ;

    // if we have a next object in the chain, notify it that its object
    // did change...
    if (this.next) this.next.objectDidChange(value) ;

    // if we have a target/method, call it.
    var target  = this.target,
        method  = this.method,
        context = this.context ;

    if (target && method) {
      var rev = object ? object.propertyRevision : null ;
      if (context) {
        method.call(target, object, property, value, context, rev);
      } else {
        method.call(target, object, property, value, rev) ;
      }
    }
  },

  // teardown the chain...
  destroyChain: function() {

    // remove observer
    var obj = this.object ;
    if (obj && obj.removeObserver) {
      obj.removeObserver(this.property, this, this.propertyDidChange) ;
    }

    // destroy next item in chain
    if (this.next) this.next.destroyChain() ;

    // and clear left overs...
    this.next = this.target = this.method = this.object = this.context = null;
    return null ;
  }

} ;

/* >>>>>>>>>> BEGIN source/system/binding.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('system/object') ;

/**
  Debug parameter you can turn on.  This will log all bindings that fire to
  the console.  This should be disabled in production code.  Note that you
  can also enable this from the console or temporarily.

  @property {Boolean}
*/
SC.LOG_BINDINGS = NO ;

/**
  Performance paramter.  This will benchmark the time spent firing each
  binding.

  @property {Boolean}
*/
SC.BENCHMARK_BINDING_NOTIFICATIONS = NO ;

/**
  Performance parameter.  This will benchmark the time spend configuring each
  binding.

  @property {Boolean}
*/
SC.BENCHMARK_BINDING_SETUP = NO;

/**
  Default placeholder for multiple values in bindings.

  @property {String}
*/
SC.MULTIPLE_PLACEHOLDER = '@@MULT@@' ;

/**
  Default placeholder for null values in bindings.

  @property {String}
*/
SC.NULL_PLACEHOLDER = '@@NULL@@' ;

/**
  Default placeholder for empty values in bindings.

  @property {String}
*/
SC.EMPTY_PLACEHOLDER = '@@EMPTY@@' ;


/**
  @namespace

  A binding simply connects the properties of two objects so that whenever the
  value of one property changes, the other property will be changed also.  You
  do not usually work with Binding objects directly but instead describe
  bindings in your class definition using something like:

  {{{
    valueBinding: "MyApp.someController.title"
  }}}

  This will create a binding from "MyApp.someController.title" to the "value"
  property of your object instance automatically.  Now the two values will be
  kept in sync.

  h2. Customizing Your Bindings

  In addition to synchronizing values, bindings can also perform some basic
  transforms on values.  These transforms can help to make sure the data fed
  into one object always meets the expectations of that object regardless of
  what the other object outputs.

  To customize a binding, you can use one of the many helper methods defined
  on SC.Binding like so:

  {{{
    valueBinding: SC.Binding.single("MyApp.someController.title")
  }}}

  This will create a binding just like the example above, except that now the
  binding will convert the value of MyApp.someController.title to a single
  object (removing any arrays) before applying it to the "value" property of
  your object.

  You can also chain helper methods to build custom bindings like so:

  {{{
    valueBinding: SC.Binding.single("MyApp.someController.title").notEmpty("(EMPTY)")
  }}}

  This will force the value of MyApp.someController.title to be a single value
  and then check to see if the value is "empty" (null, undefined, empty array,
  or an empty string).  If it is empty, the value will be set to the string
  "(EMPTY)".

  h2. One Way Bindings

  One especially useful binding customization you can use is the oneWay()
  helper.  This helper tells SproutCore that you are only interested in
  receiving changes on the object you are binding from.  For example, if you
  are binding to a preference and you want to be notified if the preference
  has changed, but your object will not be changing the preference itself, you
  could do:

  {{{
    bigTitlesBinding: SC.Binding.oneWay("MyApp.preferencesController.bigTitles")
  }}}

  This way if the value of MyApp.preferencesController.bigTitles changes the
  "bigTitles" property of your object will change also.  However, if you
  change the value of your "bigTitles" property, it will not update the
  preferencesController.

  One way bindings are almost twice as fast to setup and twice as fast to
  execute because the binding only has to worry about changes to one side.

  You should consider using one way bindings anytime you have an object that
  may be created frequently and you do not intend to change a property; only
  to monitor it for changes. (such as in the example above).

  h2. Adding Custom Transforms

  In addition to using the standard helpers provided by SproutCore, you can
  also defined your own custom transform functions which will be used to
  convert the value.  To do this, just define your transform function and add
  it to the binding with the transform() helper.  The following example will
  not allow Integers less than ten.  Note that it checks the value of the
  bindings and allows all other values to pass:

  {{{
    valueBinding: SC.Binding.transform(function(value, binding) {
      return ((SC.typeOf(value) === SC.T_NUMBER) && (value < 10)) ? 10 : value;
    }).from("MyApp.someController.value")
  }}}

  If you would like to instead use this transform on a number of bindings,
  you can also optionally add your own helper method to SC.Binding.  This
  method should simply return the value of this.transform(). The example
  below adds a new helper called notLessThan() which will limit the value to
  be not less than the passed minimum:

  {{{
    SC.Binding.notLessThan = function(minValue) {
      return this.transform(function(value, binding) {
        return ((SC.typeOf(value) === SC.T_NUMBER) && (value < minValue)) ? minValue : value ;
      }) ;
    } ;
  }}}

  You could specify this in your core.js file, for example.  Then anywhere in
  your application you can use it to define bindings like so:

  {{{
    valueBinding: SC.Binding.from("MyApp.someController.value").notLessThan(10)
  }}}

  Also, remember that helpers are chained so you can use your helper along with
  any other helpers.  The example below will create a one way binding that
  does not allow empty values or values less than 10:

  {{{
    valueBinding: SC.Binding.oneWay("MyApp.someController.value").notEmpty().notLessThan(10)
  }}}

  Note that the built in helper methods all allow you to pass a "from"
  property path so you don't have to use the from() helper to set the path.
  You can do the same thing with your own helper methods if you like, but it
  is not required.

  h2. Creating Custom Binding Templates

  Another way you can customize bindings is to create a binding template.  A
  template is simply a binding that is already partially or completely
  configured.  You can specify this template anywhere in your app and then use
  it instead of designating your own custom bindings.  This is a bit faster on
  app startup but it is mostly useful in making your code less verbose.

  For example, let's say you will be frequently creating one way, not empty
  bindings that allow values greater than 10 throughout your app.  You could
  create a binding template in your core.js like this:

  {{{
    MyApp.LimitBinding = SC.Binding.oneWay().notEmpty().notLessThan(10);
  }}}

  Then anywhere you want to use this binding, just refer to the template like
  so:

  {{{
    valueBinding: MyApp.LimitBinding.beget("MyApp.someController.value")
  }}}

  Note that when you use binding templates, it is very important that you
  always start by using beget() to extend the template.  If you do not do
  this, you will end up using the same binding instance throughout your app
  which will lead to erratic behavior.

  h2. How to Manually Activate a Binding

  All of the examples above show you how to configure a custom binding, but
  the result of these customizations will be a binding template, not a fully
  active binding.  The binding will actually become active only when you
  instantiate the object the binding belongs to.  It is useful however, to
  understand what actually happens when the binding is activated.

  For a binding to function it must have at least a "from" property and a "to"
  property.  The from property path points to the object/key that you want to
  bind from while the to path points to the object/key you want to bind to.

  When you define a custom binding, you are usually describing the property
  you want to bind from (such as "MyApp.someController.value" in the examples
  above).  When your object is created, it will automatically assign the value
  you want to bind "to" based on the name of your binding key.  In the
  examples above, during init, SproutCore objects will effectively call
  something like this on your binding:

  {{{
    binding = this.valueBinding.beget().to("value", this) ;
  }}}

  This creates a new binding instance based on the template you provide, and
  sets the to path to the "value" property of the new object.  Now that the
  binding is fully configured with a "from" and a "to", it simply needs to be
  connected to become active.  This is done through the connect() method:

  {{{
    binding.connect() ;
  }}}

  Now that the binding is connected, it will observe both the from and to side
  and relay changes.

  If you ever needed to do so (you almost never will, but it is useful to
  understand this anyway), you could manually create an active binding by
  doing the following:

  {{{
    SC.Binding.from("MyApp.someController.value")
     .to("MyApp.anotherObject.value")
     .connect();
  }}}

  You could also use the bind() helper method provided by SC.Object. (This is
  the same method used by SC.Object.init() to setup your bindings):

  {{{
    MyApp.anotherObject.bind("value", "MyApp.someController.value") ;
  }}}

  Both of these code fragments have the same effect as doing the most friendly
  form of binding creation like so:

  {{{
    MyApp.anotherObject = SC.Object.create({
      valueBinding: "MyApp.someController.value",

      // OTHER CODE FOR THIS OBJECT...

    }) ;
  }}}

  SproutCore's built in binding creation method make it easy to automatically
  create bindings for you.  You should always use the highest-level APIs
  available, even if you understand how to it works underneath.

  @since SproutCore 1.0
*/
SC.Binding = {

  /**
    This is the core method you use to create a new binding instance.  The
    binding instance will have the receiver instance as its parent which means
    any configuration you have there will be inherited.

    The returned instance will also have its parentBinding property set to the
    receiver.

    @param fromPath {String} optional from path.
    @returns {SC.Binding} new binding instance
  */
  beget: function(fromPath) {
    var ret = SC.beget(this) ;
    ret.parentBinding = this;
    if (fromPath !== undefined) ret = ret.from(fromPath) ;
    return ret ;
  },

  /**
    Returns a builder function for compatibility.
  */
  builder: function() {
    var binding = this,
        ret = function(fromProperty) { return binding.beget().from(fromProperty); };
    ret.beget = function() { return binding.beget(); } ;
    return ret ;
  },

  /**
    This will set "from" property path to the specified value.  It will not
    attempt to resolve this property path to an actual object/property tuple
    until you connect the binding.

    The binding will search for the property path starting at the root level
    unless you specify an alternate root object as the second paramter to this
    method.  Alternatively, you can begin your property path with either "." or
    "*", which will use the root object of the to side be default.  This special
    behavior is used to support the high-level API provided by SC.Object.

    @param propertyPath {String|Tuple} A property path or tuple
    @param root {Object} optional root object to use when resolving the path.
    @returns {SC.Binding} this
  */
  from: function(propertyPath, root) {

    // if the propertyPath is null/undefined, return this.  This allows the
    // method to be called from other methods when the fromPath might be
    // optional. (cf single(), multiple())
    if (!propertyPath) return this ;

    // beget if needed.
    var binding = (this === SC.Binding) ? this.beget() : this ;
    binding._fromPropertyPath = propertyPath ;
    binding._fromRoot = root ;
    binding._fromTuple = null ;
    return binding ;
  },

  /**
   This will set the "to" property path to the specified value.  It will not
   attempt to reoslve this property path to an actual object/property tuple
   until you connect the binding.

    @param propertyPath {String|Tuple} A property path or tuple
    @param root {Object} optional root object to use when resolving the path.
    @returns {SC.Binding} this
  */
  to: function(propertyPath, root) {
    // beget if needed.
    var binding = (this === SC.Binding) ? this.beget() : this ;
    binding._toPropertyPath = propertyPath ;
    binding._toRoot = root ;
    binding._toTuple = null ; // clear out any existing one.
    return binding ;
  },

  /**
    Attempts to connect this binding instance so that it can receive and relay
    changes.  This method will raise an exception if you have not set the
    from/to properties yet.

    @returns {SC.Binding} this
  */
  connect: function() {
    // If the binding is already connected, do nothing.
    if (this.isConnected) return this ;
    this.isConnected = YES ;
    this._connectionPending = YES ; // its connected but not really...
    this._syncOnConnect = YES ;
    SC.Binding._connectQueue.add(this) ;
    return this;
  },

  /** @private
    Actually connects the binding.  This is done at the end of the runloop
    to give you time to setup your entire object graph before the bindings
    try to activate.
  */
  _connect: function() {
    if (!this._connectionPending) return; //nothing to do
    this._connectionPending = NO ;

    var path, root,
        bench = SC.BENCHMARK_BINDING_SETUP;

    if (bench) SC.Benchmark.start("SC.Binding.connect()");

    // try to connect the from side.
    // as a special behavior, if the from property path begins with either a
    // . or * and the fromRoot is null, use the toRoot instead.  This allows
    // for support for the SC.Object shorthand:
    //
    // contentBinding: "*owner.value"
    //
    path = this._fromPropertyPath; root = this._fromRoot ;

    if (typeof path === "string") {

      // if the first character is a '.', this is a static path.  make the
      // toRoot the default root.
      if (path.indexOf('.') === 0) {
        path = path.slice(1);
        if (!root) root = this._toRoot ;

      // if the first character is a '*', then setup a tuple since this is a
      // chained path.
      } else if (path.indexOf('*') === 0) {
        path = [this._fromRoot || this._toRoot, path.slice(1)] ;
        root = null ;
      }
    }
    this._fromObserverData = [path, this, this.fromPropertyDidChange, root];
    SC.Observers.addObserver.apply(SC.Observers, this._fromObserverData);

    // try to connect the to side
    if (!this._oneWay) {
      path = this._toPropertyPath; root = this._toRoot ;
      this._toObserverData = [path, this, this.toPropertyDidChange, root];
      SC.Observers.addObserver.apply(SC.Observers, this._toObserverData);
    }

    if (bench) SC.Benchmark.end("SC.Binding.connect()");

    // now try to sync if needed
    if (this._syncOnConnect) {
      this._syncOnConnect = NO ;
      if (bench) SC.Benchmark.start("SC.Binding.connect().sync");
      this.sync();
      if (bench) SC.Benchmark.end("SC.Binding.connect().sync");
    }
  },

  /**
    Disconnects the binding instance.  Changes will no longer be relayed.  You
    will not usually need to call this method.

    @returns {SC.Binding} this
  */
  disconnect: function() {
    if (!this.isConnected) return this; // nothing to do.

    // if connection is still pending, just cancel
    if (this._connectionPending) {
      this._connectionPending = NO ;

    // connection is completed, disconnect.
    } else {
      SC.Observers.removeObserver.apply(SC.Observers, this._fromObserverData);
      if (!this._oneWay) {
        SC.Observers.removeObserver.apply(SC.Observers, this._toObserverData);
      }
    }

    this.isConnected = NO ;
    return this ;
  },

  /**
    Invoked whenever the value of the "from" property changes.  This will mark
    the binding as dirty if the value has changed.
  */
  fromPropertyDidChange: function(target, key) {
    var v = target ? target.get(key) : null;

    //console.log("fromPropertyDidChange: %@ v = %@".fmt(this, v)) ;

    // if the new value is different from the current binding value, then
    // schedule to register an update.
    if (v !== this._bindingValue || key === '[]') {

      this._setBindingValue(target, key) ;
      this._changePending = YES ;
      SC.Binding._changeQueue.add(this) ; // save for later.
    }
  },

  /**
    Invoked whenever the value of the "to" property changes.  This will mark the
    binding as dirty only if:

    - the binding is not one way
    - the value does not match the stored transformedBindingValue

    if the value does not match the transformedBindingValue, then it will
    become the new bindingValue.
  */
  toPropertyDidChange: function(target, key) {
    if (this._oneWay) return; // nothing to do

    var v = target.get(key) ;

    // if the new value is different from the current binding value, then
    // schedule to register an update.
    if (v !== this._transformedBindingValue) {
      this._setBindingValue(target, key) ;
      this._changePending = YES ;
      SC.Binding._changeQueue.add(this) ; // save for later.
    }
  },

  /** @private
    Saves the source location for the binding value.  This will be used later
    to actually update the binding value.
  */
  _setBindingValue: function(source, key) {
    this._bindingSource = source;
    this._bindingKey    = key;
  },

  /** @private
    Updates the binding value from the current binding source if needed.  This
    should be called just before using this._bindingValue.
  */
  _computeBindingValue: function() {
    var source = this._bindingSource,
        key    = this._bindingKey,
        v, idx;

    this._bindingValue = v = (source ? source.getPath(key) : null);

    // apply any transforms to get the to property value also
    var transforms = this._transforms;
    if (transforms) {
      var len = transforms.length,
          transform;
      for(idx=0;idx<len;idx++) {
        transform = transforms[idx] ;
        v = transform(v, this) ;
      }
    }

    // if error objects are not allowed, and the value is an error, then
    // change it to null.
    if (this._noError && SC.typeOf(v) === SC.T_ERROR) v = null ;

    this._transformedBindingValue = v;
  },

  _connectQueue: SC.CoreSet.create(),
  _alternateConnectQueue: SC.CoreSet.create(),
  _changeQueue: SC.CoreSet.create(),
  _alternateChangeQueue: SC.CoreSet.create(),
  _changePending: NO,

  /**
    Call this method on SC.Binding to flush all bindings with changed pending.

    @returns {Boolean} YES if changes were flushed.
  */
  flushPendingChanges: function() {

    // don't allow flushing more than one at a time
    if (this._isFlushing) return NO;
    this._isFlushing = YES ;
    SC.Observers.suspendPropertyObserving();

    var didFlush = NO,
        log = SC.LOG_BINDINGS,
        // connect any bindings
        queue, binding ;
    while((queue = this._connectQueue).length >0) {
      this._connectQueue = this._alternateConnectQueue ;
      this._alternateConnectQueue = queue ;
      while(binding = queue.pop()) binding._connect() ;
    }

    // loop through the changed queue...
    while ((queue = this._changeQueue).length > 0) {
      if (log) console.log("Begin: Trigger changed bindings") ;

      didFlush = YES ;

      // first, swap the change queues.  This way any binding changes that
      // happen while we flush the current queue can be queued up.
      this._changeQueue = this._alternateChangeQueue ;
      this._alternateChangeQueue = queue ;

      // next, apply any bindings in the current queue.  This may cause
      // additional bindings to trigger, which will end up in the new active
      // queue.
      while(binding = queue.pop()) binding.applyBindingValue() ;

      // now loop back and see if there are additional changes pending in the
      // active queue.  Repeat this until all bindings that need to trigger
      // have triggered.
      if (log) console.log("End: Trigger changed bindings") ;
    }

    // clean up
    this._isFlushing = NO ;
    SC.Observers.resumePropertyObserving();

    return didFlush ;
  },

  /**
    This method is called at the end of the Run Loop to relay the changed
    binding value from one side to the other.
  */
  applyBindingValue: function() {
    this._changePending = NO ;

    // compute the binding targets if needed.
    this._computeBindingTargets() ;
    this._computeBindingValue();

    var v = this._bindingValue,
        tv = this._transformedBindingValue,
        bench = SC.BENCHMARK_BINDING_NOTIFICATIONS,
        log = SC.LOG_BINDINGS ;

    // the from property value will always be the binding value, update if
    // needed.
    if (!this._oneWay && this._fromTarget) {
      if (log) console.log("%@: %@ -> %@".fmt(this, v, tv)) ;
      if (bench) SC.Benchmark.start(this.toString() + "->") ;
      this._fromTarget.setPathIfChanged(this._fromPropertyKey, v) ;
      if (bench) SC.Benchmark.end(this.toString() + "->") ;
    }

    // update the to value with the transformed value if needed.
    if (this._toTarget) {
      if (log) console.log("%@: %@ <- %@".fmt(this, v, tv)) ;
      if (bench) SC.Benchmark.start(this.toString() + "<-") ;
      this._toTarget.setPathIfChanged(this._toPropertyKey, tv) ;
      if (bench) SC.Benchmark.start(this.toString() + "<-") ;
    }
  },

  /**
    Calling this method on a binding will cause it to check the value of the
    from side of the binding matches the current expected value of the
    binding. If not, it will relay the change as if the from side's value has
    just changed.

    This method is useful when you are dynamically connecting bindings to a
    network of objects that may have already been initialized.
  */
  sync: function() {

    // do nothing if not connected
    if (!this.isConnected) return this;

    // connection is pending, just note that we should sync also
    if (this._connectionPending) {
      this._syncOnConnect = YES ;

    // we are connected, go ahead and sync
    } else {
      this._computeBindingTargets() ;
      var target = this._fromTarget,
          key = this._fromPropertyKey ;
      if (!target || !key) return this ; // nothing to do

      // get the new value
      var v = target.getPath(key) ;

      // if the new value is different from the current binding value, then
      // schedule to register an update.
      if (v !== this._bindingValue || key === '[]') {
        this._setBindingValue(target, key) ;
        this._changePending = YES ;
        SC.Binding._changeQueue.add(this) ; // save for later.
      }
    }

    return this ;
  },

  // set if you call sync() when the binding connection is still pending.
  _syncOnConnect: NO,

  _computeBindingTargets: function() {
    if (!this._fromTarget) {

      var path, root, tuple ;

      // if the fromPropertyPath begins with a . or * then we may use the
      // toRoot as the root object.  Similar code exists in connect() so if
      // you make a change to one be sure to update the other.
      path = this._fromPropertyPath; root = this._fromRoot ;
      if (typeof path === "string") {

        // static path beginning with the toRoot
        if (path.indexOf('.') === 0) {
          path = path.slice(1) ; // remove the .
          if (!root) root = this._toRoot; // use the toRoot optionally

        // chained path beginning with toRoot.  Setup a tuple
        } else if (path.indexOf('*') === 0) {
          path = [root || this._toRoot, path.slice(1)];
          root = null ;
        }
      }

      tuple = SC.tupleForPropertyPath(path, root) ;
      if (tuple) {
        this._fromTarget = tuple[0]; this._fromPropertyKey = tuple[1] ;
      }
    }

    if (!this._toTarget) {
      path = this._toPropertyPath; root = this._toRoot ;
      tuple = SC.tupleForPropertyPath(path, root) ;
      if (tuple) {
        this._toTarget = tuple[0]; this._toPropertyKey = tuple[1] ;
      }
    }
  },

  /**
    Configures the binding as one way.  A one-way binding will relay changes
    on the "from" side to the "to" side, but not the other way around.  This
    means that if you change the "to" side directly, the "from" side may have
    a different value.

    @param fromPath {String} optional from path to connect.
    @param aFlag {Boolean} Optionally pass NO to set the binding back to two-way
    @returns {SC.Binding} this
  */
  oneWay: function(fromPath, aFlag) {

    // If fromPath is a bool but aFlag is undefined, swap.
    if ((aFlag === undefined) && (SC.typeOf(fromPath) === SC.T_BOOL)) {
      aFlag = fromPath; fromPath = null ;
    }

    // beget if needed.
    var binding = this.from(fromPath) ;
    if (binding === SC.Binding) binding = binding.beget() ;
    binding._oneWay = (aFlag === undefined) ? YES : aFlag ;
    return binding ;
  },

  /**
    Adds the specified transform function to the array of transform functions.

    The function you pass must have the following signature:

    {{{
      function(value) {} ;
    }}}

    It must return either the transformed value or an error object.

    Transform functions are chained, so they are called in order.  If you are
    extending a binding and want to reset the transforms, you can call
    resetTransform() first.

    @param transformFunc {Function} the transform function.
    @returns {SC.Binding} this
  */
  transform: function(transformFunc) {
    var binding = (this === SC.Binding) ? this.beget() : this ;
    var t = binding._transforms ;

    // clone the transform array if this comes from the parent
    if (t && (t === binding.parentBinding._transform)) {
      t = binding._transforms = t.slice() ;
    }

    // create the transform array if needed.
    if (!t) t = binding._transforms = [] ;

    // add the transform function
    t.push(transformFunc) ;
    return binding;
  },

  /**
    Resets the transforms for the binding.  After calling this method the
    binding will no longer transform values.  You can then add new transforms
    as needed.

    @returns {SC.Binding} this
  */
  resetTransforms: function() {
    var binding = (this === SC.Binding) ? this.beget() : this ;
    binding._transforms = null ; return binding ;
  },

  /**
    Specifies that the binding should not return error objects.  If the value
    of a binding is an Error object, it will be transformed to a null value
    instead.

    Note that this is not a transform function since it will be called at the
    end of the transform chain.

    @param fromPath {String} optional from path to connect.
    @param aFlag {Boolean} optionally pass NO to allow error objects again.
    @returns {SC.Binding} this
  */
  noError: function(fromPath, aFlag) {
    // If fromPath is a bool but aFlag is undefined, swap.
    if ((aFlag === undefined) && (SC.typeOf(fromPath) === SC.T_BOOL)) {
      aFlag = fromPath; fromPath = null ;
    }

    // beget if needed.
    var binding = this.from(fromPath) ;
    if (binding === SC.Binding) binding = binding.beget() ;
    binding._noError = (aFlag === undefined) ? YES : aFlag ;
    return binding ;
  },

  /**
    Adds a transform to the chain that will allow only single values to pass.
    This will allow single values, nulls, and error values to pass through.  If
    you pass an array, it will be mapped as so:

    {{{
      [] => null
      [a] => a
      [a,b,c] => Multiple Placeholder
    }}}

    You can pass in an optional multiple placeholder or it will use the
    default.

    Note that this transform will only happen on forwarded valued.  Reverse
    values are send unchanged.

    @param fromPath {String} from path or null
    @param placeholder {Object} optional placeholder value.
    @returns {SC.Binding} this
  */
  single: function(fromPath, placeholder) {
    if (placeholder === undefined) {
      placeholder = SC.MULTIPLE_PLACEHOLDER ;
    }
    return this.from(fromPath).transform(function(value, isForward) {
      if (value && value.isEnumerable) {
        var len = value.get('length');
        value = (len>1) ? placeholder : (len<=0) ? null : value.firstObject();
      }
      return value ;
    }) ;
  },

  /**
    Adds a transform that will return the placeholder value if the value is
    null, undefined, an empty array or an empty string.  See also notNull().

    @param fromPath {String} from path or null
    @param placeholder {Object} optional placeholder.
    @returns {SC.Binding} this
  */
  notEmpty: function(fromPath, placeholder) {
    if (placeholder === undefined) placeholder = SC.EMPTY_PLACEHOLDER ;
    return this.from(fromPath).transform(function(value, isForward) {
      if (SC.none(value) || (value === '') || (SC.isArray(value) && value.length === 0)) {
        value = placeholder ;
      }
      return value ;
    }) ;
  },

  /**
    Adds a transform that will return the placeholder value if the value is
    null.  Otherwise it will passthrough untouched.  See also notEmpty().

    @param fromPath {String} from path or null
    @param placeholder {Object} optional placeholder;
    @returns {SC.Binding} this
  */
  notNull: function(fromPath, placeholder) {
    if (placeholder === undefined) placeholder = SC.EMPTY_PLACEHOLDER ;
    return this.from(fromPath).transform(function(value, isForward) {
      if (SC.none(value)) value = placeholder ;
      return value ;
    }) ;
  },

  /**
    Adds a transform that will convert the passed value to an array.  If
    the value is null or undefined, it will be converted to an empty array.

    @param fromPath {String} optional from path
    @returns {SC.Binding} this
  */
  multiple: function(fromPath) {
    return this.from(fromPath).transform(function(value) {
      if (!SC.isArray(value)) value = (value == null) ? [] : [value] ;
      return value ;
    }) ;
  },

  /**
    Adds a transform to convert the value to a bool value.  If the value is
    an array it will return YES if array is not empty.  If the value is a string
    it will return YES if the string is not empty.

    @param fromPath {String} optional from path
    @returns {SC.Binding} this
  */
  bool: function(fromPath) {
    return this.from(fromPath).transform(function(v) {
      var t = SC.typeOf(v) ;
      if (t === SC.T_ERROR) return v ;
      return (t == SC.T_ARRAY) ? (v.length > 0) : (v === '') ? NO : !!v ;
    }) ;
  },

  /**
    Adds a transform that forwards the logical 'AND' of values at 'pathA' and
    'pathB' whenever either source changes.  Note that the transform acts strictly
    as a one-way binding, working only in the direction

      'pathA' AND 'pathB' --> value  (value returned is the result of ('pathA' && 'pathB'))

    Usage example where a delete button's 'isEnabled' value is determined by whether
    something is selected in a list and whether the current user is allowed to delete:

      deleteButton: SC.ButtonView.design({
        isEnabledBinding: SC.Binding.and('MyApp.itemsController.hasSelection', 'MyApp.userController.canDelete')
      })

  */
  and: function(pathA, pathB) {

    // create an object to do the logical computation
    var gate = SC.Object.create({
      valueABinding: pathA,
      valueBBinding: pathB,

      and: function() {
        return (this.get('valueA') && this.get('valueB'));
      }.property('valueA', 'valueB').cacheable()
    });

    // add a transform that depends on the result of that computation.
    return this.from('and', gate).oneWay();
  },

  /**
    Adds a transform that forwards the 'OR' of values at 'pathA' and
    'pathB' whenever either source changes.  Note that the transform acts strictly
    as a one-way binding, working only in the direction

      'pathA' AND 'pathB' --> value  (value returned is the result of ('pathA' || 'pathB'))

  */
  or: function(pathA, pathB) {

    // create an object to the logical computation
    var gate = SC.Object.create({
      valueABinding: pathA,
      valueBBinding: pathB,

      or: function() {
        return (this.get('valueA') || this.get('valueB'));
      }.property('valueA', 'valueB').cacheable()
    });

    return this.from('or', gate).oneWay();
  },

  /**
    Adds a transform to convert the value to the inverse of a bool value.  This
    uses the same transform as bool() but inverts it.

    @param fromPath {String} optional from path
    @returns {SC.Binding} this
  */
  not: function(fromPath) {
    return this.from(fromPath).transform(function(v) {
      var t = SC.typeOf(v) ;
      if (t === SC.T_ERROR) return v ;
      return !((t == SC.T_ARRAY) ? (v.length > 0) : (v === '') ? NO : !!v) ;
    }) ;
  },

  /**
    Adds a transform that will return YES if the value is null, NO otherwise.

    @returns {SC.Binding} this
  */
  isNull: function(fromPath) {
    return this.from(fromPath).transform(function(v) {
      var t = SC.typeOf(v) ;
      return (t === SC.T_ERROR) ? v : SC.none(v) ;
    });
  },

  toString: function() {
    var from = this._fromRoot ? "<%@>:%@".fmt(this._fromRoot,this._fromPropertyPath) : this._fromPropertyPath;

    var to = this._toRoot ? "<%@>:%@".fmt(this._toRoot,this._toPropertyPath) : this._toPropertyPath;

    var oneWay = this._oneWay ? '[oneWay]' : '';
    return "SC.Binding%@(%@ -> %@)%@".fmt(SC.guidFor(this), from, to, oneWay);
  }
} ;

/**
  Shorthand method to define a binding.  This is the same as calling:

  {{{
    SC.binding(path) = SC.Binding.from(path)
  }}}
*/
SC.binding = function(path, root) { return SC.Binding.from(path,root); } ;


/* >>>>>>>>>> BEGIN source/system/error.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @class

  An error, used to represent an error state.

  Many API's within SproutCore will return an instance of this object whenever
  they have an error occur.  An error includes an error code, description,
  and optional human readable label that indicates the item that failed.

  Depending on the error, other properties may also be added to the object
  to help you recover from the failure.

  You can pass error objects to various UI elements to display the error in
  the interface. You can easily determine if the value returned by some API is
  an error or not using the helper SC.ok(value).

  h2. Faking Error Objects

  You can actually make any object you want to be treated like an Error object
  by simply implementing two properties: isError and errorValue.  If you
  set isError to YES, then calling SC.ok(obj) on your object will return NO.
  If isError is YES, then SC.val(obj) will return your errorValue property
  instead of the receiver.

  @extends SC.Object
  @since SproutCore 1.0
*/
SC.Error = SC.Object.extend(
/** @scope SC.Error.prototype */ {

  /**
    error code.  Used to designate the error type.

    @property {Number}
  */
  code: -1,

  /**
    Human readable description of the error.  This can also be a non-localized
    key.

    @property {String}
  */
  message: '',

  /**
    The value the error represents.  This is used when wrapping a value inside
    of an error to represent the validation failure.

    @property {Object}
  */
  errorValue: null,

  /**
    The original error object.  Normally this will return the receiver.
    However, sometimes another object will masquarade as an error; this gives
    you a way to get at the underyling error.

    @property {SC.Error}
  */
  errorObject: function() {
    return this;
  }.property().cacheable(),

  /**
    Human readable name of the item with the error.

    @property {String}
  */
  label: null,

  /** @private */
  toString: function() {
    return "SC.Error:%@:%@ (%@)".fmt(SC.guidFor(this), this.get('message'), this.get('code'));
  },

  /**
    Walk like a duck.

    @property {Boolean}
  */
  isError: YES
}) ;

/**
  Creates a new SC.Error instance with the passed description, label, and
  code.  All parameters are optional.

  @param description {String} human readable description of the error
  @param label {String} human readable name of the item with the error
  @param code {Number} an error code to use for testing.
  @returns {SC.Error} new error instance.
*/
SC.Error.desc = function(description, label, value, code) {
  var opts = { message: description } ;
  if (label !== undefined) opts.label = label ;
  if (code !== undefined) opts.code = code ;
  if (value !== undefined) opts.errorValue = value ;
  return this.create(opts) ;
} ;

/**
  Shorthand form of the SC.Error.desc method.

  @param description {String} human readable description of the error
  @param label {String} human readable name of the item with the error
  @param code {Number} an error code to use for testing.
  @returns {SC.Error} new error instance.
*/
SC.$error = function(description, label, value, c) {
  return SC.Error.desc(description,label, value, c);
} ;

/**
  Returns YES if the passed value is an error object or false.

  @param {Object} ret object value
  @returns {Boolean}
*/
SC.ok = function(ret) {
  return (ret !== false) && !(ret && ret.isError);
};

/** @private */
SC.$ok = SC.ok;

/**
  Returns the value of an object.  If the passed object is an error, returns
  the value associated with the error; otherwise returns the receiver itself.

  @param {Object} obj the object
  @returns {Object} value
*/
SC.val = function(obj) {
  if (obj && obj.isError) {
    return obj.get ? obj.get('errorValue') : null ; // Error has no value
  } else return obj ;
};

/** @private */
SC.$val = SC.val;

// STANDARD ERROR OBJECTS

/**
  Standard error code for errors that do not support multiple values.

  @property {Number}
*/
SC.Error.HAS_MULTIPLE_VALUES = -100 ;

/* >>>>>>>>>> BEGIN source/system/index_set.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('mixins/enumerable') ;
sc_require('mixins/observable') ;
sc_require('mixins/freezable');
sc_require('mixins/copyable');

/**
  @class

  A collection of ranges.  You can use an IndexSet to keep track of non-
  continuous ranges of items in a parent array.  IndexSet's are used for
  selection, for managing invalidation ranges and other data-propogation.

  h2. Examples

  {{{
    var set = SC.IndexSet.create(ranges) ;
    set.contains(index);
    set.add(index, length);
    set.remove(index, length);

    // uses a backing SC.Array object to return each index
    set.forEach(function(object) { .. })

    // returns the index
    set.forEachIndex(function(index) { ... });

    // returns ranges
    set.forEachRange(function(start, length) { .. });
  }}}

  h2. Implementation Notes

  An IndexSet stores indices on the object.  A positive value great than the
  index tells you the end of an occupied range.  A negative values tells you
  the end of an empty range.  A value less than the index is a search
  accelerator.  It tells you the start of the nearest range.

  @extends SC.Enumerable
  @extends SC.Observable
  @extends SC.Copyable
  @extends SC.Freezable
  @since SproutCore 1.0
*/
SC.IndexSet = SC.mixin({},
  SC.Enumerable, SC.Observable, SC.Freezable, SC.Copyable,
/** @scope SC.IndexSet.prototype */ {

  /** @private
    Walks a content array and copies its contents to a new array.  For large
    content arrays this is faster than using slice()
  */
  _sc_sliceContent: function(c) {
    if (c.length < 1000) return c.slice(); // use native when faster
    var cur = 0, ret = [], next = c[0];
    while(next !== 0) {
      ret[cur] = next ;
      cur = (next<0) ? (0-next) : next ;
      next = c[cur];
    }
    ret[cur] = 0;
    this._hint(0, cur, ret); // hints are not copied manually - add them
    return ret ;
  },

  /**
    To create a set, pass either a start and index or another IndexSet.

    @returns {SC.IndexSet}
  */
  create: function(start, length) {
    var ret = SC.beget(this);
    ret.initObservable();
    ret.registerDependentKey('min', '[]');

    // optimized method to clone an index set.
    if (start && start.isIndexSet) {
      ret._content = this._sc_sliceContent(start._content);
      ret.max = start.max;
      ret.length = start.length;
      ret.source = start.source ;

    // otherwise just do a regular add
    } else {
      ret._content = [0];
      if (start !== undefined) ret.add(start, length);
    }
    return ret ;
  },

  /**
    Walk like a duck.

    @property {Boolean}
  */
  isIndexSet: YES,

  /**  @private
    Internal setting determines the preferred skip size for hinting sets.

    @property {Number}
  */
  HINT_SIZE: 256,

  /**
    Total number of indexes contained in the set

    @property {Number}
  */
  length: 0,

  /**
    One greater than the largest index currently stored in the set.  This
    is sometimes useful when determining the total range of items covering
    the index set.

    @property {Number}
  */
  max: 0,

  /**
    The first index included in the set or -1.

    @property {Number}
  */
  min: function() {
    var content = this._content,
        cur = content[0];
    return (cur === 0) ? -1 : (cur>0) ? 0 : Math.abs(cur);

  }.property('[]').cacheable(),

  /**
    Returns the first index in the set .

    @property {Number}
  */
  firstObject: function() {
    return (this.get('length')>0) ? this.get('min') : undefined;
  }.property(),

  /**
    Returns the starting index of the nearest range for the specified
    index.

    @param {Number} index
    @returns {Number} starting index
  */
  rangeStartForIndex: function(index) {
    var content = this._content,
        max     = this.get('max'),
        ret, next, accel;

    // fast cases
    if (index >= max) return max ;
    if (Math.abs(content[index]) > index) return index ; // we hit a border

    // use accelerator to find nearest content range
    accel = index - (index % SC.IndexSet.HINT_SIZE);
    ret = content[accel];
    if (ret<0 || ret>index) ret = accel;
    next = Math.abs(content[ret]);

    // now step forward through ranges until we find one that includes the
    // index.
    while (next < index) {
      ret = next ;
      next = Math.abs(content[ret]);
    }
    return ret ;
  },

  /**
    Returns YES if the passed index set contains the exact same indexes as
    the receiver.  If you pass any object other than an index set, returns NO.

    @param {Object} obj another object.
    @returns {Boolean}
  */
  isEqual: function(obj) {

    // optimize for some special cases
    if (obj === this) return YES ;
    if (!obj || !obj.isIndexSet || (obj.max !== this.max) || (obj.length !== this.length)) return NO;

    // ok, now we need to actually compare the ranges of the two.
    var lcontent = this._content,
        rcontent = obj._content,
        cur      = 0,
        next     = lcontent[cur];

    do {
      if (rcontent[cur] !== next) return NO ;
      cur = Math.abs(next) ;
      next = lcontent[cur];
    } while (cur !== 0);
    return YES ;
  },

  /**
    Returns the first index in the set before the passed index or null if
    there are no previous indexes in the set.

    @param {Number} index index to check
    @returns {Number} index or -1
  */
  indexBefore: function(index) {

    if (index===0) return -1; // fast path
    index--; // start with previous index

    var content = this._content,
        max     = this.get('max'),
        start   = this.rangeStartForIndex(index);
    if (!content) return null;

    // loop backwards until we find a range that is in the set.
    while((start===max) || (content[start]<0)) {
      if (start === 0) return -1 ; // nothing before; just quit
      index = start -1 ;
      start = this.rangeStartForIndex(index);
    }

    return index;
  },

  /**
    Returns the first index in the set after the passed index or null if
    there are no additional indexes in the set.

    @param {Number} index index to check
    @returns {Number} index or -1
  */
  indexAfter: function(index) {
    var content = this._content,
        max     = this.get('max'),
        start, next ;
    if (!content || (index>=max)) return -1; // fast path
    index++; // start with next index


    // loop forwards until we find a range that is in the set.
    start = this.rangeStartForIndex(index);
    next  = content[start];
    while(next<0) {
      if (next === 0) return -1 ; //nothing after; just quit
      index = start = Math.abs(next);
      next  = content[start];
    }

    return index;
  },

  /**
    Returns YES if the index set contains the named index

    @param {Number} start index or range
    @param {Number} length optional range length
    @returns {Boolean}
  */
  contains: function(start, length) {
    var content, cur, next, rstart, rnext;

    // normalize input
    if (length === undefined) {
      if (start === null || start === undefined) return NO ;

      if (typeof start === SC.T_NUMBER) {
        length = 1 ;

      // if passed an index set, check each receiver range
      } else if (start && start.isIndexSet) {
        if (start === this) return YES ; // optimization

        content = start._content ;
        cur = 0 ;
        next = content[cur];
        while (next !== 0) {
          if ((next>0) && !this.contains(cur, next-cur)) return NO ;
          cur = Math.abs(next);
          next = content[cur];
        }
        return YES ;

      } else {
        length = start.length;
        start = start.start;
      }
    }

    rstart = this.rangeStartForIndex(start);
    rnext  = this._content[rstart];

    return (rnext>0) && (rstart <= start) && (rnext >= (start+length));
  },

  /**
    Returns YES if the index set contains any of the passed indexes.  You
    can pass a single index, a range or an index set.

    @param {Number} start index, range, or IndexSet
    @param {Number} length optional range length
    @returns {Boolean}
  */
  intersects: function(start, length) {
    var content, cur, next, lim;

    // normalize input
    if (length === undefined) {
      if (typeof start === SC.T_NUMBER) {
        length = 1 ;

      // if passed an index set, check each receiver range
      } else if (start && start.isIndexSet) {
        if (start === this) return YES ; // optimization

        content = start._content ;
        cur = 0 ;
        next = content[cur];
        while (next !== 0) {
          if ((next>0) && this.intersects(cur, next-cur)) return YES ;
          cur = Math.abs(next);
          next = content[cur];
        }
        return NO ;

      } else {
        length = start.length;
        start = start.start;
      }
    }

    cur     = this.rangeStartForIndex(start);
    content = this._content;
    next    = content[cur];
    lim     = start + length;
    while (cur < lim) {
      if (next === 0) return NO; // no match and at end!
      if ((next > 0) && (next > start)) return YES ; // found a match
      cur = Math.abs(next);
      next = content[cur];
    }
    return NO ; // no match
  },

  /**
    Returns a new IndexSet without the passed range or indexes.   This is a
    convenience over simply cloning and removing.  Does some optimizations.

    @param {Number} start index, range, or IndexSet
    @param {Number} length optional range length
    @returns {SC.IndexSet} new index set
  */
  without: function(start, length) {
    if (start === this) return SC.IndexSet.create(); // just need empty set
    return this.clone().remove(start, length);
  },

  /**
    Replace the index set's current content with the passed index set.  This
    is faster than clearing the index set adding the values again.

    @param {Number} start index, Range, or another IndexSet
    @param {Number} length optional length of range.
    @returns {SC.IndexSet} receiver
  */
  replace: function(start, length) {

    if (length === undefined) {
      if (typeof start === SC.T_NUMBER) {
        length = 1 ;
      } else if (start && start.isIndexSet) {
        this._content = this._sc_sliceContent(start._content);
        this.beginPropertyChanges()
          .set('max', start.max)
          .set('length', start.length)
          .set('source', start.source)
          .enumerableContentDidChange()
        .endPropertyChanges();
        return this ;

      } else {
        length = start.length;
        start  = start.start;
      }
    }

    var oldlen = this.length;
    this._content.length=1;
    this._content[0] = 0;
    this.length = this.max = 0 ; // reset without notifying since add()
    return this.add(start, length);
  },

  /**
    Adds the specified range of indexes to the set.  You can also pass another
    IndexSet to union the contents of the index set with the receiver.

    @param {Number} start index, Range, or another IndexSet
    @param {Number} length optional length of range.
    @returns {SC.IndexSet} receiver
  */
  add: function(start, length) {

    if (this.isFrozen) throw SC.FROZEN_ERROR;

    var content, cur, next;

    // normalize IndexSet input
    if (start && start.isIndexSet) {

      content = start._content;

      if (!content) return this; // nothing to do

      cur = 0 ;
      next = content[0];
      while(next !== 0) {
        if (next>0) this.add(cur, next-cur);
        cur = next<0 ? 0-next : next;
        next = content[cur];
      }
      return this ;

    } else if (length === undefined) {

      if (start === null || start === undefined) {
        return this; // nothing to do
      } else if (typeof start === SC.T_NUMBER) {
        length = 1 ;
      } else {
        length = start.length;
        start = start.start;
      }
    } else if (length === null) length = 1 ;

    // if no length - do nothing.
    if (length <= 0) return this;

    // special case - appending to end of set
    var max     = this.get('max'),
        oldmax  = max,
        delta, value ;

    content = this._content ;

    if (start === max) {

      // if adding to the end and the end is in set, merge.
      if (start > 0) {
        cur = this.rangeStartForIndex(start-1);
        next = content[cur];

        // just extend range at end
        if (next > 0) {
          delete content[max]; // no 0
          content[cur] = max = start + length ;
          start = cur ;

        // previous range was not in set, just tack onto the end
        } else {
          content[max] = max = start + length;
        }
      } else {
        content[start] = max = length;
      }

      content[max] = 0 ;
      this.set('max', max);
      this.set('length', this.length + length) ;
      length = max - start ;

    } else if (start > max) {
      content[max] = 0-start; // empty!
      content[start] = start+length ;
      content[start+length] = 0; // set end
      this.set('max', start + length) ;
      this.set('length', this.length + length) ;

      // affected range goes from starting range to end of content.
      length = start + length - max ;
      start = max ;

    // otherwise, merge into existing range
    } else {

      // find nearest starting range.  split or join that range
      cur   = this.rangeStartForIndex(start);
      next  = content[cur];
      max   = start + length ;
      delta = 0 ;

      // we are right on a boundary and we had a range or were the end, then
      // go back one more.
      if ((start>0) && (cur === start) && (next <= 0)) {
        cur = this.rangeStartForIndex(start-1);
        next = content[cur] ;
      }

      // previous range is not in set.  splice it here
      if (next < 0) {
        content[cur] = 0-start ;

        // if previous range extends beyond this range, splice afterwards also
        if (Math.abs(next) > max) {
          content[start] = 0-max;
          content[max] = next ;
        } else content[start] = next;

      // previous range is in set.  merge the ranges
      } else {
        start = cur ;
        if (next > max) {
          // delta -= next - max ;
          max = next ;
        }
      }

      // at this point there should be clean starting point for the range.
      // just walk the ranges, adding up the length delta and then removing
      // the range until we find a range that passes last
      cur = start;
      while (cur < max) {
        // get next boundary.  splice if needed - if value is 0, we are at end
        // just skip to last
        value = content[cur];
        if (value === 0) {
          content[max] = 0;
          next = max ;
          delta += max - cur ;
        } else {
          next  = Math.abs(value);
          if (next > max) {
            content[max] = value ;
            next = max ;
          }

          // ok, cur range is entirely inside top range.
          // add to delta if needed
          if (value < 0) delta += next - cur ;
        }

        delete content[cur] ; // and remove range
        cur = next;
      }

      // cur should always === last now.  if the following range is in set,
      // merge in also - don't adjust delta because these aren't new indexes
      if ((cur = content[max]) > 0) {
        delete content[max];
        max = cur ;
      }

      // finally set my own range.
      content[start] = max ;
      if (max > oldmax) this.set('max', max) ;

      // adjust length
      this.set('length', this.get('length') + delta);

      // compute hint range
      length = max - start ;
    }

    this._hint(start, length);
    if (delta !== 0) this.enumerableContentDidChange();
    return this;
  },

  /**
    Removes the specified range of indexes from the set

    @param {Number} start index, Range, or IndexSet
    @param {Number} length optional length of range.
    @returns {SC.IndexSet} receiver
  */
  remove: function(start, length) {

    if (this.isFrozen) throw SC.FROZEN_ERROR;

    // normalize input
    if (length === undefined) {
      if (start === null || start === undefined) {
        return this; // nothing to do

      } else if (typeof start === SC.T_NUMBER) {
        length = 1 ;

      // if passed an index set, just add each range in the index set.
      } else if (start.isIndexSet) {
        start.forEachRange(this.remove, this);
        return this;

      } else {
        length = start.length;
        start = start.start;
      }
    }

    if (length <= 0) return this; // nothing to do

    // special case - appending to end of set
    var max     = this.get('max'),
        oldmax  = max,
        content = this._content,
        cur, next, delta, value, last ;

    // if we're past the end, do nothing.
    if (start >= max) return this;

    // find nearest starting range.  split or join that range
    cur   = this.rangeStartForIndex(start);
    next  = content[cur];
    last  = start + length ;
    delta = 0 ;

    // we are right on a boundary and we had a range or were the end, then
    // go back one more.
    if ((start>0) && (cur === start) && (next > 0)) {
      cur = this.rangeStartForIndex(start-1);
      next = content[cur] ;
    }

    // previous range is in set.  splice it here
    if (next > 0) {
      content[cur] = start ;

      // if previous range extends beyond this range, splice afterwards also
      if (next > last) {
        content[start] = last;
        content[last] = next ;
      } else content[start] = next;

    // previous range is not in set.  merge the ranges
    } else {
      start = cur ;
      next  = Math.abs(next);
      if (next > last) {
        last = next ;
      }
    }

    // at this point there should be clean starting point for the range.
    // just walk the ranges, adding up the length delta and then removing
    // the range until we find a range that passes last
    cur = start;
    while (cur < last) {
      // get next boundary.  splice if needed - if value is 0, we are at end
      // just skip to last
      value = content[cur];
      if (value === 0) {
        content[last] = 0;
        next = last ;

      } else {
        next  = Math.abs(value);
        if (next > last) {
          content[last] = value ;
          next = last ;
        }

        // ok, cur range is entirely inside top range.
        // add to delta if needed
        if (value > 0) delta += next - cur ;
      }

      delete content[cur] ; // and remove range
      cur = next;
    }

    // cur should always === last now.  if the following range is not in set,
    // merge in also - don't adjust delta because these aren't new indexes
    if ((cur = content[last]) < 0) {
      delete content[last];
      last = Math.abs(cur) ;
    }

    // set my own range - if the next item is 0, then clear it.
    if (content[last] === 0) {
      delete content[last];
      content[start] = 0 ;
      this.set('max', start); //max has changed

    } else {
      content[start] = 0-last ;
    }

    // adjust length
    this.set('length', this.get('length') - delta);

    // compute hint range
    length = last - start ;

    this._hint(start, length);
    if (delta !== 0) this.enumerableContentDidChange();
    return this;
  },

  /** @private
    iterates through a named range, setting hints every HINT_SIZE indexes
    pointing to the nearest range start.  The passed range must start on a
    range boundary.  It can end anywhere.
  */
  _hint: function(start, length, content) {
    if (content === undefined) content = this._content;

    var skip    = SC.IndexSet.HINT_SIZE,
        next    = Math.abs(content[start]), // start of next range
        loc     = start - (start % skip) + skip, // next hint loc
        lim     = start + length ; // stop

    while (loc < lim) {
      // make sure we are in current rnage
      while ((next !== 0) && (next <= loc)) {
        start = next ;
        next  = Math.abs(content[start]) ;
      }

      // past end
      if (next === 0) {
        delete content[loc];

      // do not change if on actual boundary
      } else if (loc !== start) {
        content[loc] = start ;  // set hint
      }

      loc += skip;
    }
  },

  /**
    Clears the set
  */
  clear: function() {
    if (this.isFrozen) throw SC.FROZEN_ERROR;

    var oldlen = this.length;
    this._content.length=1;
    this._content[0] = 0;
    this.set('length', 0).set('max', 0);
    if (oldlen > 0) this.enumerableContentDidChange();
  },

  /**
    Add all the ranges in the passed array.
  */
  addEach: function(objects) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;

    this.beginPropertyChanges();
    var idx = objects.get('length') ;
    if (objects.isSCArray) {
      while(--idx >= 0) this.add(objects.objectAt(idx)) ;
    } else if (objects.isEnumerable) {
      objects.forEach(function(idx) { this.add(idx); }, this);
    }
    this.endPropertyChanges();

    return this ;
  },

  /**
    Removes all the ranges in the passed array.
  */
  removeEach: function(objects) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;

    this.beginPropertyChanges();

    var idx = objects.get('length') ;
    if (objects.isSCArray) {
      while(--idx >= 0) this.remove(objects.objectAt(idx)) ;
    } else if (objects.isEnumerable) {
      objects.forEach(function(idx) { this.remove(idx); }, this);
    }

    this.endPropertyChanges();

    return this ;
  },

  /**
   Clones the set into a new set.
  */
  clone: function() {
    return SC.IndexSet.create(this);
  },

  /**
    Returns a string describing the internal range structure.  Useful for
    debugging.

    @returns {String}
  */
  inspect: function() {
    var content = this._content,
        len     = content.length,
        idx     = 0,
        ret     = [],
        item;

    for(idx=0;idx<len;idx++) {
      item = content[idx];
      if (item !== undefined) ret.push("%@:%@".fmt(idx,item));
    }
    return "SC.IndexSet<%@>".fmt(ret.join(' , '));
  },

  /**
    Invoke the callback, passing each occuppied range instead of each
    index.  This can be a more efficient way to iterate in some cases.  The
    callback should have the signature:

    {{{
      callback(start, length, indexSet, source) { ... }
    }}}

    If you pass a target as a second option, the callback will be called in
    the target context.

    @param {Function} callback the iterator callback
    @param {Object} target the target
    @returns {SC.IndexSet} receiver
  */
  forEachRange: function(callback, target) {
    var content = this._content,
        cur     = 0,
        next    = content[cur],
        source  = this.source;

    if (target === undefined) target = null ;
    while (next !== 0) {
      if (next > 0) callback.call(target, cur, next - cur, this, source);
      cur  = Math.abs(next);
      next = content[cur];
    }

    return this ;
  },

  /**
    Invokes the callback for each index within the passed start/length range.
    Otherwise works just like regular forEach().

    @param {Number} start starting index
    @param {Number} length length of range
    @param {Function} callback
    @param {Object} target
    @returns {SC.IndexSet} receiver
  */
  forEachIn: function(start, length, callback, target) {
    var content = this._content,
        cur     = 0,
        idx     = 0,
        lim     = start + length,
        source  = this.source,
        next    = content[cur];

    if (target === undefined) target = null ;
    while (next !== 0) {
      if (cur < start) cur = start ; // skip forward
      while((cur < next) && (cur < lim)) {
        callback.call(target, cur++, idx++, this, source);
      }

      if (cur >= lim) {
        cur = next = 0 ;
      } else {
        cur  = Math.abs(next);
        next = content[cur];
      }
    }
    return this ;
  },

  /**
    Total number of indexes within the specified range.

    @param {Number|SC.IndexSet} start index, range object or IndexSet
    @param {Number} length optional range length
    @returns {Number} count of indexes
  */
  lengthIn: function(start, length) {

    var ret = 0 ;

    // normalize input
    if (length === undefined) {
      if (start === null || start === undefined) {
        return 0; // nothing to do

      } else if (typeof start === SC.T_NUMBER) {
        length = 1 ;

      // if passed an index set, just add each range in the index set.
      } else if (start.isIndexSet) {
        start.forEachRange(function(start, length) {
          ret += this.lengthIn(start, length);
        }, this);
        return ret;

      } else {
        length = start.length;
        start = start.start;
      }
    }

    // fast path
    if (this.get('length') === 0) return 0;

    var content = this._content,
        cur     = 0,
        next    = content[cur],
        lim     = start + length ;

    while (cur<lim && next !== 0) {
      if (next>0) {
        ret += (next>lim) ? lim-cur : next-cur;
      }
      cur  = Math.abs(next);
      next = content[cur];
    }

    return ret ;
  },

  // ..........................................................
  // OBJECT API
  //

  /**
    Optionally set the source property on an index set and then you can
    iterate over the actual object values referenced by the index set.  See
    indexOf(), lastIndexOf(), forEachObject(), addObject() and removeObject().
  */
  source: null,

  /**
    Returns the first index in the set that matches the passed object.  You
    must have a source property on the set for this to work.

    @param {Object} object the object to check
    @param {Number} startAt optional starting point
    @returns {Number} found index or -1 if not in set
  */
  indexOf: function(object, startAt) {
    var source  = this.source;
    if (!source) throw "%@.indexOf() requires source".fmt(this);

    var len     = source.get('length'),

        // start with the first index in the set
        content = this._content,
        cur     = content[0]<0 ? Math.abs(content[0]) : 0,
        idx ;

    while(cur>=0 && cur<len) {
      idx = source.indexOf(object, cur);
      if (idx<0) return -1 ; // not found in source
      if (this.contains(idx)) return idx; // found in source and in set.
      cur = idx+1;
    }

    return -1; // not found
  },

  /**
    Returns the last index in the set that matches the passed object.  You
    must have a source property on the set for this to work.

    @param {Object} object the object to check
    @param {Number} startAt optional starting point
    @returns {Number} found index or -1 if not in set
  */
  lastIndexOf: function(object, startAt) {
    var source  = this.source;
    if (!source) throw "%@.lastIndexOf() requires source".fmt(this);

    // start with the last index in the set
    var len     = source.get('length'),
        cur     = this.max-1,
        idx ;

    if (cur >= len) cur = len-1;
    while (cur>=0) {
      idx = source.lastIndexOf(object, cur);
      if (idx<0) return -1 ; // not found in source
      if (this.contains(idx)) return idx; // found in source and in set.
      cur = idx+1;
    }

    return -1; // not found
  },

  /**
    Iterates through the objects at each index location in the set.  You must
    have a source property on the set for this to work.  The callback you pass
    will be invoked for each object in the set with the following signature:

    {{{
      function callback(object, index, source, indexSet) { ... }
    }}}

    If you pass a target, it will be used when the callback is called.

    @param {Function} callback function to invoke.
    @param {Object} target optional content. otherwise uses window
    @returns {SC.IndexSet} receiver
  */
  forEachObject: function(callback, target) {
    var source  = this.source;
    if (!source) throw "%@.forEachObject() requires source".fmt(this);

    var content = this._content,
        cur     = 0,
        idx     = 0,
        next    = content[cur];

    if (target === undefined) target = null ;
    while (next !== 0) {

      while(cur < next) {
        callback.call(target, source.objectAt(cur), cur, source, this);
        cur++;
      }

      cur  = Math.abs(next);
      next = content[cur];
    }
    return this ;
  },

  /**
    Adds all indexes where the object appears to the set.  If firstOnly is
    passed, then it will find only the first index and add it.  If  you know
    the object only appears in the source array one time, firstOnly may make
    this method faster.

    Requires source to work.

    @param {Object} object the object to add
    @returns {SC.IndexSet} receiver
  */
  addObject: function(object, firstOnly) {
    var source  = this.source;
    if (!source) throw "%@.addObject() requires source".fmt(this);

    var len = source.get('length'),
        cur = 0, idx;

    while(cur>=0 && cur<len) {
      idx = source.indexOf(object, cur);
      if (idx >= 0) {
        this.add(idx);
        if (firstOnly) return this ;
        cur = idx++;
      } else return this ;
    }
    return this ;
  },

  /**
    Adds any indexes matching the passed objects.  If firstOnly is passed,
    then only finds the first index for each object.

    @param {SC.Enumerable} objects the objects to add
    @returns {SC.IndexSet} receiver
  */
  addObjects: function(objects, firstOnly) {
    objects.forEach(function(object) {
      this.addObject(object, firstOnly);
    }, this);
    return this;
  },

  /**
    Removes all indexes where the object appears to the set.  If firstOnly is
    passed, then it will find only the first index and add it.  If  you know
    the object only appears in the source array one time, firstOnly may make
    this method faster.

    Requires source to work.

    @param {Object} object the object to add
    @returns {SC.IndexSet} receiver
  */
  removeObject: function(object, firstOnly) {
    var source  = this.source;
    if (!source) throw "%@.removeObject() requires source".fmt(this);

    var len = source.get('length'),
        cur = 0, idx;

    while(cur>=0 && cur<len) {
      idx = source.indexOf(object, cur);
      if (idx >= 0) {
        this.remove(idx);
        if (firstOnly) return this ;
        cur = idx+1;
      } else return this ;
    }
    return this ;
  },

  /**
    Removes any indexes matching the passed objects.  If firstOnly is passed,
    then only finds the first index for each object.

    @param {SC.Enumerable} objects the objects to add
    @returns {SC.IndexSet} receiver
  */
  removeObjects: function(objects, firstOnly) {
    objects.forEach(function(object) {
      this.removeObject(object, firstOnly);
    }, this);
    return this;
  },


  // .......................................
  // PRIVATE
  //

  /**
    Usually observing notifications from IndexSet are not useful, so
    supress them by default.

    @property {Boolean}
  */
  LOG_OBSERVING: NO,

  /** @private - optimized call to forEach() */
  forEach: function(callback, target) {
    var content = this._content,
        cur     = 0,
        idx     = 0,
        source  = this.source,
        next    = content[cur];

    if (target === undefined) target = null ;
    while (next !== 0) {
      while(cur < next) {
        callback.call(target, cur++, idx++, this, source);
      }
      cur  = Math.abs(next);
      next = content[cur];
    }
    return this ;
  },

  /** @private - support iterators */
  nextObject: function(ignore, idx, context) {
    var content = this._content,
        next    = context.next,
        max     = this.get('max'); // next boundary

    // seed.
    if (idx === null) {
      idx = next = 0 ;

    } else if (idx >= max) {
      delete context.next; // cleanup context
      return null ; // nothing left to do

    } else idx++; // look on next index

    // look for next non-empty range if needed.
    if (idx === next) {
      do {
        idx = Math.abs(next);
        next = content[idx];
      } while(next < 0);
      context.next = next;
    }

    return idx;
  },

  toString: function() {
    var str = [];
    this.forEachRange(function(start, length) {
      str.push(length === 1 ? start : "%@..%@".fmt(start, start + length - 1));
    }, this);
    return "SC.IndexSet<%@>".fmt(str.join(',')) ;
  },

  max: 0

}) ;

SC.IndexSet.slice = SC.IndexSet.copy = SC.IndexSet.clone ;
SC.IndexSet.EMPTY = SC.IndexSet.create().freeze();

/* >>>>>>>>>> BEGIN source/system/logger.js */
// ==========================================================================
// SC.Logger
// ==========================================================================


/**
  If {@link SC.Logger.format} is true, this delimiter will be put between arguments.

  @property {String}
*/
SC.LOGGER_LOG_DELIMITER = ", ";

/**
  If {@link SC.Logger.error} falls back onto {@link SC.Logger.log}, this will be
  prepended to the output.

  @property {String}
*/
SC.LOGGER_LOG_ERROR = "ERROR: ";

/**
  If {@link SC.Logger.info} falls back onto {@link SC.Logger.log}, this will be
  prepended to the output.

  @property {String}
*/
SC.LOGGER_LOG_INFO = "INFO: ";

/**
  If {@link SC.Logger.warn} falls back onto {@link SC.Logger.log}, this will be
  prepended to the output.

  @property {String}
*/
SC.LOGGER_LOG_WARN = "WARNING: ";

/**
  If {@link SC.Logger.debug} falls back onto {@link SC.Logger.log}, this will be
  prepended to the output.

  @property {String}
*/
SC.LOGGER_LOG_DEBUG = "DEBUG: ";

/** @class

  Object to allow for safe logging actions, such as using the browser console.

  The FireFox plugin Firebug was used as a function reference. Please see
  {@link <a href="http://getfirebug.com/logging.html">Firebug Logging Reference</a>}
  for further information.

  @author Colin Campbell
  @author Benedikt Böhm
  @extends SC.Object
  @since Sproutcore 1.0
  @see <a href="http://getfirebug.com/logging.html">Firebug Logging Reference</a>
*/
SC.Logger = SC.Object.create({

  // ..........................................................
  // PROPERTIES
  //

  /**
    Whether or not to enable debug logging.

    @property: {Boolean}
  */
  debugEnabled: NO,

  /**
    Computed property that checks for the existence of the reporter object.

    @property {Boolean}
  */
  exists: function() {
    return typeof(this.get('reporter')) !== 'undefined' && this.get('reporter') != null;
  }.property('reporter').cacheable(),

  /**
    If console.log does not exist, SC.Logger will use window.alert instead.

    This property is only used inside {@link SC.Logger.log}. If fallBackOnLog is
    false and you call a different function, an alert will not be opened.

    @property {Boolean}
  */
  fallBackOnAlert: NO,

  /**
    If some function, such as console.dir, does not exist,
    SC.Logger will try console.log if this is true.

    @property {Boolean}
  */
  fallBackOnLog: YES,

  /**
    Whether or not to format multiple arguments together
    or let the browser deal with that.

    @property {Boolean}
  */
  format: YES,

  /**
    The reporter is the object which implements the actual logging functions.

    @default The browser's console
    @property {Object}
  */
  reporter: console,

  // ..........................................................
  // METHODS
  //

  /**
    Log output to the console, but only if it exists.

    @param {String|Array|Function|Object}
    @returns {Boolean} true if reporter.log exists, false otherwise
  */
  log: function() {
    var reporter = this.get('reporter');

    // log through the reporter
    if (this.get('exists') && typeof(reporter.log) === "function") {
      if (this.get('format')) {
        reporter.log(this._argumentsToString.apply(this, arguments));
      }
      else {
        reporter.log.apply(reporter, arguments);
      }
      return true;
    }

    // log through alert
    else if (this.fallBackOnAlert) {
      var s = this.get('format') ? this._argumentsToString.apply(this, arguments) : arguments;
      // include support for overriding the alert through the reporter
      // if it has come this far, it's likely this will fail
      if (this.get('exists') && typeof(reporter.alert) === "function") {
        reporter.alert(s);
      }
      else {
        alert(s);
      }
      return true;
    }
    return false;
  },

  /**
    Log a debug message to the console.

    Logs the response using {@link SC.Logger.log} if reporter.debug does not exist and
    {@link SC.Logger.fallBackOnLog} is true.

    @param {String|Array|Function|Object}
    @returns {Boolean} true if logged to reporter, false if not
  */
  debug: function() {
    var reporter = this.get('reporter');

    if (this.get('debugEnabled') !== YES) {
      return false;
    }

    if (this.get('exists') && (typeof reporter.debug === "function")) {
      reporter.debug.apply(reporter, arguments);
      return true;
    }
    else if (this.fallBackOnLog) {
      var a = this._argumentsToArray(arguments);
      if (typeof(a.unshift) === "function") a.unshift(SC.LOGGER_LOG_DEBUG);
      return this.log.apply(this, a);
    }
    return false;
  },

  /**
    Prints the properties of an object.

    Logs the object using {@link SC.Logger.log} if the reporter.dir function does not exist and
    {@link SC.Logger.fallBackOnLog} is true.

    @param {Object}
    @returns {Boolean} true if logged to console, false if not
  */
  dir: function() {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.dir) === "function") {
      // Firebug's console.dir doesn't support multiple objects here
      // but maybe custom reporters will
      reporter.dir.apply(reporter, arguments);
      return true;
    }
    return (this.fallBackOnLog) ? this.log.apply(this, arguments) : false;
  },

  /**
    Prints an XML outline for any HTML or XML object.

    Logs the object using {@link SC.Logger.log} if reporter.dirxml function does not exist and
    {@lnk SC.Logger.fallBackOnLog} is true.

    @param {Object}
    @returns {Boolean} true if logged to reporter, false if not
  */
  dirxml: function() {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.dirxml) === "function") {
      // Firebug's console.dirxml doesn't support multiple objects here
      // but maybe custom reporters will
      reporter.dirxml.apply(reporter, arguments);
      return true;
    }
    return (this.fallBackOnLog) ? this.log.apply(this, arguments) : false;
  },

  /**
    Log an error to the console

    Logs the error using {@link SC.Logger.log} if reporter.error does not exist and
    {@link SC.Logger.fallBackOnLog} is true.

    @param {String|Array|Function|Object}
    @returns {Boolean} true if logged to reporter, false if not
  */
  error: function() {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.error) === "function") {
      reporter.error.apply(reporter, arguments);
      return true;
    }
    else if (this.fallBackOnLog) {
      var a = this._argumentsToArray(arguments);
      if (typeof(a.unshift) === "function") a.unshift(SC.LOGGER_LOG_ERROR);
      return this.log.apply(this, a);
    }
    return false;
  },

  /**
    Every log after this call until {@link SC.Logger.groupEnd} is called
    will be indented for readability. You can create as many levels
    as you want.

    @param {String} [title] An optional title to display above the group
    @returns {Boolean} true if reporter.group exists, false otherwise
  */
  group: function(s) {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.group) === "function") {
      reporter.group(s);
      return true;
    }
    return false;
  },

  /**
    Ends a group declared with {@link SC.Logger.group}.

    @returns {Boolean} true if the reporter.groupEnd exists, false otherwise
    @see SC.Logger.group
  */
  groupEnd: function() {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.groupEnd) === "function") {
      reporter.groupEnd();
      return true;
    }
    return false;
  },

  /**
    Log an information response to the reporter.

    Logs the response using {@link SC.Logger.log} if reporter.info does not exist and
    {@link SC.Logger.fallBackOnLog} is true.

    @param {String|Array|Function|Object}
    @returns {Boolean} true if logged to reporter, false if not
  */
  info: function() {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.info) === "function") {
      reporter.info.apply(reporter, arguments);
      return true;
    }
    else if (this.fallBackOnLog) {
      var a = this._argumentsToArray(arguments);
      if (typeof(a.unshift) === "function") a.unshift(SC.LOGGER_LOG_INFO);
      return this.log.apply(this, a);
    }
    return false;
  },

  /**
    Begins the JavaScript profiler, if it exists. Call {@link SC.Logger.profileEnd}
    to end the profiling process and receive a report.

    @returns {Boolean} true if reporter.profile exists, false otherwise
  */
  profile: function() {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.profile) === "function") {
      reporter.profile();
      return true;
    }
    return false;
  },

  /**
    Ends the JavaScript profiler, if it exists.

    @returns {Boolean} true if reporter.profileEnd exists, false otherwise
    @see SC.Logger.profile
  */
  profileEnd: function() {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.profileEnd) === "function") {
      reporter.profileEnd();
      return true;
    }
    return false;
  },

  /**
    Measure the time between when this function is called and
    {@link SC.Logger.timeEnd} is called.

    @param {String} name The name of the profile to begin
    @returns {Boolean} true if reporter.time exists, false otherwise
    @see SC.Logger.timeEnd
  */
  time: function(name) {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.time) === "function") {
      reporter.time(name);
      return true;
    }
    return false;
  },

  /**
    Ends the profile specified.

    @param {String} name The name of the profile to end
    @returns {Boolean} true if reporter.timeEnd exists, false otherwise
    @see SC.Logger.time
  */
  timeEnd: function(name) {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.timeEnd) === "function") {
      reporter.timeEnd(name);
      return true;
    }
    return false;
  },

  /**
    Prints a stack-trace.

    @returns {Boolean} true if reporter.trace exists, false otherwise
  */
  trace: function() {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.trace) === "function") {
      reporter.trace();
      return true;
    }
    return false;
  },

  /**
    Log a warning to the console.

    Logs the warning using {@link SC.Logger.log} if reporter.warning does not exist and
    {@link SC.Logger.fallBackOnLog} is true.

    @param {String|Array|Function|Object}
    @returns {Boolean} true if logged to reporter, false if not
  */
  warn: function() {
    var reporter = this.get('reporter');

    if (this.get('exists') && typeof(reporter.warn) === "function") {
      reporter.warn.apply(reporter, arguments);
      return true;
    }
    else if (this.fallBackOnLog) {
      var a = this._argumentsToArray(arguments);
      if (typeof(a.unshift) === "function") a.unshift(SC.LOGGER_LOG_WARN);
      return this.log.apply(this, a);
    }
    return false;
  },

  // ..........................................................
  // INTERNAL SUPPORT
  //

  /**
    @private

    The arguments function property doesn't support Array#unshift. This helper
    copies the elements of arguments to a blank array.

    @param {Array} arguments The arguments property of a function
    @returns {Array} An array containing the elements of arguments parameter
  */
  _argumentsToArray: function(args) {
    if (!args) return [];
    var a = [];
    for (var i = 0; i < args.length; i++) {
      a[i] = args[i];
    }
    return a;
  },

  /**
    @private

    Formats the arguments array of a function by creating a string
    with SC.LOGGER_LOG_DELIMITER between the elements.

    @returns {String} A string of formatted arguments
  */
  _argumentsToString: function() {
    var s = "";
    for (var i = 0; i<arguments.length - 1; i++) {
      s += arguments[i] + SC.LOGGER_LOG_DELIMITER;
    }
    s += arguments[arguments.length-1];
    return s;
  }

});

/* >>>>>>>>>> BEGIN source/system/run_loop.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('private/observer_set');

/**
  @class

  The run loop provides a universal system for coordinating events within
  your application.  The run loop processes timers as well as pending
  observer notifications within your application.

  To use a RunLoop within your application, you should make sure your event
  handlers always begin and end with SC.RunLoop.begin() and SC.RunLoop.end()

  The RunLoop is important because bindings do not fire until the end of
  your run loop is reached.  This improves the performance of your
  application.

  h2. Example

  This is how you could write your mouseup handler in jQuery:

  {{{
    $('#okButton').on('click', function() {
      SC.RunLoop.begin();

      // handle click event...

      SC.RunLoop.end(); // allows bindings to trigger...
    });
  }}}

  @extends SC.Object
  @since SproutCore 1.0
*/
SC.RunLoop = SC.Object.extend(/** @scope SC.RunLoop.prototype */ {

  /**
    Call this method whenver you begin executing code.

    This is typically invoked automatically for you from event handlers and
    the timeout handler.  If you call setTimeout() or setInterval() yourself,
    you may need to invoke this yourself.

    @returns {SC.RunLoop} receiver
  */
  beginRunLoop: function() {
    this._start = new Date().getTime() ; // can't use Date.now() in runtime
    if (SC.LOG_BINDINGS || SC.LOG_OBSERVERS) {
      console.log("-- SC.RunLoop.beginRunLoop at %@".fmt(this._start));
    }
    this._runLoopInProgress = YES;
    return this ;
  },

  /**
    YES when a run loop is in progress

    @property {Boolean}
  */
  isRunLoopInProgress: function() {
    return this._runLoopInProgress;
  }.property(),

  /**
    Call this method whenever you are done executing code.

    This is typically invoked automatically for you from event handlers and
    the timeout handler.  If you call setTimeout() or setInterval() yourself
    you may need to invoke this yourself.

    @returns {SC.RunLoop} receiver
  */
  endRunLoop: function() {
    // at the end of a runloop, flush all the delayed actions we may have
    // stored up.  Note that if any of these queues actually run, we will
    // step through all of them again.  This way any changes get flushed
    // out completely.

    if (SC.LOG_BINDINGS || SC.LOG_OBSERVERS) {
      console.log("-- SC.RunLoop.endRunLoop ~ flushing application queues");
    } 
    
    this.flushAllPending();
    
    this._start = null ;

    if (SC.LOG_BINDINGS || SC.LOG_OBSERVERS) {
      console.log("-- SC.RunLoop.endRunLoop ~ End");
    }

    SC.RunLoop.lastRunLoopEnd = Date.now();
    this._runLoopInProgress = NO;

    return this ;
  },

  /**
    Repeatedly flushes all bindings, observers, and other queued functions until all queues are empty.
  */
  flushAllPending: function() {
    var didChange ;
    
    do {
      didChange = this.flushApplicationQueues() ;
      if (!didChange) didChange = this._flushinvokeLastQueue() ; 
    } while(didChange) ;
  },
  
  
  /**
    Invokes the passed target/method pair once at the end of the runloop.
    You can call this method as many times as you like and the method will
    only be invoked once.

    Usually you will not call this method directly but use invokeOnce()
    defined on SC.Object.

    Note that in development mode only, the object and method that call this
    method will be recorded, for help in debugging scheduled code.

    @param {Object} target
    @param {Function} method
    @returns {SC.RunLoop} receiver
  */
  invokeOnce: function(target, method) {
    // normalize
    if (method === undefined) {
      method = target; target = this ;
    }

    if (typeof method === "string") method = target[method];
    if (!this._invokeQueue) this._invokeQueue = SC.ObserverSet.create();
    if ( method ) this._invokeQueue.add(target, method);
    return this ;
  },

  /**
    Invokes the passed target/method pair at the very end of the run loop,
    once all other delayed invoke queues have been flushed.  Use this to
    schedule cleanup methods at the end of the run loop once all other work
    (including rendering) has finished.

    If you call this with the same target/method pair multiple times it will
    only invoke the pair only once at the end of the runloop.

    Usually you will not call this method directly but use invokeLast()
    defined on SC.Object.

    Note that in development mode only, the object and method that call this
    method will be recorded, for help in debugging scheduled code.

    @param {Object} target
    @param {Function} method
    @returns {SC.RunLoop} receiver
  */
  invokeLast: function(target, method) {
    // normalize
    if (method === undefined) {
      method = target; target = this ;
    }

    if (typeof method === "string") method = target[method];
    if (!this._invokeLastQueue) this._invokeLastQueue = SC.ObserverSet.create();
    this._invokeLastQueue.add(target, method);
    return this ;
  },

  /**
    Executes any pending events at the end of the run loop.  This method is
    called automatically at the end of a run loop to flush any pending
    queue changes.

    The default method will invoke any one time methods and then sync any
    bindings that might have changed.  You can override this method in a
    subclass if you like to handle additional cleanup.

    This method must return YES if it found any items pending in its queues
    to take action on.  endRunLoop will invoke this method repeatedly until
    the method returns NO.  This way if any if your final executing code
    causes additional queues to trigger, then can be flushed again.

    @returns {Boolean} YES if items were found in any queue, NO otherwise
  */
  flushApplicationQueues: function() {
    var hadContent = NO,
        // execute any methods in the invokeQueue.
        queue = this._invokeQueue;
    if ( queue && queue.getMembers().length ) {
      this._invokeQueue = null; // reset so that a new queue will be created
      hadContent = YES ; // needs to execute again
      queue.invokeMethods();
    }

    // flush any pending changed bindings.  This could actually trigger a
    // lot of code to execute.
    return SC.Binding.flushPendingChanges() || hadContent ;
  },

  _flushinvokeLastQueue: function() {
    var queue = this._invokeLastQueue, hadContent = NO ;
    if (queue && queue.getMembers().length ) {
      this._invokeLastQueue = null; // reset queue.
      hadContent = YES; // has targets!
      if (hadContent) queue.invokeMethods();
    }
    return hadContent ;
  }

});

/**
  The current run loop.  This is created automatically the first time you
  call begin().

  @property {SC.RunLoop}
*/
SC.RunLoop.currentRunLoop = null;

/**
  The default RunLoop class.  If you choose to extend the RunLoop, you can
  set this property to make sure your class is used instead.

  @property {Class}
*/
SC.RunLoop.runLoopClass = SC.RunLoop;

/**
  Begins a new run loop on the currentRunLoop.  If you are already in a
  runloop, this method has no effect.

  @returns {SC.RunLoop} receiver
*/
SC.RunLoop.begin = function() {
  var runLoop = this.currentRunLoop;
  if (!runLoop) runLoop = this.currentRunLoop = this.runLoopClass.create();
  runLoop.beginRunLoop();
  return this ;
};

/**
  Ends the run loop on the currentRunLoop.  This will deliver any final
  pending notifications and schedule any additional necessary cleanup.

  @returns {SC.RunLoop} receiver
*/
SC.RunLoop.end = function() {
  var runLoop = this.currentRunLoop;
  if (!runLoop) {
    throw "SC.RunLoop.end() called outside of a runloop!";
  }
  runLoop.endRunLoop();
  return this ;
} ;

/**
  Returns YES when a run loop is in progress

  @return {Boolean}
*/
SC.RunLoop.isRunLoopInProgress = function() {
  if(this.currentRunLoop) return this.currentRunLoop.get('isRunLoopInProgress');
  return NO;
};

/**
  Executes a passed function in the context of a run loop. If called outside a 
  runloop, starts and ends one. If called inside an existing runloop, is 
  simply executes the function unless you force it to create a nested runloop.
  
  If an exception is thrown during execution, we give an error catcher the
  opportunity to handle it before allowing the exception to bubble again.
  
  @param {Function} callback callback to execute
  @param {Object} target context for callback
  @param {Boolean} if YES, starts/ends a new runloop even if one is already running
*/
SC.run = function(callback, target, forceNested) {
  var alreadyRunning = SC.RunLoop.isRunLoopInProgress();

  // Only use a try/catch block if we have an ExceptionHandler
  // since in some browsers try/catch causes a loss of the backtrace
  if (SC.ExceptionHandler && SC.ExceptionHandler.enabled) {
    try {
      if(forceNested || !alreadyRunning) SC.RunLoop.begin();
      if (callback) callback.call(target);
      if(forceNested || !alreadyRunning) SC.RunLoop.end();
    } catch (e) {
      SC.ExceptionHandler.handleException(e);

      // Now that we've handled the exception, throw it again so the browser
      // can deal with it (and potentially use it for debugging).
      // (We don't throw it in IE because the user will see two errors)
      if (!SC.browser.msie) {
        throw e;
      }
    }
  } else {
    if(forceNested || !alreadyRunning) SC.RunLoop.begin();
    if (callback) callback.call(target);
    if(forceNested || !alreadyRunning) SC.RunLoop.end();
  }
};



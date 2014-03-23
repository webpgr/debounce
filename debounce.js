var debounce = function(func, wait) {
	// we need to save these in the closure
	var timeout, args, context, timestamp, call_count = 0;

	return function() {

		// save details of latest call
		context = this;
		args = [].slice.call(arguments, 0);
		timestamp = new Date();
		
		// immediately fire on the first call
		if (call_count == 0) {
			func.apply(context, args);
		}
		++call_count;

		// this is where the magic happens
		var later = function() {

			// how long ago was the last call
			var last = (new Date()) - timestamp;

			// if the latest call was less that the wait period ago
			// then we reset the timeout to wait for the difference
			if (last < wait) {
				timeout = setTimeout(later, wait - last);

			// or if not we can null out the timer and run the latest
			} else {
				timeout = null;
				if (call_count > 1) { // only fire if this was not the first call, first call aready fired
					func.apply(context, args);
				}
				call_count = 0; // time is over reset the counter 
			}
		};

		// we only need to set the timer now if one isn't already running
		if (!timeout) {
			timeout = setTimeout(later, wait);
		}
	}
};

function EventBus() {
	this.listeners = {};
	this.on = function(eventName, cb) {
		if(!this.listeners[eventName]) this.listeners[eventName] = [];
		/* add the cb*/
		this.listeners[eventName].push(cb);
	};

	this.off = function(eventName, cb) {
		// array.indexOf(element)
		// X - element.indexOf(array)
		if (this.listeners[eventName].indexOf(cb) !== -1) {
			var i = this.listeners[eventName].indexOf(cb);
			var remove = this.listeners[eventName].splice(i, 1);
		}
	};

	this.trigger = function(eventName, data) {
		(this.listeners[eventName] || []).forEach(function(cb) {
			cb(data || {});
		});
	};
}
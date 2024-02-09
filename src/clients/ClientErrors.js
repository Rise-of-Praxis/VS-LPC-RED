class TimeoutError extends Error {

}

class ConnectError extends Error {
	
}

class RequestCancelledError extends Error {
	constructor(request) {
		super("Request was cancelled");

		this.request = request;
	}

}

module.exports = {
	ConnectError,
	TimeoutError,
	RequestCancelledError
}
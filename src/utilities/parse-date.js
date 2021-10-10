const dateStringPattern = /^(\d{4})\.(\d{2})\.(\d{2})-(\d{2})\.(\d{2})$/i

/**
 * Parses a date string into a {@link Date} value
 * @param {string} dateString The date string to parse 
 * @returns {Date}
 */
module.exports = (dateString) => {
	const matches = dateStringPattern.exec(dateString);
	if(!matches)
		return undefined;

	const [year, month, day, hour, minute] = matches.slice(1);
	const date = `${year}-${month}-${day}T${hour}:${minute}`;

	return new Date(date);
}
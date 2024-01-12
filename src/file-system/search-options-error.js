class InvalidSearchOptionError extends Error
{
    /**
     * @param {string} name The name of the parameter that is not valid
     * @param {string} [message] The error message
     */
    constructor(name, message)
    {
        super(message);
        this.name = name;
    }

    /**
     * The name of the option that was invalid
     */
    name;
}

module.exports = { InvalidSearchOptionError };
function debounce(func, timeout = 500)
{
    if (!timeout)
        return func;

    let timer;

    return (...args) =>
    {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

module.exports = {
    debounce
};
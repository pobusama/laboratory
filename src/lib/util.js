
/*根据参数名在url中获取参数值*/
export const getParamByName = name => {
    let match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

/*trim*/
export const trim = str => {
    return str.replace(/[(^\s)|(\s$)]/g, '');
};

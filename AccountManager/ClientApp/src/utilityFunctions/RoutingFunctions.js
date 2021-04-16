export function ExtractComponentFromRoute(url) {
    const params = url.split('/');
    return params[1];
};

export function ExtractIdFromUrl(url) {
    const params = url.split('/');
    return params[2];
}

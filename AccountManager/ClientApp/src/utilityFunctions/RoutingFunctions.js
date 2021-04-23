export function ExtractComponentFromRoute(url) {
    const params = url.split('/');
    return params[1];
};

export function ExtractIdFromUrl(url) {
    const params = url.split('/');
    return params[3];
}

export function AddIdToUrl(url, id) {
    url.replace(':id', id);
} 

export function MakeRequest(url, method, payLoad) {
    console.log(method)
    if (method === 'GET' || method === 'DELETE') {
        return fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
            }
        });
    }

    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(payLoad),
    });
}

export const ApiMethods = {
    Get: 'GET',
    Post: 'POST',
    Put: 'PUT',
    Delete: 'DELETE',
}
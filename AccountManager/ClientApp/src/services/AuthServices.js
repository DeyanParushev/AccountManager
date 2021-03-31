import { ApplicationPaths, BaseRoute, ApiPrefix } from '../components/api-authorization/ApiAuthorizationConstants';

export function RegisterService(user) {
    const url = BaseRoute + ApiPrefix + ApplicationPaths.Register;
    return postRequest(url, user)
        .then(res => {
            if (res.status === 400) {
                return 400;
            }
            else {
                return res.json();
            }
        })
        .then(data => data);
}

export async function LoginService(user) {
    const url = BaseRoute + ApiPrefix + ApplicationPaths.Login;
    return postRequest(url, user)
        .then(res => {
            if (res.status === 400) {
                return 400;
            }
            else {
                return res.json();
            }
        })
        .then(data => data);
}

function postRequest(url, payload) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
    });
}
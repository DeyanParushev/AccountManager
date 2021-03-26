import { ApplicationPaths, BaseRoute } from './ApiAuthorizationConstants';

export async function RegisterService(user) {
    var url = BaseRoute + ApplicationPaths.Register;
    var registerResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .catch(error => error.json());

    return registerResponse.json();
}

export async function LoginService(user) {
    var url = BaseRoute + ApplicationPaths.Login;
    var registerResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .catch(error => error.json());

    return registerResponse.json();
}
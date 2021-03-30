import { ApplicationPaths, BaseRoute, ApiPrefix } from '../components/api-authorization/ApiAuthorizationConstants';

export async function RegisterService(user) {
    const url = BaseRoute+ ApiPrefix + ApplicationPaths.Register;
    const registerResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
   
    return registerResponse;
}

export async function LoginService(user) {
    const url = BaseRoute+ ApiPrefix + ApplicationPaths.Login;
    const registerResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    return registerResponse;
}
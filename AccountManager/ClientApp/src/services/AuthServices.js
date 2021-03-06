import { ApiRoutes, BaseRoute, ApiPrefix } from '../components/api-authorization/ApiAuthorizationConstants';
import { MakeRequest, ApiMethods } from '../services/ApiRequests';

export async function RegisterService(user) {
    const url = BaseRoute + ApiPrefix + ApiRoutes.Register;
    return MakeRequest(url, ApiMethods.Post, user);
}

export async function LoginService(user) {
    const url = BaseRoute + ApiPrefix + ApiRoutes.Login;
    return MakeRequest(url, ApiMethods.Post, user);
}


export function LogoutService(user) {
    const url = BaseRoute + ApiPrefix + ApiRoutes.Logout;

    return MakeRequest(url, ApiMethods.Post, user, user.token)
    .then(res => {
        if(res.status === 400) {
            return 400;
        } else {
            return res;
        }
    });
}
import { ApplicationPaths, BaseRoute, ApiPrefix } from '../components/api-authorization/ApiAuthorizationConstants';
import { MakeRequest, ApiMethods } from '../services/ApiRequests';

export function RegisterService(user) {
    const url = BaseRoute + ApiPrefix + ApplicationPaths.Register;
    return MakeRequest(url, ApiMethods.Post, user)
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

export function LoginService(user) {
    const url = BaseRoute + ApiPrefix + ApplicationPaths.Login;
    return MakeRequest(url, ApiMethods.Post, user)
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


export function LogoutService(user) {
    const url = BaseRoute + ApiPrefix + ApplicationPaths.Logout;

    return MakeRequest(url, ApiMethods.Post, user)
    .then(res => {
        if(res.status === 400) {
            return 400;
        } else {
            return res;
        }
    });
}
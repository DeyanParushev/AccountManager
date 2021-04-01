import { ApplicationPaths } from '../components/api-authorization/ApiAuthorizationConstants';
import { MakeRequest, ApiMethods } from './ApiRequests';

export function GetAll(id, entity) {
    const url = ApplicationPaths[entity].All + `/${id}`;
    return MakeRequest(url, ApiMethods.Get)
        .then(response => {
            if (response.status === 400) {
                return 400;
            } else {
                return response.json();
            }
        })
        .then(data => data);
}

export function GetOne(id, entity) {
    const url = ApplicationPaths[entity].GetOne + `/${id}`;
    MakeRequest(url, ApiMethods.Get)
        .then(response => {
            if (response.status === 400) {
                return 400;
            } else {
                return response.json();
            }
        })
        .then(data => data);
}

export function Delete(id, entity) {
    const url = ApplicationPaths[entity].Delete + `/${id}`;
    return MakeRequest(url, ApiMethods.Delete)
        .then(response => {
            if (response.status === 400) {
                return 400;
            } else {
                return response.json();
            }
        })
        .then(data => data);
}

export function Edit(id, entity, object) {
    const url = ApplicationPaths[entity].Edit + `/${id}`;
    return MakeRequest(url, ApiMethods.Put, object)
        .then(response => {
            if (response.status === 400) {
                return 400;
            } else {
                return response.json();
            }
        })
        .then(data => data);
}

export function Create(id, entity, object) {
    const url = ApplicationPaths[entity].Create + `/${id}`;
    return MakeRequest(url, ApiMethods.Put, object)
        .then(response => {
            if (response.status === 400) {
                return 400;
            } else {
                return response.json();
            }
        })
        .then(data => data);
}

import { ApplicationPaths } from '../components/api-authorization/ApiAuthorizationConstants';
import { MakeRequest, ApiMethods } from './ApiRequests';

export function GetAll(id, entity, token) {
    const url = ApplicationPaths[entity].All + id!==null ?`/${id}` : '';
    return MakeRequest(url, ApiMethods.Get, null, token)
        .then(response => {
            if (response.status === 400) {
                return 400;
            } else {
                return response.json();
            }
        })
        .then(data => data);
}

export function GetOne(id, entity, token) {
    const url = ApplicationPaths[entity].GetOne + `/${id}`;
    MakeRequest(url, ApiMethods.Get, null, token)
        .then(response => {
            if (response.status === 400) {
                return 400;
            } else {
                return response.json();
            }
        })
        .then(data => data);
}

export function Delete(id, entity, token) {
    const url = ApplicationPaths[entity].Delete + `/${id}`;
    return MakeRequest(url, ApiMethods.Delete, null, token)
        .then(response => {
            if (response.status === 400) {
                return 400;
            } else {
                return response.json();
            }
        })
        .then(data => data);
}

export function Edit(id, entity, object, token) {
    const url = ApplicationPaths[entity].Edit + `/${id}`;
    return MakeRequest(url, ApiMethods.Put, object, token)
        .then(response => {
            if (response.status === 400) {
                return 400;
            } else {
                return response.json();
            }
        })
        .then(data => data);
}

export function Create(id, entity, object, token) {
    const url = ApplicationPaths[entity].Create + `/${id}`;
    return MakeRequest(url, ApiMethods.Post, object, token)
        .then(response => {
            if (response.status === 400) {
                return 400;
            } else {
                return response.json();
            }
        })
        .then(data => data);
}

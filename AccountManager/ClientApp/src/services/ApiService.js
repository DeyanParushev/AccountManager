import { ApplicationPaths } from '../components/api-authorization/ApiAuthorizationConstants';
import { MakeRequest, ApiMethods } from './ApiRequests';

export async function GetAll(id, entity, token) {
    const url = `${ApplicationPaths[entity].All}/${id}`;
    return await MakeRequest(url, ApiMethods.Get, null, token);
}

export async function GetOne(id, entity, token) {
    const url = `${ApplicationPaths[entity].GetOne}/${id}`;
    return await MakeRequest(url, ApiMethods.Get, null, token)
}

export function Delete(id, entity, token) {
    const url = ApplicationPaths[entity].Delete + `/${id}`;
    return MakeRequest(url, ApiMethods.Delete, null, token)
        .then(response => {
            if (response.status === 400) {
                return 400;
            } else if (response.status === 200) {
                return response;
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
            } else if (response.status === 200) {
                return response;
            } else {
                return response.json();
            }
        })
        .then(data => data);
}

export async function Create(id, entity, object, token) {
    const url = `${ApplicationPaths[entity].Create}/${id}`;
    return await MakeRequest(url, ApiMethods.Post, object, token);
}

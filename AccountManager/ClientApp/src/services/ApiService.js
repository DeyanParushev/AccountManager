import { ApiRoutes } from '../components/api-authorization/ApiAuthorizationConstants';
import { MakeRequest, ApiMethods } from './ApiRequests';

export async function GetAll(id, entity, token) {
    const url = `${ApiRoutes[entity].All}/${id}`;
    return await MakeRequest(url, ApiMethods.Get, null, token);
}

export async function GetOne(id, entity, token) {
    const url = `${ApiRoutes[entity].GetOne}/${id}`;
    return await MakeRequest(url, ApiMethods.Get, null, token)
}

export async function Delete(id, entity, token) {
    const url = ApiRoutes[entity].Delete + `/${id}`;
    return await MakeRequest(url, ApiMethods.Delete, null, token);
}

export async function Edit(id, entity, object, token) {
    const url = ApiRoutes[entity].Edit + `/${id}`;
    return await MakeRequest(url, ApiMethods.Put, object, token);
}

export async function Create(id, entity, object, token) {
    const url = `${ApiRoutes[entity].Create}/${id}`;
    return await MakeRequest(url, ApiMethods.Post, object, token);
}

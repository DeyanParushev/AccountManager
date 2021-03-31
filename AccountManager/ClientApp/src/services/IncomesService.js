import { ApplicationPaths } from '../components/api-authorization/ApiAuthorizationConstants';

export function GetAll(accountId) {
    const url = ApplicationPaths.Incomes + `/${accountId}`;
    return fetch(url, {
        headers: {
            'Accept': 'application/json',
        }
    })    
    .then(response => {
        if(response.status === 400){
            return 400;
        } else {
            return response.json();
        }
    })
    .then(data => data);
}

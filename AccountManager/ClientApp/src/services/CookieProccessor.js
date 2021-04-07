const GetUser = (cookie) => {
    const user = {};

    const cookies = cookie.split(';');
    cookies.map(x => x.trim());

    const extractedCookie = cookies.find(x => x.startsWith('AccountManagerCookie'));
    let cookieValue = extractedCookie.split('=')[1].split('%2F');
    
    user.username = cookieValue[0];
    user.id = cookieValue[1];
    user.email = cookieValue[2];
    return user;
}

export default GetUser;
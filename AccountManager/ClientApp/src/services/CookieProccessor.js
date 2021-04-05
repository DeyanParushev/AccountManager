const GetUser = (cookie) => {
    const user = {};

    const cookies = cookie.split(';');
    cookies.map(x => x.trim());

    const cookieIndex = cookies.indexOf(x => x.startsWith('AccountManagerCookie'));
   
    let cookieValue = cookies[cookieIndex].split('=')[1].split('%2F');
    
    user.username = cookieValue[0];
    user.id = cookieValue[1];
    return user;
}

export default GetUser;
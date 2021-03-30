export const ApplicationName = 'AccountManager';

export const ApiPrefix = '/api';
export const BaseRoute = `https://localhost:44382`;
export const AuthPrefix = '/Identity';

export const ApplicationPaths = {
    DefaultRedirectRoute: '/',
    Register: `${AuthPrefix}/Register`,
    Login: `${AuthPrefix}/Login`,
    Logout: `${AuthPrefix}/Logout`,
    Incomes: `${BaseRoute}/Incomes`,
    Expenses: `${BaseRoute}/Expenses`,
    Balance: `${BaseRoute}/Balance`,
}
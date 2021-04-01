export const ApplicationName = 'AccountManager';

export const ApiPrefix = '/api';
export const BaseRoute = `https://localhost:44382`;
export const AuthPrefix = '/Identity';

const Income = {
    All: `${BaseRoute}${ApiPrefix}/Incomes/All`,
    Create: `${BaseRoute}${ApiPrefix}/Incomes/Create`,
    Delete: `${BaseRoute}${ApiPrefix}/Incomes/Delete`,
    Edit: `${BaseRoute}${ApiPrefix}/Incomes/Edit`,
    GetOne: `${BaseRoute}${ApiPrefix}/Incomes/Income`,
}

const Expense = {
    All: `${BaseRoute}${ApiPrefix}/Expenses/All`,
    Create: `${BaseRoute}${ApiPrefix}/Expenses/Create`,
    Delete: `${BaseRoute}${ApiPrefix}/Expenses/Delete`,
    Edit: `${BaseRoute}${ApiPrefix}/Expenses/Edit`,
    GetOne: `${BaseRoute}${ApiPrefix}/Expenses/Expense`,
}

export const ApplicationPaths = {
    DefaultRedirectRoute: '/',
    Register: `${AuthPrefix}/Register`,
    Login: `${AuthPrefix}/Login`,
    Logout: `${AuthPrefix}/Logout`,
    Incomes: Income,
    Expenses: Expense,
    Balance: `${BaseRoute}/Balance`,
}

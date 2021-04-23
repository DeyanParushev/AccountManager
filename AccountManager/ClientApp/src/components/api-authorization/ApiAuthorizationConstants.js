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

const Account = {
    All: `${BaseRoute}${ApiPrefix}/Accounts/All`,
    Create: `${BaseRoute}${ApiPrefix}/Accounts/Create`,
    Delete: `${BaseRoute}${ApiPrefix}/Accounts/Delete`,
    Edit: `${BaseRoute}${ApiPrefix}/Accounts/Edit`,
    GetOne: `${BaseRoute}${ApiPrefix}/Accounts/Account`,
}

const Tag = {
    All: `${BaseRoute}${ApiPrefix}/Tags/All`,
    Create: `${BaseRoute}${ApiPrefix}/Tags/Create`,
    Delete: `${BaseRoute}${ApiPrefix}/Tags/Delete`,
    Edit: `${BaseRoute}${ApiPrefix}/Tags/Edit`,
    GetOne: `${BaseRoute}${ApiPrefix}/Tags/Tag`,
}

const Category = {
    All: `${BaseRoute}${ApiPrefix}/Categories/All`,
    Create: `${BaseRoute}${ApiPrefix}/Categories/Create`,
    Delete: `${BaseRoute}${ApiPrefix}/Categories/Delete`,
    Edit: `${BaseRoute}${ApiPrefix}/Categories/Edit`,
    GetOne: `${BaseRoute}${ApiPrefix}/Categories/Categorie`,
}

export const ApiRoutes = {
    DefaultRedirectRoute: '/',
    Register: `${AuthPrefix}/Register`,
    Login: `${AuthPrefix}/Login`,
    Logout: `${AuthPrefix}/Logout`,
    Incomes: Income,
    Expenses: Expense,
    Accounts: Account,
    Tags: Tag,
    Categories: Category,
}

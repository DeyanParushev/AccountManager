import { BaseRoute } from './ApiAuthorizationConstants';

const AuthPrefix = '/Identity';

const Income = {
    All: `/Incomes/All`,
    Create: `/Incomes/Create/:accountId`,
    Delete: `/Incomes/Delete/:id`,
    Edit: `/Incomes/Edit/:id`,
    Details: `/Incomes/Details/:id`,
}

const Expense = {
    All: `/Expenses/All`,
    Create: `/Expenses/Create/:accountId`,
    Delete: `/Expenses/Delete/:id`,
    Edit: `/Expenses/Edit/:id`,
    Details: `/Expenses/Details/:id`,
}

const Account = {
    All: `/Accounts/All`,
    Create: (id) => id ? `/Accounts/Create/${id}` : '/Accounts/Create/:id',
    Delete: (id) => id ? `/Accounts/Delete/${id}` : '/Accounts/Delete/:id',
    Edit: (id) => id ? `/Accounts/Edit/${id}` : `/Accounts/Edit/:id`,
    Details: (id) => id ? `/Accounts/Details/${id}` : '/Accounts/Details/:id',
}

const Tag = {
    All: `/Tags/All`,
    Create: `/Tags/Create/`,
    Delete: `/Tags/Delete/:id`,
    Edit: `/Tags/Edit/:id`,
    Details: `/Tags/Details/:id`,
}

const Category = {
    All: `/Categories/All`,
    Create: `/Categories/Create/`,
    Delete: `/Categories/Delete/:id`,
    Edit: `/Categories/Edit/:id`,
    Details: `/Categories/Details/:id`,
}

const ApplicationRoutes = {
    Home: '/',
    Register: `${AuthPrefix}/Register`,
    Login: `${AuthPrefix}/Login`,
    Logout: `${AuthPrefix}/Logout`,
    Incomes: Income,
    Expenses: Expense,
    Accounts: Account,
    Tags: Tag,
    Categories: Category,
}

export default ApplicationRoutes;

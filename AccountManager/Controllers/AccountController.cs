namespace AccountManager.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
   
    using AccountManager.Services.Interfaces;
    using AccountManager.ViewModels.InputModels;
    using AccountManager.Models;

    [Route("Accounts")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountsService accountsService;
        private readonly JwtSettings azure;

        public AccountController(IAccountsService accountsService, JwtSettings azure)
        {
            this.accountsService = accountsService;
            this.azure = azure;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(AccountInputModel acount)
        {
            var azure = this.azure.Secret;
            if (!ModelState.IsValid)
            {
                var error = new { Message = ModelState.Values };
                return BadRequest(error);
            }

            var acountModel = new Account
            {
                Name = acount.Name,
            };

            await accountsService.Create(acountModel, User.Identity.Name);

            return Ok();
        }
    }
}

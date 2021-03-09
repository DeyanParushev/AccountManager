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
        private readonly AzureSettings azure;
        private readonly JwtSettings jwt;

        public AccountController(IAccountsService accountsService, AzureSettings azure, JwtSettings jwt)
        {
            this.accountsService = accountsService;
            this.azure = azure;
            this.jwt = jwt;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(AccountInputModel acount)
        {
            var jwt = this.jwt;
            var azure = this.azure;
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

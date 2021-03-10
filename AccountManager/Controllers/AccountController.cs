namespace AccountManager.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Identity;

    using AccountManager.Services.Interfaces;
    using AccountManager.ViewModels.InputModels;
    using AccountManager.Models;
    using Microsoft.AspNetCore.Authorization;

    [Route("Accounts")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountsService accountsService;
        private readonly UserManager<ApplicationUser> userManager;

        public AccountController(
            IAccountsService accountsService,
            UserManager<ApplicationUser> userManager)
        {
            this.accountsService = accountsService;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AccountInputModel acount)
        {
            if (!ModelState.IsValid)
            {
                var error = new { Message = ModelState.Values };
                return BadRequest(error);
            }

            var acountModel = new Account
            {
                Name = acount.Name,
                UserId = User.Identity.AuthenticationType,
            };

            try
            {
                await accountsService.Create(acountModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

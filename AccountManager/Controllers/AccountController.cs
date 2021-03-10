namespace AccountManager.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using AccountManager.Services.Interfaces;
    using AccountManager.ViewModels.InputModels;
    using AccountManager.Models;

    [Route("Accounts")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountsService accountsService;
        private readonly IJwtService jwtService;

        public AccountController(
            IAccountsService accountsService,
            IJwtService jwtService)
        {
            this.accountsService = accountsService;
            this.jwtService = jwtService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AccountInputModel acount)
        {
            var userClaims = jwtService.GetUserClaims(Request.Cookies["JwtToken"]);

            if (!ModelState.IsValid)
            {
                var error = new { Message = ModelState.Values };
                return BadRequest(error);
            }

            var acountModel = new Account
            {
                Name = acount.Name,
                UserId = userClaims["UserId"],
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

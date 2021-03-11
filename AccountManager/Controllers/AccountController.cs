namespace AccountManager.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using AccountManager.Services.Interfaces;
    using AccountManager.ViewModels.InputModels;
    using AccountManager.Models;
    using AccountManager.Filters;

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
        [TokenAuthenticationFilter]
        public async Task<IActionResult> Create([FromBody] AccountInputModel acount)
        {
            var userClaims = jwtService.VerifyToken(Request.Cookies["Token"]);

            if (!ModelState.IsValid)
            {
                var error = new { Message = ModelState.Values };
                return BadRequest(error);
            }

            var acountModel = new Account
            {
                Name = acount.Name,
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

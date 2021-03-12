namespace AccountManager.Controllers
{
    using System;
    using System.Threading.Tasks;
    
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using AutoMapper;
    using AccountManager.DTOs;
    using AccountManager.Models;
    using AccountManager.Services.Interfaces;
    using AccountManager.ViewModels.InputModels;
    using AccountManager.ViewModels.ViewModels;

    [ApiController]
    [Route("Accounts")]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountsService accountsService;
        private readonly IJwtService jwtService;
        private readonly IMapper mapper;

        public AccountsController(
            IAccountsService accountsService,
            IJwtService jwtService,
            IMapper mapper)
        {
            this.accountsService = accountsService;
            this.jwtService = jwtService;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route(nameof(Get))]
        [Authorize]
        public async Task<IActionResult> Get(string accountId)
        {
            var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);

            try
            {
                var accountDto = await accountsService.GetAccount<AccountDTO>(accountId, userClaims["UserId"]);
                var accountViewModel = mapper.Map<AccountViewModel>(accountDto);

                return Ok(accountViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost]
        [Route(nameof(Create))]
        [Authorize]
        public async Task<IActionResult> Create(AccountInputModel acount)
        {
            if (!ModelState.IsValid)
            {
                var error = new { Message = ModelState.Values };
                return BadRequest(error);
            }

            var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
            
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

        [HttpGet]
        [Route(nameof(GetAccounts))]
        [Authorize]
        public async Task<IActionResult> GetAccounts()
        {
            var userCalims = jwtService.GetUserClaims(Request.Headers["Authorization"]);

            try
            {
                var accountsDTO = await accountsService.GetAll<AccountDTO>(userCalims["UserId"]);
                return Ok(accountsDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route(nameof(Edit))]
        [Authorize]
        public async Task<IActionResult> Edit(AccountInputModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);

            try
            {
                var account = new Account { Id = model.Id, Name = model.Name };
                var returnAccount = await accountsService.Edit<AccountDTO>(account, userClaims["UserId"]);
                var accountView = mapper.Map<AccountViewModel>(returnAccount);

                return Ok(accountView);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route(nameof(Delete))]
        [Authorize]
        public async Task<IActionResult> Delete(string accountId)
        {
            var user = jwtService.GetUserClaims(Request.Headers["Authorization"]);

            try
            {
                await accountsService.Delete(accountId, user["UserId"]);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

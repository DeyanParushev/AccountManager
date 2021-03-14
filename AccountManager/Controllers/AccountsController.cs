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
    using System.Collections.Generic;

    [ApiController]
    [Route("Accounts")]
    [Authorize]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService accountsService;
        private readonly IJwtService jwtService;
        private readonly IMapper mapper;

        public AccountsController(
            IAccountService accountsService,
            IJwtService jwtService,
            IMapper mapper)
        {
            this.accountsService = accountsService;
            this.jwtService = jwtService;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string accountId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var accountDto = await accountsService.GetOne<AccountDTO>(accountId, userClaims["UserId"]);
                var accountViewModel = mapper.Map<AccountViewModel>(accountDto);

                return Ok(accountViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(AccountInputModel acount)
        {
            if (!ModelState.IsValid)
            {
                var error = new { Message = ModelState.Values };
                return BadRequest(error);
            }

            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);

                var acountModel = new Account
                {
                    Name = acount.Name,
                    UserId = userClaims["UserId"],
                };
                await accountsService.Create(acountModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route(nameof(All))]
        public async Task<IActionResult> All()
        {
            var userCalims = jwtService.GetUserClaims(Request.Headers["Authorization"]);

            try
            {
                var accountsDTO = await accountsService.GetAll<AccountDTO>(userCalims["UserId"]);
                var accountViewModels = mapper.Map<ICollection<AccountViewModel>>(accountsDTO);
                return Ok(accountsDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(AccountInputModel model)
        {
            if (!ModelState.IsValid)
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

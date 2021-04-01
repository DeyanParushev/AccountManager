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
    [Route("api/[controller]")]
    [Authorize]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService accountsService;
        private readonly IJwtService jwtService;
        private readonly IMapper mapper;
        private const string actionRouteEnd = "/{accountId}";
        private const string authRequestHeader = "Authorization";

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
        [Route(nameof(All) + actionRouteEnd)]
        public async Task<IActionResult> All()
        {
            var userCalims = jwtService.GetUserClaims(Request.Headers[authRequestHeader]);

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

        [HttpGet]
        [Route(nameof(Account) + actionRouteEnd)]
        public async Task<IActionResult> Account(string accountId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers[authRequestHeader]);
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
        [Route(nameof(Create) + actionRouteEnd)]
        public async Task<IActionResult> Create(AccountInputModel acount)
        {
            if (!ModelState.IsValid)
            {
                var error = new { Message = ModelState.Values };
                return BadRequest(error);
            }

            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers[authRequestHeader]);

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
       
        [HttpPut]
        [Route(nameof(Edit) + actionRouteEnd)]
        public async Task<IActionResult> Edit(AccountInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userClaims = jwtService.GetUserClaims(Request.Headers[authRequestHeader]);

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
        [Route(nameof(Delete) + actionRouteEnd)]
        public async Task<IActionResult> Delete(string accountId)
        {
            var user = jwtService.GetUserClaims(Request.Headers[authRequestHeader]);

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

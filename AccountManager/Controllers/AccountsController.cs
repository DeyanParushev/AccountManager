namespace AccountManager.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using AutoMapper;
    using AccountManager.DTOs;
    using AccountManager.Models;
    using AccountManager.Services.Interfaces;
    using AccountManager.ViewModels.InputModels;
    using AccountManager.ViewModels.ViewModels;

    public class AccountsController : BaseController
    {
        private readonly IAccountService accountsService;
        private readonly IJwtService jwtService;
        private readonly IMapper mapper;
        private const string routeParameter = "/{accountId}";

        public AccountsController(IAccountService accountsService, IJwtService jwtService, IMapper mapper)
            : base(jwtService)
        {
            this.accountsService = accountsService;
            this.jwtService = jwtService;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route(nameof(All) + routeParameter)]
        public async Task<IActionResult> All()
        {
            try
            {
                var userId = base.GetUserIdFromAuthorizeHeader();
                var accountsDTO = await accountsService.GetAll<AccountDTO>(userId);
                var accountViewModels = mapper.Map<ICollection<AccountViewModel>>(accountsDTO);
                return Ok(accountViewModels);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route(nameof(Account) + routeParameter)]
        public async Task<IActionResult> Account(string accountId)
        {
            try
            {
                var userId = base.GetUserIdFromAuthorizeHeader();
                var accountDto = await accountsService.GetOne<AccountDTO>(accountId, userId);
                var accountViewModel = mapper.Map<AccountViewModel>(accountDto);

                return Ok(accountViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route(nameof(Create) + routeParameter)]
        public async Task<IActionResult> Create(AccountInputModel acount)
        {
            if (!ModelState.IsValid)
            {
                var error = new { Message = ModelState.Values };
                return BadRequest(error);
            }

            try
            {
                var userId = base.GetUserIdFromAuthorizeHeader();

                var acountModel = new Account
                {
                    Name = acount.Name,
                    UserId = userId,
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
        [Route(nameof(Edit) + routeParameter)]
        public async Task<IActionResult> Edit(AccountInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var userId = base.GetUserIdFromAuthorizeHeader();
                var account = new Account { Id = model.Id, Name = model.Name };
                var returnAccount = await accountsService.Edit<AccountDTO>(account, userId);
                var accountView = mapper.Map<AccountViewModel>(returnAccount);

                return Ok(accountView);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route(nameof(Delete) + routeParameter)]
        public async Task<IActionResult> Delete(string accountId)
        {
            try
            {
                var userId = base.GetUserIdFromAuthorizeHeader();
                await accountsService.Delete(accountId, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

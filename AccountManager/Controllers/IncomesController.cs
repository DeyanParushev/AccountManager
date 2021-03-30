namespace AccountManager.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    
    using AccountManager.DTOs;
    using AccountManager.Services.Interfaces;
    using AccountManager.ViewModels.ViewModels;
    using AccountManager.Models;

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class IncomesController : ControllerBase
    {
        private readonly IIncomeService incomeService;
        private readonly IMapper mapper;
        private readonly IJwtService jwtService;

        public IncomesController(IIncomeService incomeService, IMapper mapper, IJwtService jwtService)
        {
            this.incomeService = incomeService;
            this.mapper = mapper;
            this.jwtService = jwtService;
        }

        [HttpGet]
        [Route(nameof(All))]
        public async Task<IActionResult> All(string accountId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var incomes = await incomeService.GetAll<IncomeDTO>(accountId, userClaims["UserId"]);
                var putputIncomes = mapper.Map<ICollection<IncomeViewModel>>(incomes);

                return Ok(putputIncomes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(string incomeId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var income = await incomeService.GetOne<IncomeDTO>(incomeId, userClaims["UserId"]);
                var incomeExpenses = mapper.Map<IncomeViewModel>(income);

                return Ok(incomeExpenses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(IncomeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var income = mapper.Map<Income>(model);
                await incomeService.Create(income);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(IncomeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var incomeDbModel = mapper.Map<Income>(model);
                var editedIncome = await incomeService.Edit<IncomeDTO>(incomeDbModel, userClaims["UserId"]);

                return Ok(editedIncome);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string incomeId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                await incomeService.Delete(incomeId, userClaims["UserId"]);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

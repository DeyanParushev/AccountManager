namespace AccountManager.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;

    using AccountManager.DTOs;
    using AccountManager.Models;
    using AccountManager.Services.Interfaces;
    using AccountManager.ViewModels.ViewModels;
    using AccountManager.ViewModels.InputModels;

    public class IncomesController : BaseController
    {
        private readonly IIncomeService incomeService;
        private readonly IMapper mapper;
        private readonly IJwtService jwtService;
        private const string incomeParameter = "/{incomeId}";

        public IncomesController(IIncomeService incomeService, IMapper mapper, IJwtService jwtService)
            : base(jwtService)
        {
            this.incomeService = incomeService;
            this.mapper = mapper;
            this.jwtService = jwtService;
        }

        [HttpGet]
        [Route(nameof(All) + "/{accountId}")]
        public async Task<IActionResult> All(string accountId)
        {
            try
            {
                var userId = GetUserIdFromAuthorizeHeader();
                var incomes = await incomeService.GetAll<IncomeDTO>(accountId, userId);
                var putputIncomes = mapper.Map<ICollection<IncomeViewModel>>(incomes);

                return Ok(putputIncomes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route(nameof(Income) + incomeParameter)]
        public async Task<IActionResult> Income(string incomeId)
        {
            try
            {
                var userId = base.GetUserIdFromAuthorizeHeader();
                var income = await incomeService.GetOne<IncomeDTO>(incomeId, userId);
                var incomeViewModel = mapper.Map<IncomeViewModel>(income);

                return Ok(incomeViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<IActionResult> Create(IncomeInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
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
        [Route(nameof(Edit) + incomeParameter)]
        public async Task<IActionResult> Edit(IncomeInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var userId = base.GetUserIdFromAuthorizeHeader();
                var incomeDbModel = mapper.Map<Income>(model);
                var editedIncome = await incomeService.Edit<IncomeDTO>(incomeDbModel, userId);

                return Ok(editedIncome);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route(nameof(Delete) + incomeParameter)]
        public async Task<IActionResult> Delete(string incomeId)
        {
            try
            {
                var userId = base.GetUserIdFromAuthorizeHeader();
                await incomeService.Delete(incomeId, userId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

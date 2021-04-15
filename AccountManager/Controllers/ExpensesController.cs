namespace AccountManager.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    using AutoMapper;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using AccountManager.DTOs;
    using AccountManager.Services.Interfaces;
    using AccountManager.ViewModels;
    using AccountManager.ViewModels.InputModels;
    using AccountManager.Models;

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseService expensesService;
        private readonly IMapper mapper;
        private readonly IJwtService jwtService;
        private const string actionRouteEnd = "/{expenseId}";
        private const string authRequestHeader = "Authorization";

        public ExpensesController(IExpenseService expensesService, IMapper mapper, IJwtService jwtService)
        {
            this.expensesService = expensesService;
            this.mapper = mapper;
            this.jwtService = jwtService;
        }

        [HttpGet]
        [Route(nameof(All) + "/{accountId}")]
        public async Task<IActionResult> All(string accountId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers[authRequestHeader]);
                var expenses = await expensesService.GetAll<ExpenseDTO>(accountId, userClaims["UserId"]);
                var outputExpenses = mapper.Map<ICollection<ExpenseViewModel>>(expenses);

                return Ok(outputExpenses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route(nameof(Expense) + actionRouteEnd)]
        public async Task<IActionResult> Expense(string expenseId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers[authRequestHeader]);
                var expense = await expensesService.GetOne<ExpenseDTO>(expenseId, userClaims["UserId"]);
                var outputExpense = mapper.Map<ExpenseViewModel>(expense);

                return Ok(outputExpense);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<IActionResult> Create(ExpenseInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers[authRequestHeader]);
                var expenseDbModel = mapper.Map<Expense>(model);
                var stream = new MemoryStream();
                //await model.Image.CopyToAsync(stream);
                await expensesService.Create(expenseDbModel, null);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route(nameof(Edit) + actionRouteEnd)]
        public async Task<IActionResult> Edit(ExpenseInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers[authRequestHeader]);
                var expenseDbModel = mapper.Map<Expense>(model);
                var editedExpense = await expensesService.Edit<ExpenseDTO>(expenseDbModel, userClaims["UserId"]);

                return Ok(editedExpense);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route(nameof(Delete) + actionRouteEnd)]
        public async Task<IActionResult> Delete(string expenseId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers[authRequestHeader]);
                await expensesService.Delete(expenseId, userClaims["UserId"]);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

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
    using AccountManager.ViewModels;
    using AccountManager.ViewModels.InputModels;
    using AccountManager.Models;
    using System.IO;

    [ApiController]
    [Route("Expenses")]
    //[Authorize]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService expensesService;
        private readonly IMapper mapper;
        private readonly IJwtService jwtService;

        public ExpenseController(IExpenseService expensesService, IMapper mapper, IJwtService jwtService)
        {
            this.expensesService = expensesService;
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
        public async Task<IActionResult> Get(string expenseId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
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
        public async Task<IActionResult> Create(ExpenseInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var expenseDbModel = mapper.Map<Expense>(model);
                var stream = new MemoryStream();
                await model.Image.CopyToAsync(stream);
                await expensesService.Create(expenseDbModel, stream.ToArray());

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(ExpenseInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
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
        public async Task<IActionResult> Delete(string expenseId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
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

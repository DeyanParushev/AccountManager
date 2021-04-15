namespace AccountManager.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using AccountManager.DTOs;
    using AccountManager.Models;
    using AccountManager.Services.Interfaces;
    using AccountManager.ViewModels;
    using AccountManager.ViewModels.InputModels;

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService categoryService;
        private readonly IMapper mapper;
        private readonly IJwtService jwtService;
        private const string routeParameter = "/{userId}";

        public CategoriesController(ICategoryService categoryService, IMapper mapper, IJwtService jwtService)
        {
            this.categoryService = categoryService;
            this.mapper = mapper;
            this.jwtService = jwtService;
        }

        [HttpGet]
        [Route(nameof(All))]
        public async Task<IActionResult> All()
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var category = await categoryService.GetAll<CategoryDTO>(userClaims["UserId"]);
                var outputCategories = mapper.Map<ICollection<CategoryViewModel>>(category);

                return Ok(outputCategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(int categoryId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var category = await categoryService.GetOne<CategoryDTO>(categoryId);
                var outputCategory = mapper.Map<CategoryViewModel>(category);

                return Ok(outputCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route(nameof(Create) + routeParameter)]
        public async Task<IActionResult> Create(CategoryInputModel model, string userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var categoryDbModel = mapper.Map<Category>(model);
                await categoryService.Create(categoryDbModel, userId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(CategoryInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var categoryDbModel = mapper.Map<Category>(model);
                var editedCategory = await categoryService.Edit<CategoryDTO>(categoryDbModel, userClaims["UserId"]);

                return Ok(editedCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int categoryId)
        {
            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                await categoryService.Delete(categoryId, userClaims["UserId"]);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

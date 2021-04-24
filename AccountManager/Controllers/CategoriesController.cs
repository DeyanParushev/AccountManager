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
    using AccountManager.ViewModels;
    using AccountManager.ViewModels.InputModels;

    public class CategoriesController : BaseController
    {
        private readonly ICategoryService categoryService;
        private readonly IMapper mapper;
        private readonly IJwtService jwtService;
        private const string routeParameter = "/{userId}";

        public CategoriesController(ICategoryService categoryService, IMapper mapper, IJwtService jwtService)
            : base(jwtService)
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
                var userId = base.GetUserIdFromAuthorizeHeader();
                var category = await categoryService.GetAll<CategoryDTO>(userId);
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
                var userId = base.GetUserIdFromAuthorizeHeader();
                var categoryDbModel = mapper.Map<Category>(model);
                var editedCategory = await categoryService.Edit<CategoryDTO>(categoryDbModel, userId);

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
                var userId = base.GetUserIdFromAuthorizeHeader();
                await categoryService.Delete(categoryId, userId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

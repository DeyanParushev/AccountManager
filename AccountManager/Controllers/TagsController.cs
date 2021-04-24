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

    public class TagsController : BaseController
    {
        private readonly ITagService tagService;
        private readonly IMapper mapper;
        private readonly IJwtService jwtService;
        private const string routeParameter = "/{userId}";

        public TagsController(ITagService tagService, IMapper mapper, IJwtService jwtService)
            : base(jwtService)
        {
            this.tagService = tagService;
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
                var tag = await tagService.GetAll<TagDTO>(userId);
                var outputTags = mapper.Map<ICollection<TagViewModel>>(tag);

                return Ok(outputTags);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(int tagId)
        {
            try
            {
                var tag = await tagService.GetOne<TagDTO>(tagId);
                var outputTag = mapper.Map<TagViewModel>(tag);

                return Ok(outputTag);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route(nameof(Create) + routeParameter)]
        public async Task<IActionResult> Create(TagInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var userId = base.GetUserIdFromAuthorizeHeader();
                var tagDbModel = mapper.Map<Tag>(model);
                await tagService.Create(tagDbModel, userId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(TagInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var userId = base.GetUserIdFromAuthorizeHeader();
                var tagDbModel = mapper.Map<Tag>(model);
                var editedTag = await tagService.Edit<TagDTO>(tagDbModel, userId);

                return Ok(editedTag);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int tagId)
        {
            try
            {
                var userId = base.GetUserIdFromAuthorizeHeader();
                await tagService.Delete(tagId, userId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

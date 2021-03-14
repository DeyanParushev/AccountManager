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
    [Route("Tags")]
    [Authorize]
    public class TagController : ControllerBase
    {
        private readonly ITagService tagService;
        private readonly IMapper mapper;
        private readonly IJwtService jwtService;

        public TagController(ITagService tagService, IMapper mapper, IJwtService jwtService)
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
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var tag = await tagService.GetAll<TagDTO>(userClaims["UserId"]);
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
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
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
        public async Task<IActionResult> Create(TagInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            try
            {
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var tagDbModel = mapper.Map<Tag>(model);
                await tagService.Create(tagDbModel, userClaims["UserId"]);

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
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                var tagDbModel = mapper.Map<Tag>(model);
                var editedTag = await tagService.Edit<TagDTO>(tagDbModel, userClaims["UserId"]);

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
                var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
                await tagService.Delete(tagId, userClaims["UserId"]);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

namespace AccountManager.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Identity;

    using AccountManager.Models;
    using AccountManager.Services.Interfaces;
    using AccountManager.ViewModels.InputModels;

    [ApiController]
    [Route("api/[controller]")]

    public class IdentityController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IJwtService jwtService;

        public IdentityController(UserManager<ApplicationUser> userManager, IJwtService jwtSettings)
        {
            this.userManager = userManager;
            this.jwtService = jwtSettings;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterUserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var user = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.UserName,
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<string>> Login(LoginUserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await userManager.FindByEmailAsync(model.Email);

            if(user == null)
            {
                return BadRequest("Invalid email.");
            }

            var passwordValid = await userManager.CheckPasswordAsync(user, model.Password);

            if(!passwordValid)
            {
                return BadRequest("Invalid password.");
            }

            var token = jwtService.GenerateJwtToken(user);

            return token;
        }

        [HttpPost]
        [Route(nameof(Logout))]
        [Authorize]
        public async Task<ActionResult> Logout()
        {
            Request.Headers.Clear();
            
            return Ok("Logged out");
        }
    }
}

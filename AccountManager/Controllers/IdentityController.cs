namespace AccountManager.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Identity;

    using AccountManager.Models;
    using AccountManager.ViewModels.InputModels;
    using AccountManager.Services.Interfaces;

    [ApiController]
    [Route("Identity")]

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
                return BadRequest();
            }

            var user = new ApplicationUser
            {
                Email = model.Email,
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest();
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
                return Unauthorized();
            }

            var passwordValid = await userManager.CheckPasswordAsync(user, model.Password);

            if(!passwordValid)
            {
                return Unauthorized();
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

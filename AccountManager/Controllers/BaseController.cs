namespace AccountManager.Controllers
{
    using AccountManager.Services.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BaseController : ControllerBase
    {
        private readonly IJwtService jwtService;

        public BaseController(IJwtService jwtService)
        {
            this.jwtService = jwtService;
        }

        protected string GetUserIdFromAuthorizeHeader()
        {
            var userClaims = jwtService.GetUserClaims(Request.Headers["Authorization"]);
            var userId = userClaims["UserId"];

            return userId;
        }
    }
}

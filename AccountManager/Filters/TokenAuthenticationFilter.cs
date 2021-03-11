namespace AccountManager.Filters
{
    using System;

    using Microsoft.AspNetCore.Mvc.Filters;

    using AccountManager.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    public class TokenAuthenticationFilter : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var tokenService = (IJwtService)context.HttpContext.RequestServices.GetService(typeof(IJwtService));
            var token = string.Empty;

            var result = true;

            if (!context.HttpContext.Request.Cookies.ContainsKey("Token"))
            {
                result = false;
            }

            if (result)
            {
                token = context.HttpContext.Request.Cookies["Token"];
                try
                {
                    var claimsPrincipal = tokenService.VerifyToken(token);
                }
                catch (Exception ex)
                {
                    result = false;
                    context.ModelState.AddModelError("Uauthorized", ex.Message);
                }
            }

            if (!result)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}

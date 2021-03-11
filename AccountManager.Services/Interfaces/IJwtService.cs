namespace AccountManager.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Security.Claims;

    using AccountManager.Models;

    public interface IJwtService
    {
        Dictionary<string, string> GetUserClaims(string token);

        public string GenerateJwtToken(ApplicationUser user);

        public ClaimsPrincipal VerifyToken(string token);
    }
}

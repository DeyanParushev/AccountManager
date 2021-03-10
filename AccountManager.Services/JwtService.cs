namespace AccountManager.Services
{
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;

    using AccountManager.Services.Interfaces;

    public class JwtService : IJwtService
    {
        public Dictionary<string, string> GetUserClaims(string token) 
        {
            var userClaims = new Dictionary<string, string>();

            var handler = new JwtSecurityTokenHandler();
            var tokenValues = handler.ReadJwtToken(token);
            
            var usernameClaim = tokenValues.Claims
                .Where(x => x.Type == "Username")
                .Select(x => new
                {
                    Type = x.Type,
                    Value = x.Value
                })
                .FirstOrDefault();

            var idClaim = tokenValues.Claims
                .Where(x => x.Type == "UserId")
                .Select(x => new
                {
                    Type = x.Type,
                    Value = x.Value
                })
                .FirstOrDefault();

            userClaims.Add(usernameClaim.Type, usernameClaim.Value);
            userClaims.Add(idClaim.Type, idClaim.Value);

            return userClaims;
        }
    }
}

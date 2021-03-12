namespace AccountManager.Services
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;

    using Microsoft.IdentityModel.Tokens;

    using AccountManager.Models;
    using AccountManager.Services.Interfaces;

    public class JwtService : IJwtService
    {
        private readonly JwtSettings jwtSettings;
        private readonly JwtSecurityTokenHandler tokenHandler;

        public JwtService(JwtSettings jwtSettings)
        {
            this.jwtSettings = jwtSettings;
            this.tokenHandler = new JwtSecurityTokenHandler();
        }

        public Dictionary<string, string> GetUserClaims(string token)
        {
            var cleanToken = token.Replace("Bearer", string.Empty).TrimStart().TrimEnd();

            var userClaims = new Dictionary<string, string>();
            var tokenValues = new JwtSecurityToken(cleanToken);

            var usernameClaim = tokenValues.Claims
                .Where(x => x.Type == "unique_name")
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

        public string GenerateJwtToken(ApplicationUser user)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim("UserId", user.Id),
                }),
                Expires = DateTime.UtcNow.AddMinutes(120),
                SigningCredentials = new SigningCredentials
                (
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
                    SecurityAlgorithms.HmacSha512Signature
                ),
                Issuer = jwtSettings.Issuer,
                Audience = jwtSettings.Issuer.ToLower(),
            };

            var token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        public ClaimsPrincipal VerifyToken(string token)
        {
            try
            {

                var claims = tokenHandler.ValidateToken(token,
                    new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
                        ValidateIssuer = true,
                        ValidIssuer = jwtSettings.Issuer,
                        ValidAudience = jwtSettings.Issuer.ToLower(),
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                    }, out SecurityToken validatedToken);
                return claims;
            }
            catch (Exception ex)
            {
                var exception = ex.Message;
                return null;
            }

        }
    }
}

using System.Collections.Generic;

namespace AccountManager.Services.Interfaces
{
    public interface IJwtService
    {
        Dictionary<string, string> GetUserClaims(string token);
    }
}

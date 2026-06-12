using Domain.Entities;
using System.Security.Claims;

namespace Application.Interfaces.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
        IEnumerable<Claim>? DecodeToken(string token);
    }
}

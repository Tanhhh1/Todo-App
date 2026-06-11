using Application.DTOs.Auth;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enum;
using Microsoft.EntityFrameworkCore;

namespace TApplication.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepo;
    private readonly IJwtService _jwtService;

    public AuthService(IUserRepository userRepo, IJwtService jwtService)
    {
        _userRepo = userRepo;
        _jwtService = jwtService;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        var emailExists = await _userRepo.GetByCondition(u => u.Email == request.Email).AnyAsync();
        if (emailExists)
            throw new InvalidOperationException("Email đã được sử dụng.");

        var usernameExists = await _userRepo.GetByCondition(u => u.Username == request.Username).AnyAsync();
        if (usernameExists)
            throw new InvalidOperationException("Username đã được sử dụng.");

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = UserRole.User
        };

        await _userRepo.AddAsync(user);
        await _userRepo.SaveChangesAsync();

        return new AuthResponse
        {
            Token = null,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role.ToString()
        };
    }
    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await _userRepo.GetByCondition(u => u.Username == request.Username).FirstOrDefaultAsync();

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            throw new UnauthorizedAccessException("Tên đăng nhập hoặc mật khẩu không đúng.");

        return new AuthResponse
        {
            Token = _jwtService.GenerateToken(user),
            Username = user.Username,
            Email = user.Email,
            Role = user.Role.ToString()
        };
    }
}
using Application.DTOs.Users;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Enum;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;

        public UserService(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<IEnumerable<UserResponse>> GetAllAsync()
        {
            return await _userRepo
                .GetByCondition(u => u.Role == UserRole.User)
                .Select(u => new UserResponse
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    Role = u.Role.ToString()
                })
                .ToListAsync();
        }

        public async Task<UserResponse?> GetByIdAsync(int id)
        {
            return await _userRepo
                .GetByCondition(u => u.Id == id)
                .Select(u => new UserResponse
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    Role = u.Role.ToString()
                })
                .FirstOrDefaultAsync();
        }
    }
}
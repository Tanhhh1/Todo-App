using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> context) : base(context) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<TodoTask> Tasks => Set<TodoTask>();
        public DbSet<TaskAssignment> TaskAssignments => Set<TaskAssignment>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.HasIndex(u => u.Username).IsUnique();
                entity.Property(u => u.Role).HasConversion<string>();
            });

            modelBuilder.Entity<TodoTask>(entity =>
            {
                entity.HasKey(t => t.Id);
                entity.Property(t => t.Status).HasConversion<string>();
            });

            modelBuilder.Entity<TaskAssignment>(entity =>
            {
                entity.HasKey(ta => new { ta.UserId, ta.TaskId });

                entity.HasOne(ta => ta.User)
                      .WithMany(u => u.TaskAssignments)
                      .HasForeignKey(ta => ta.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(ta => ta.Task)
                      .WithMany(t => t.TaskAssignments)
                      .HasForeignKey(ta => ta.TaskId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}



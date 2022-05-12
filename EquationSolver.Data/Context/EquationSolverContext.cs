using EquationSolver.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EquationSolver.Data.Context
{
    public class EquationSolverContext : DbContext
    {
        public EquationSolverContext(DbContextOptions<EquationSolverContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=DESKTOP-999TVV1\SQLEXPRESSBLOODY;Database=EquationSolverDb;Trusted_Connection=True;MultipleActiveResultSets=true");
        }

        public DbSet<EquationData> EquationData { get; set; }
    }
}

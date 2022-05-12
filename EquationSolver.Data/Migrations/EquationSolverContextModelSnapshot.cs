﻿// <auto-generated />
using System;
using EquationSolver.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EquationSolver.Data.Migrations
{
    [DbContext(typeof(EquationSolverContext))]
    partial class EquationSolverContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.6")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EquationSolver.Data.Models.EquationData", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("CoefficientA")
                        .HasColumnType("float");

                    b.Property<double>("CoefficientB")
                        .HasColumnType("float");

                    b.Property<double>("CoefficientC")
                        .HasColumnType("float");

                    b.Property<double>("Discriminant")
                        .HasColumnType("float");

                    b.Property<double?>("FirstRoot")
                        .HasColumnType("float");

                    b.Property<bool>("IsValidEquation")
                        .HasColumnType("bit");

                    b.Property<double?>("SecondRoot")
                        .HasColumnType("float");

                    b.Property<DateTime>("SolvedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("EquationData");
                });
#pragma warning restore 612, 618
        }
    }
}

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TestReact.Models;

public partial class ClinicContext : DbContext
{
    public ClinicContext()
    {
    }

    public ClinicContext(DbContextOptions<ClinicContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Child> Children { get; set; }

    public virtual DbSet<Mkb10> Mkb10s { get; set; }

    public virtual DbSet<Mkbo> Mkbos { get; set; }

    public virtual DbSet<Plan> Plans { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=Clinic;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Child>(entity =>
        {
            entity.ToTable("Child");

            entity.Property(e => e.ChildId)
                .ValueGeneratedNever()
                .HasColumnName("child_id");
            entity.Property(e => e.Adress)
                .HasMaxLength(255)
                .HasColumnName("adress");
            entity.Property(e => e.Benefits)
                .HasMaxLength(255)
                .HasColumnName("benefits");
            entity.Property(e => e.BirthDate)
                .HasColumnType("datetime")
                .HasColumnName("birth_date");
            entity.Property(e => e.Diagnosis)
                .HasMaxLength(255)
                .HasColumnName("diagnosis");
            entity.Property(e => e.Fathername)
                .HasMaxLength(255)
                .HasColumnName("fathername");
            entity.Property(e => e.HealthGroup).HasColumnName("health_group");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Other)
                .HasMaxLength(255)
                .HasColumnName("other");
            entity.Property(e => e.PolisOms)
                .HasMaxLength(255)
                .HasColumnName("polis_oms");
            entity.Property(e => e.Sex)
                .HasMaxLength(255)
                .HasColumnName("sex");
            entity.Property(e => e.Surname)
                .HasMaxLength(255)
                .HasColumnName("surname");
        });

        modelBuilder.Entity<Mkb10>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__mkb10__3213E83F85BC0336");

            entity.ToTable("mkb10");

            entity.HasIndex(e => e.Code, "mkb10_code");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("code");
            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.Name)
                .HasColumnType("text")
                .HasColumnName("name");
            entity.Property(e => e.RecCode)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("rec_code");
        });

        modelBuilder.Entity<Mkbo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__mkbo__3213E83F5735FFE9");

            entity.ToTable("mkbo");

            entity.HasIndex(e => e.Code, "mkbo_code");

            entity.HasIndex(e => e.ParentId, "mkbo_parent_id");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("code");
            entity.Property(e => e.Ict)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("ict");
            entity.Property(e => e.Level)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("level");
            entity.Property(e => e.Name)
                .HasColumnType("text")
                .HasColumnName("name");
            entity.Property(e => e.ParentId).HasColumnName("parent_id");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK__mkbo__parent_id__49C3F6B7");
        });

        modelBuilder.Entity<Plan>(entity =>
        {
            entity.ToTable("Plan");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.Title).HasColumnName("title");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TestReact.Models;

public partial class VaccinationsContext : DbContext
{
    public VaccinationsContext()
    {
    }

    public VaccinationsContext(DbContextOptions<VaccinationsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Child> Childs { get; set; }

    public virtual DbSet<Doctor> Doctors { get; set; }

    public virtual DbSet<HistoryOfHealth> HistoryOfHealths { get; set; }

    public virtual DbSet<Hospital> Hospitals { get; set; }

    public virtual DbSet<Parent> Parents { get; set; }

    public virtual DbSet<QueueForVaccination> QueueForVaccinations { get; set; }

    public virtual DbSet<RecordBook> RecordBooks { get; set; }

    public virtual DbSet<ReviewsOfVaccination> ReviewsOfVaccinations { get; set; }

    public virtual DbSet<Storage> Storages { get; set; }

    public virtual DbSet<Vaccination> Vaccinations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=Vaccinations;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Child>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BirthdayDate)
                .HasColumnType("date")
                .HasColumnName("birthday_date");
            entity.Property(e => e.Fathername).HasColumnName("fathername");
            entity.Property(e => e.IdParent).HasColumnName("id_parent");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Surname).HasColumnName("surname");

            entity.HasOne(d => d.IdParentNavigation).WithMany(p => p.Children)
                .HasForeignKey(d => d.IdParent)
                .HasConstraintName("FK_Childs_Parents");
        });

        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DateFiring)
                .HasColumnType("date")
                .HasColumnName("date_firing");
            entity.Property(e => e.DateHiring)
                .HasColumnType("date")
                .HasColumnName("date_hiring");
            entity.Property(e => e.Fathername)
                .HasMaxLength(15)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("fathername");
            entity.Property(e => e.IdHospital).HasColumnName("id_hospital");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Number).HasColumnName("number");
            entity.Property(e => e.Surname).HasColumnName("surname");

            entity.HasOne(d => d.IdHospitalNavigation).WithMany(p => p.Doctors)
                .HasForeignKey(d => d.IdHospital)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Doctors_hospitals");
        });

        modelBuilder.Entity<HistoryOfHealth>(entity =>
        {
            entity.ToTable("HistoryOfHealth");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ChildId).HasColumnName("child_id");
            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.Diagnozis).HasColumnName("diagnozis");

            entity.HasOne(d => d.Child).WithMany(p => p.HistoryOfHealths)
                .HasForeignKey(d => d.ChildId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HistoryOfHealth_Childs");
        });

        modelBuilder.Entity<Hospital>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_hospitals");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address).HasColumnName("address");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .IsFixedLength()
                .HasColumnName("phone_number");
            entity.Property(e => e.Title).HasColumnName("title");
        });

        modelBuilder.Entity<Parent>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Fathername).HasColumnName("fathername");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .HasColumnName("phone_number");
            entity.Property(e => e.Surname).HasColumnName("surname");
        });

        modelBuilder.Entity<QueueForVaccination>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.IdChild).HasColumnName("id_child");
            entity.Property(e => e.IdDoctor).HasColumnName("id_doctor");
            entity.Property(e => e.IdHospital).HasColumnName("id_hospital");
            entity.Property(e => e.IdVaccination).HasColumnName("id_vaccination");
            entity.Property(e => e.Time).HasColumnName("time");

            entity.HasOne(d => d.IdChildNavigation).WithMany(p => p.QueueForVaccinations)
                .HasForeignKey(d => d.IdChild)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QueueForVaccinations_Childs");

            entity.HasOne(d => d.IdDoctorNavigation).WithMany(p => p.QueueForVaccinations)
                .HasForeignKey(d => d.IdDoctor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QueueForVaccinations_Doctors");

            entity.HasOne(d => d.IdHospitalNavigation).WithMany(p => p.QueueForVaccinations)
                .HasForeignKey(d => d.IdHospital)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QueueForVaccinations_hospitals");

            entity.HasOne(d => d.IdVaccinationNavigation).WithMany(p => p.QueueForVaccinations)
                .HasForeignKey(d => d.IdVaccination)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QueueForVaccinations_Vaccinations");
        });

        modelBuilder.Entity<RecordBook>(entity =>
        {
            entity.ToTable("RecordBook");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.IdChild).HasColumnName("id_child");
            entity.Property(e => e.IdDoctor).HasColumnName("id_doctor");
            entity.Property(e => e.IdVaccination).HasColumnName("id_vaccination");
            entity.Property(e => e.Time).HasColumnName("time");

            entity.HasOne(d => d.IdChildNavigation).WithMany(p => p.RecordBooks)
                .HasForeignKey(d => d.IdChild)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecordBook_Childs");

            entity.HasOne(d => d.IdDoctorNavigation).WithMany(p => p.RecordBooks)
                .HasForeignKey(d => d.IdDoctor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecordBook_Doctors");

            entity.HasOne(d => d.IdVaccinationNavigation).WithMany(p => p.RecordBooks)
                .HasForeignKey(d => d.IdVaccination)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecordBook_Vaccinations");
        });

        modelBuilder.Entity<ReviewsOfVaccination>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdParent).HasColumnName("id_parent");
            entity.Property(e => e.IdVaccination).HasColumnName("id_vaccination");
            entity.Property(e => e.Review).HasColumnName("review");

            entity.HasOne(d => d.IdParentNavigation).WithMany(p => p.ReviewsOfVaccinations)
                .HasForeignKey(d => d.IdParent)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReviewsOfVaccinations_Parents");

            entity.HasOne(d => d.IdVaccinationNavigation).WithMany(p => p.ReviewsOfVaccinations)
                .HasForeignKey(d => d.IdVaccination)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReviewsOfVaccinations_Vaccinations");
        });

        modelBuilder.Entity<Storage>(entity =>
        {
            entity.ToTable("Storage");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdHospital).HasColumnName("id_hospital");
            entity.Property(e => e.IdVaccination).HasColumnName("id_vaccination");

            entity.HasOne(d => d.IdHospitalNavigation).WithMany(p => p.Storages)
                .HasForeignKey(d => d.IdHospital)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Storage_hospitals");

            entity.HasOne(d => d.IdVaccinationNavigation).WithMany(p => p.Storages)
                .HasForeignKey(d => d.IdVaccination)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Storage_Vaccinations");
        });

        modelBuilder.Entity<Vaccination>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AgeRecomend).HasColumnName("age_recomend");
            entity.Property(e => e.Description).HasColumnName("description");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

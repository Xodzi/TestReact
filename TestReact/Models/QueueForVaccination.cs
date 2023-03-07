using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class QueueForVaccination
{
    public int Id { get; set; }

    public int IdVaccination { get; set; }

    public int IdChild { get; set; }

    public int IdDoctor { get; set; }

    public int IdHospital { get; set; }

    public int Date { get; set; }

    public TimeSpan Time { get; set; }

    public virtual Child IdChildNavigation { get; set; } = null!;

    public virtual Doctor IdDoctorNavigation { get; set; } = null!;

    public virtual Hospital IdHospitalNavigation { get; set; } = null!;

    public virtual Vaccination IdVaccinationNavigation { get; set; } = null!;
}

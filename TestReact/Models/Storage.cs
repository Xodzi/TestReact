using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class Storage
{
    public int Id { get; set; }

    public int IdHospital { get; set; }

    public int IdVaccination { get; set; }

    public virtual Hospital IdHospitalNavigation { get; set; } = null!;

    public virtual Vaccination IdVaccinationNavigation { get; set; } = null!;
}

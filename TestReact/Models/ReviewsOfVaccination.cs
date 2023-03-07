using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class ReviewsOfVaccination
{
    public int Id { get; set; }

    public int IdVaccination { get; set; }

    public int IdParent { get; set; }

    public string? Review { get; set; }

    public virtual Parent IdParentNavigation { get; set; } = null!;

    public virtual Vaccination IdVaccinationNavigation { get; set; } = null!;
}

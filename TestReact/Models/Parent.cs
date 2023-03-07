using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class Parent
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string? Fathername { get; set; }

    public string? PhoneNumber { get; set; }

    public virtual ICollection<Child> Children { get; } = new List<Child>();

    public virtual ICollection<ReviewsOfVaccination> ReviewsOfVaccinations { get; } = new List<ReviewsOfVaccination>();
}

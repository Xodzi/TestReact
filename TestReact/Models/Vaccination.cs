using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class Vaccination
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public int? AgeRecomend { get; set; }

    public virtual ICollection<QueueForVaccination> QueueForVaccinations { get; } = new List<QueueForVaccination>();

    public virtual ICollection<RecordBook> RecordBooks { get; } = new List<RecordBook>();

    public virtual ICollection<ReviewsOfVaccination> ReviewsOfVaccinations { get; } = new List<ReviewsOfVaccination>();

    public virtual ICollection<Storage> Storages { get; } = new List<Storage>();
}

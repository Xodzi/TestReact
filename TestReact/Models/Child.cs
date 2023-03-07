using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class Child
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string? Fathername { get; set; }

    public int? IdParent { get; set; }

    public DateTime? BirthdayDate { get; set; }

    public virtual ICollection<HistoryOfHealth> HistoryOfHealths { get; } = new List<HistoryOfHealth>();

    public virtual Parent? IdParentNavigation { get; set; }

    public virtual ICollection<QueueForVaccination> QueueForVaccinations { get; } = new List<QueueForVaccination>();

    public virtual ICollection<RecordBook> RecordBooks { get; } = new List<RecordBook>();
}

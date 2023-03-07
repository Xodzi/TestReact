using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class Doctor
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Number { get; set; } = null!;

    public string? Fathername { get; set; }

    public int IdHospital { get; set; }

    public DateTime DateHiring { get; set; }

    public DateTime? DateFiring { get; set; }

    public virtual Hospital IdHospitalNavigation { get; set; } = null!;

    public virtual ICollection<QueueForVaccination> QueueForVaccinations { get; } = new List<QueueForVaccination>();

    public virtual ICollection<RecordBook> RecordBooks { get; } = new List<RecordBook>();
}

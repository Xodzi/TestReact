using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class Hospital
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }

    public virtual ICollection<Doctor> Doctors { get; } = new List<Doctor>();

    public virtual ICollection<QueueForVaccination> QueueForVaccinations { get; } = new List<QueueForVaccination>();

    public virtual ICollection<Storage> Storages { get; } = new List<Storage>();
}

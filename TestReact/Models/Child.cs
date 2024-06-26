﻿using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class Child
{
    public int ChildId { get; set; }

    public string? Surname { get; set; }

    public string? Name { get; set; }

    public string? Fathername { get; set; }

    public DateTime? BirthDate { get; set; }

    public string? Sex { get; set; }

    public string? PolisOms { get; set; }

    public string? Adress { get; set; }

    public short? HealthGroup { get; set; }

    public string? Diagnosis { get; set; }

    public string? Benefits { get; set; }

    public string? Other { get; set; }
}

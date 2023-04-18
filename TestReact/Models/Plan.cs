using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class Plan
{
    public int PlanId { get; set; }

    public string? Title { get; set; }

    public DateTime? Date { get; set; }
}

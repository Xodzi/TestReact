using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class Task
{
    public int PlanId { get; set; }

    public string? Title { get; set; }

    public DateTime? Date { get; set; }
}

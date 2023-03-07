using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class HistoryOfHealth
{
    public int Id { get; set; }

    public int ChildId { get; set; }

    public DateTime Date { get; set; }

    public string? Diagnozis { get; set; }

    public virtual Child Child { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace TestReact.Models;

public partial class Mkbo
{
    public int Id { get; set; }

    public int? ParentId { get; set; }

    public string Name { get; set; } = null!;

    public string? Level { get; set; }

    public string? Ict { get; set; }

    public string? Code { get; set; }

    public virtual ICollection<Mkbo> InverseParent { get; } = new List<Mkbo>();

    public virtual Mkbo? Parent { get; set; }
}

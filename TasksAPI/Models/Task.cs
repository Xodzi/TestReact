using System;
using System.Collections.Generic;

namespace TasksAPI.Models;

public partial class Task
{
    public int TaskId { get; set; }

    public string? Title { get; set; }

    public DateTime? Date { get; set; }
}
